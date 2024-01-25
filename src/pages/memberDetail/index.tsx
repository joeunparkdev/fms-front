import Layout from "layouts/App";
import React from 'react';

const playerData = {
  name: '마커스 래시포드',
  team: '맨체스터 유나이티드',
  profileImg: '/path/to/image.jpg', // 실제 이미지 경로로 변경하세요.
  seasonTotal: {
    matches: 20,
    goals: 4,
    assists: 2,
    yellowCards: 6,
    redCards: 0,
  },
  gameRecords: [
    { date: '01.15', minute: 88, goal: 1, assist: 0, yellowCard: 2, redCard: 0 },
    // 다른 경기 기록을 추가하세요.
  ],
};

const MemberDetail = () => {
  return (
      <Layout>
    <div className="App">
      <div className="profile-section">
        <img src={playerData.profileImg} alt="선수 프로필" />
        <h1>{playerData.name}</h1>
        <p>{playerData.team}</p>
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
              <td>{playerData.seasonTotal.matches}</td>
              <td>{playerData.seasonTotal.goals}</td>
              <td>{playerData.seasonTotal.assists}</td>
              <td>{playerData.seasonTotal.yellowCards}</td>
              <td>{playerData.seasonTotal.redCards}</td>
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
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}

export default MemberDetail;