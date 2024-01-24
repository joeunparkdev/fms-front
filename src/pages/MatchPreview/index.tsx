import React, { useState } from "react";
import Layout from "layouts/App";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  NextButton,
  Score,
  ScoreboardContainer,
  TeamBadge,
  TeamLogo,
  TeamsContainer,
} from "pages/MatchResult/styles";
import { Typography } from "antd";
const { Title } = Typography;

const MatchPreview = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const now = new Date();
  const handleNext = () => {
    // 매치 날짜보다 이르면 경기 종료 불가능
    // if (now < matchDate) {
    //   alert("경기가 시작되지 않았습니다.");
    //   return;
    // }
    navigate(`/match/${matchId}/input`);
  };
  return (
    <Layout>
      <ScoreboardContainer>
        <Title level={3}>XX년 XX월 XX일 (경기장 이름) MatchID {matchId}</Title>
        <TeamsContainer>
          <TeamBadge>
            <TeamLogo src="" alt="홈 팀 로고 넣어야함" />
            <div>홈 팀 정보 받아와서 이름 넣어야함</div>
          </TeamBadge>
          <Title level={4}>vs</Title>
          <TeamBadge>
            {/* Replace with actual image paths */}
            <TeamLogo src="" alt="어웨이 팀 로고 넣어야함" />
            <div>어웨이 팀 정보 받아와서 이름 넣어야함</div>
          </TeamBadge>
        </TeamsContainer>
        <NextButton onClick={handleNext}>경기 종료</NextButton>
      </ScoreboardContainer>
    </Layout>
  );
};

export default MatchPreview;
