import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./member.css"

// Member 정보의 타입을 정의
interface Member {
  id: number;
  name: string;
  team_name?: string;
  user?: {
    profile?: {
      preferred_position?: string;
      gender?: string;
      
    };
  };
}

const MemberTable = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(`http://localhost:${
          process.env.REACT_APP_SERVER_PORT || 3000
        }/api/members`);
        const membersWithProfile = response.data ? response.data.map((member: Member) => {
          return {
            ...member,
            profile: member?.user?.profile,
          };
        }) : [];
        console.log(response);
        console.log(membersWithProfile);
        setMembers(membersWithProfile);
      } catch (error) {
        console.error('멤버 정보를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchMembers();
  }, []);

  const handleInviteButton = (member: Member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleConfirmInvite = () => {
    // 여기에 멤버 초대 로직 추가
    // 실제로는 서버로 초대 요청을 보내는 등의 작업이 필요
    // 초대가 성공하면 모달을 닫거나 다음 작업을 수행할 수 있음
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleCancelInvite = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  return (
    <div>
      <h2>멤버 정보</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>소속팀</th>
            <th>선호 포지션</th>
            <th>성별</th>
            <th>신청</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.team_name}</td>
              <td>{member.user?.profile?.preferred_position}</td>
<td>{member.user?.profile?.gender}</td>

              <td>
                <button onClick={() => handleInviteButton(member)}>초대</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedMember && (
        <div className="modal">
          <p>{`"${selectedMember.name}" 팀에 초대하시겠습니까?`}</p>
          <button onClick={handleConfirmInvite}>확인</button>
          <button onClick={handleCancelInvite}>취소</button>
        </div>
      )}
    </div>
  );
};

export default MemberTable;
