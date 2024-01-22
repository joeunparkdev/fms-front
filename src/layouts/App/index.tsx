import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";
import { useTeamStore } from "store/teamStore";
import { useUserStore } from "store/userStore";
import { useTokenStore } from "store/tokenStore";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useProfileStore } from "store/profileStore";
import { useLoggedInStatusStore } from "store/loggedInStatusStore";

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

/**
 * To Do
 * 1. 유저 정보 저장하기
 * 2. 프로필 페이지 만들기
 * 3. 프로필 페이지에서 서버로 데이터 전송
 */

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);
  const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);
  const { teamId } = useTeamStore();
  const { id: userId, setUser } = useUserStore();
  const { setProfile, id: profileId } = useProfileStore();
  const navigate = useNavigate();

  const { isLoggedIn, setLogOut } = useLoggedInStatusStore();
  // useEffect를 사용하여 data가 변경될 때만 setUser를 호출합니다.
  useEffect(() => {
    if (data) {
      console.log(data.data.profile);
      setUser(data.data);
      setProfile(data.data.profile);
    }
  }, [data]); // 의존성 배열에 data를 넣어 data가 변경될 때만 이 코드가 실행되도록 합니다.

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // isLoggedIn 상태가 변경될 때만 이 코드가 실행되도록 합니다.

  const handleLogout = () => {
    setLogOut();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!isLoggedIn) {
    navigate("/login");
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

          <StyledLink
            href={
              profileId
                ? `/profile/${profileId}`
                : `/profile/${userId}/register`
            }
          >
            프로필
          </StyledLink>
        </h2>
        <StyledLink
          href={
            profileId ? `/profile/${profileId}` : `/profile/${userId}/register`
          }
        >
          <BsEmojiSunglasses />
        </StyledLink>

        {children}
      </Card>
    </PageContainer>
  );
};

export default Layout;
function setProfile(profile: any) {
  throw new Error("Function not implemented.");
}
