// 의문?
// 화면에서 여기 왜 등록하는지?
// 경기 종료 버튼?

import axios from "axios";
import Layout from "layouts/App";
import {
  NextButton,
  ScoreInput,
  ScoreboardContainer,
  TeamBadge,
  TeamLogo,
  TeamsContainer,
  Title,
} from "pages/MatchResult/styles";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeamStore } from "store/teamStore";
import { useUserStore } from "store/userStore";

//

const InputMatchResult = () => {
  const [homeScore, setHomeScore] = useState(0);
  const { matchId } = useParams();
  const { teamId } = useTeamStore();
  const { id: userId } = useUserStore();
  const navigate = useNavigate();

  const handleNext = async () => {
    console.log(homeScore);
    // const resp = await axios.post("", {});
    navigate(`/match/${matchId}/input/detail`);
  };
  return (
    <Layout>
      <ScoreboardContainer>
        <Title>XX년 XX월 XX일 (경기장 이름) MatchID {matchId}</Title>
        <TeamsContainer>
          <TeamBadge>
            <TeamLogo src="" alt="작성자가 속한 팀 로고 넣어야함" />
            <div>작성자가 속한 팀 이름</div>
          </TeamBadge>

          <ScoreInput
            type="text"
            value={homeScore}
            onChange={(e) => setHomeScore(Number(e.target.value))}
          />
        </TeamsContainer>

        <NextButton onClick={handleNext}>Next</NextButton>
      </ScoreboardContainer>
    </Layout>
  );
};

export default InputMatchResult;
