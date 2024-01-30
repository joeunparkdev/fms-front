import Layout from "layouts/App";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeamStore } from "store/teamStore";
import styled from "styled-components";
import { Input, Typography, Button, Flex } from "antd";
import axios from "axios";

const { Text, Link, Title } = Typography;

const ScoreboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 90vh; /* Maximum height of the scoreboard container */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; /* 폼의 너비를 부모 요소의 100%로 설정 */
  max-height: 80vh; /* Maximum height of the form */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const records = [
  "goal",
  "assist",
  "yellowCards",
  "redCards",
  "cornerKick",
  "freeKick",
  "penaltyKick",
  "saves",
  "substitionOut",
  "substitionIn",
  "passes",
];

interface MatchInfo {
  goal: string;
  assist: string;
  yellowCards: string;
  redCards: string;
  cornerKick: number;
  freeKick: number;
  penaltyKick: number;
  saves: number;
  substitionOut: string;
  substitionIn: string;
  passes: number;
}

interface PlayerRecord {
  name: string;
  count: number;
}

const InputMatchResultDetail = () => {
  const [matchInfo, setMatchInfo] = useState<MatchInfo>({
    goal: "",
    assist: "",
    yellowCards: "",
    redCards: "",
    cornerKick: 0,
    freeKick: 0,
    penaltyKick: 0,
    saves: 0,
    substitionOut: "",
    substitionIn: "",
    passes: 0,
  });

  const { matchId } = useParams();
  const { teamId } = useTeamStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMatchInfo(() => {
      return {
        ...matchInfo,
        [name]: value,
      };
    });
  };

  const convertToServerFormat = (matchInfo: MatchInfo) => {
    const convertListToObjects = (list: string[]): PlayerRecord[] => {
      const counts = list.reduce(
        (acc: { [key: string]: number }, name: string) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        },
        {}
      );

      return Object.keys(counts).map((name) => ({
        name: name,
        count: counts[name],
      }));
    };

    const parseAndConvert = (str: string): PlayerRecord[] => {
      return convertListToObjects(
        str
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s)
      );
    };

    return {
      goals: parseAndConvert(matchInfo.goal),
      assists: parseAndConvert(matchInfo.assist),
      yellowCards: parseAndConvert(matchInfo.yellowCards),
      redCards: parseAndConvert(matchInfo.redCards),
      substitionsIn: parseAndConvert(matchInfo.substitionIn), // 'substitionOut'도 처리 필요
      substitionsOut: parseAndConvert(matchInfo.substitionOut), // 'substitionOut'도 처리 필요
      saves: matchInfo.saves,
      cornerKick: matchInfo.cornerKick,
      freeKick: matchInfo.freeKick,
      penaltyKick: matchInfo.penaltyKick,
      passes: matchInfo.passes,
    };
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const serverData = convertToServerFormat(matchInfo);
    console.log(serverData);
    // post 요청?
    // axios
    //   .post(
    //     `http://localhost:8080/api/v1/matches/${matchId}/result`,
    //     serverData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleNext = () => {
    // navigate("/home");
  };

  return (
    <Layout>
      <ScoreboardContainer>
        <Title level={3}>XX년 XX월 XX일 (경기장 이름) MatchID {matchId}</Title>
        <StyledForm>
          {Object.keys(matchInfo).map((record) => {
            if (
              record === "goal" ||
              record === "assist" ||
              record === "substitionIn" ||
              record === "substitionOut" ||
              record === "yellowCards" ||
              record === "redCards"
            ) {
              return (
                <>
                  <Text>{record}</Text>
                  <Input
                    key={record}
                    name={record}
                    placeholder="이름을 입력해주세요(e.g 홍길동, 홍길동, 심청이)"
                    type="text"
                    onChange={handleChange}
                    value={matchInfo[record]}
                  />
                </>
              );
            } else if (
              record === "cornerKick" ||
              record === "freeKick" ||
              record === "penaltyKick" ||
              record === "saves" ||
              record === "passes"
            ) {
              return (
                <>
                  <Text>{record} 횟수</Text>
                  <Input
                    key={record}
                    name={record}
                    placeholder="숫자를 입력해주세요(e.g 10)"
                    type="number"
                    onChange={handleChange}
                    value={matchInfo[record]}
                  />
                </>
              );
            }
          })}
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            등록
          </Button>
        </StyledForm>
      </ScoreboardContainer>
    </Layout>
  );
};

export default InputMatchResultDetail;
