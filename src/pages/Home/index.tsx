import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import Layout from "layouts/App";

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

const Home = () => {
  const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);
  const teamId = data?.teamId;

  const navigate = useNavigate();
  // 유저 정보를 저장하고 있어야함

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Layout>
      {teamId ? (
        <div>Your content here</div>
      ) : (
        <ErrorContainer>
          <ErrorMessage>
            속한 팀이 없습니다.
            <br />
            팀을 생성하거나 팀에 참가하세요.
          </ErrorMessage>
          <Button onClick={() => navigate("/team/create")}>팀 생성</Button>
          <Button onClick={() => navigate("/team/join")}>팀 참가하기</Button>
        </ErrorContainer>
      )}
    </Layout>
  );
};

export default Home;
