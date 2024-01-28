import Layout from "layouts/App";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const memberId = 2;
    const fetchMemberData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Fetch member data from the backend
        const response = await axios.get(
          `http://localhost:${
            process.env.REACT_APP_SERVER_PORT || 3000
          }api/match/member/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log("Response:", response);
        console.log("Response Data:", response.data);
        setPlayerData(response.data.data);
      } catch (error) {
        console.error("프로필을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Layout>
      <div className="App">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {playerData && (
          <div>
            <div className="profile-section">
              {/* <img src={playerData.profileImg} alt="선수 프로필" />
              <h1>{playerData.name}</h1>
              <p>{playerData.team}</p> */}
            </div>
            <div className="season-total">
              <table>
                <thead>
                  <tr>
                    <th>경기</th>
                    <th>골</th>
                    <th>어시스트</th>
                    <th>경고</th>
                    <th>퇴장</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td>{playerData.seasonTotal.matches}</td>
                    <td>{playerData.seasonTotal.goals}</td>
                    <td>{playerData.seasonTotal.assists}</td>
                    <td>{playerData.seasonTotal.yellowCards}</td>
                    <td>{playerData.seasonTotal.redCards}</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="game-records">
              <table>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>분</th>
                    <th>골</th>
                    <th>어시스트</th>
                    <th>경고</th>
                    <th>퇴장</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {playerData.gameRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.minute}</td>
                      <td>{record.goal}</td>
                      <td>{record.assist}</td>
                      <td>{record.yellowCard}</td>
                      <td>{record.redCard}</td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MemberDetail;
