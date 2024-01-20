import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { useTeamStore } from "store/teamStore";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  gap: 0.5rem;
`;

const Menu = styled.nav`
  width: 10%;
  height: 90%;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Card = styled.div`
  width: 80%;
  height: 90%;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled.a`
  color: #445664;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  color: #000;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  min-width: 150px; // 버튼의 최소 너비 설정
  border: none;
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  font-size: 1rem; // 폰트 크기 조정
  margin: 0 5px; // 버튼 사이의 간격 조정

  &:hover {
    background-color: #555;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);
  const { setTeamId } = useTeamStore();
  const teamId = data?.teamId;
  if (teamId) {
    setTeamId(teamId);
  }

  const navigate = useNavigate();
  // 유저 정보를 저장하고 있어야함

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!data) {
    navigate("/login", { replace: true });
  }
  return (
    <PageContainer>
      <Menu>
        <MenuItem>
          <StyledLink href="/home">HOME</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/team">TEAM</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/player">PLAYER</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/strategy">STRATEGY</StyledLink>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          style={{
            color: "#445664",
          }}
        >
          LOGOUT
        </MenuItem>
      </Menu>
      <Card>
        <h2>
          <StyledLink href="/home">
            Football Management System (FMS) ⚽🔥
          </StyledLink>
        </h2>
        {children}
      </Card>
    </PageContainer>
  );
};

export default Layout;
