import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./table.css"

// Team 정보의 타입을 정의
interface Team {
  id: number;
  name: string;
  description: string;
  logoImage: string;
  is_mixed_gender: boolean;
  gender: string;
}

const TeamTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get('http://localhost:3000/api/team');
        setTeams(response.data);
      } catch (error) {
        console.error('팀 정보를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchTeams();
  }, []);

  const handleApplyButton = (team: Team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleConfirmApply = () => {
    // 여기에 팀 신청 로직 추가
    // 실제로는 서버로 팀 신청 요청을 보내는 등의 작업이 필요
    // 팀 신청이 성공하면 모달을 닫거나 다음 작업을 수행할 수 있음
    setShowModal(false);
    setSelectedTeam(null);
  };

  const handleCancelApply = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  return (
    <div>
      <h2>팀 정보</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>팀 이름</th>
            <th>팀 설명</th>
            <th>로고 이미지</th>
            <th>혼성 여부</th>
            <th>성별</th>
            <th>신청</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>
                <img src={team.logoImage} alt={`${team.name} 로고`} />
              </td>
              <td>{team.is_mixed_gender ? '혼성' : '단일 성별'}</td>
              <td>{team.gender}</td>
              <td>
                <button onClick={() => handleApplyButton(team)}>신청</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedTeam && (
        <div className="modal">
          <p>{`"${selectedTeam.name}" 팀에 신청하시겠습니까?`}</p>
          <button onClick={handleConfirmApply}>확인</button>
          <button onClick={handleCancelApply}>취소</button>
        </div>
      )}
    </div>
  );
};

export default TeamTable;
