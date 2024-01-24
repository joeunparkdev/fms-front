import React, { useState } from "react";
import Layout from "layouts/App";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  NextButton,
  Score,
  ScoreInput,
  ScoreboardContainer,
  TeamBadge,
  TeamLogo,
  TeamsContainer,
  Title,
} from "./styles";

// 의문?
// 화면에서 여기 왜 등록하는지?
// 경기 종료 버튼?
// 내가 가짜로 입력하면 어케함?
const MatchResult = () => {
  // matchId를 받아서 그 경기에 출전한 home, away 팀의 정보를 가져온다.

  // home away 정보를 통해 , img, teamName을 가져온다.

  const { matchId } = useParams();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };
  return (
    <Layout>
      <ScoreboardContainer>
        <Title>XX년 XX월 XX일 (경기장 이름) MatchID {matchId}</Title>
        <TeamsContainer>
          <TeamBadge>
            <TeamLogo src="" alt="홈 팀 로고 넣어야함" />
            <div>홈 팀 정보 받아와서 이름 넣어야함</div>
          </TeamBadge>

          <div>
            {/* <ScoreInput
              type="text"
              value={homeScore}
              onChange={(e) => setHomeScore(Number(e.target.value))}
            /> */}
            <Score>1</Score>:
            {/* <ScoreInput
              type="text"
              value={awayScore}
              onChange={(e) => setAwayScore(Number(e.target.value))}
            /> */}
            <Score>2</Score>
          </div>

          <TeamBadge>
            {/* Replace with actual image paths */}
            <TeamLogo src="" alt="어웨이 팀 로고 넣어야함" />
            <div>어웨이 팀 정보 받아와서 이름 넣어야함</div>
          </TeamBadge>
        </TeamsContainer>
        <NextButton onClick={handleNext}>Next</NextButton>
        아래 경기 상세 스탯 넣으면 될듯!
      </ScoreboardContainer>
    </Layout>
  );
};

export default MatchResult;
