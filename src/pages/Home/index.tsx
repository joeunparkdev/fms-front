import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

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
        {/* <slot /> */}
      </Card>
    </PageContainer>
  );
};

export default Home;
