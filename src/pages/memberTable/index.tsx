import React, { useEffect, useState } from "react";
import axios from "axios";
import "./member.css";
import Layout from "layouts/App";
import { Pagination } from "antd";
// Profile 정보의 타입을 정의
interface Member {
  isStaff: boolean;
  joinDate: string;
  team: Team;
}
interface Team {
  name: string;
}
interface User {
  member: Member[];
}
interface Profile {
  id: number;
  name: string;
  skillLevel: number;
  weight: number;
  height: number;
  preferredPosition: string; //enum?
  image_url: string;
  age: number;
  phone: string;
  birthdate: Date; //string?
  gender: string; //enum?
  user: User;
}

const ProfileTable = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await axios.get(
          `http://localhost:${
            process.env.REACT_APP_SERVER_PORT || 3000
          }/api/profile`
        );
        const profile = Array.isArray(response.data.data)
          ? response.data.data.data.map((profile: Profile) => ({ ...profile }))
          : [];
        console.log("response=",response);
        console.log("response.data.data.data=",response.data.data.data);
        console.log("profile=",profile);
        setProfiles(profile);
        setTotal(response.data.data.data.total);
      } catch (error) {
        console.error("멤버 정보를 불러오는 데 실패했습니다.", error);
      }
    }

    fetchProfiles();
  }, []);

  const handleInviteButton = (profile: Profile) => {
    console.log("Invite button clicked!");
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleConfirmInvite = () => {
    // 여기에 멤버 초대 로직 추가
    // 실제로는 서버로 초대 요청을 보내는 등의 작업이 필요
    // 초대가 성공하면 모달을 닫거나 다음 작업을 수행할 수 있음
    setShowModal(false);
    setSelectedProfile(null);
  };

  const handleCancelInvite = () => {
    setShowModal(false);
    setSelectedProfile(null);
  };
  
  const changePage = async (page: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await axios.get(
        `http://localhost:${
          process.env.REACT_APP_SERVER_PORT || 3000
        }/api/profile?page=${page || 1}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  return (
    
    <Layout>
    <div>
      <h2>멤버 정보</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>실력</th>
            <th>몸무게</th>
            <th>키</th>
            <th>선호 포지션</th>
            <th>사진</th>
            <th>나이</th>
            <th>성별</th>
            <th>스태프 여부</th>

            {<th>팀 이름</th>}
            {<th>가입일</th>}
            <th>신청</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.skillLevel}</td>
              <td>{profile.weight}</td>
              <td>{profile.height}</td>
              <td>{profile.preferredPosition}</td>
              <td>{profile.image_url}</td>
              <td>{profile.age}</td>
              <td>{profile.gender}</td>
              <td>{profile.user.member[0].isStaff ? "스태프" : "일반 회원"}</td>
              {<td>{profile.user.member[0].team.name}</td>}
              {<td>{profile.user.member[0].joinDate}</td>}
              <td>
                <button onClick={() => handleInviteButton(profile)}>
                  초대
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedProfile && (
        <div className="modal">
          <p>{`${selectedProfile.name} 팀에 초대하시겠습니까?`}</p>
          <button onClick={handleConfirmInvite}>확인</button>
          <button onClick={handleCancelInvite}>취소</button>
        </div>
      )}
    </div>
    <Pagination
        defaultCurrent={currentPage} // 현재 클릭한 페이지
        total={total} // 데이터 총 개수
        defaultPageSize={5} // 페이지 당 데이터 개수
        onChange={(value) => {
          changePage(value);
        }}
      />
    </Layout>
  );
};

export default ProfileTable;
