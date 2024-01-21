import Layout from "layouts/App";
import styled from 'styled-components';
import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  // 경기장 카드를 가로로 정렬하기 위한 컨테이너
  const StadiumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // 카드들이 줄바꿈될 수 있도록 설정
  gap: 20px; // 카드 간의 간격
  overflow-y: auto; // 세로 스크롤을 위한 오버플로우
  max-height: 100vh; 
  margin: auto; // 중앙 정렬을 위한 마진 설정
  padding-top:10px;
  padding-left:10px;

  
  /* 스크롤바 전체에 대한 스타일 */
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
    background-color: transparent; /* 트랙 부분의 배경색을 투명하게 설정 */
  }

  /* 스크롤바의 썸(움직이는 부분)에 대한 스타일 */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* 썸 부분의 색상과 투명도 설정 */
    border-radius: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3); /* 마우스를 올렸을 때 썸의 색상 변경 */
    }
  }

  /* 스크롤바 트랙에 대한 스타일 */
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
`;

const CustomCard = styled(Card)`
  border: 2px solid #d6d6d6; /* 테두리를 진하게 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  border-radius: 10px; /* 모서리 둥글게 */
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out; /* 확대와 그림자에 트랜지션 효과 추가 */
  will-change: transform; /* 성능 최적화를 위해 변화가 있을 속성 명시 */
  transform-origin: center center; // 확대의 기준점을 카드의 중앙으로 설정

  &:hover {
    transform: scale(1.007) translateZ(0); /* 마우스 오버 시 약간 확대 */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 마우스 오버 시 그림자 강조 */
    margin: -0.1%;
  }
`;



const Match = () => {

  /*
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = token.split('.')[1]; // 토큰을 점('.') 기준으로 나누고 페이로드 부분을 선택
      const decodedPayload = atob(payload); // Base64 디코딩
      const payloadData = JSON.parse(decodedPayload); // JSON으로 파싱
      setTokenInfo(payloadData); // 토큰 정보 저장
    }
  }, []);*/

  const [getField, setField] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  type Field = {
    id: number;
    location_id: number;
    field_name: string;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // 구단주 체크를 수행하는 함수
    const findAllSoccerField = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/match/field", {
          headers: {
            Authorization: `Bearer ${accessToken}` // Bearer 토큰 추가
          }
        });
        const fieldData = response.data.data;
        console.log(`fieldData ${fieldData.data}`);
        setField(fieldData); // creatorId가 존재하면 구단주로 간주
        setLoading(false); // 데이터 로딩 완료
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        setLoading(false); // 데이터 로딩 실패
      }
    };

    findAllSoccerField(); // 데이터를 불러오는 함수 호출
  }, []);


  // 가상의 경기장 데이터 (테스트시 아래 getField.map 대신 stadiumList로 바꿔 사용)
  const stadiumList = [
    { id: 1, name: "스타디움 1", location: "서울" },
    { id: 2, name: "스타디움 2", location: "부산" },
    { id: 3, name: "스타디움 3", location: "대구" },
    { id: 4, name: "스타디움 3", location: "대구" },
    // 다른 경기장 정보도 추가할 수 있습니다.
  ];
      
  return (
    <Layout>
      <h2>경기장 목록</h2>
      <StadiumsContainer>
        {getField.map((field) => (
          <CustomCard key={field.id} style={{ width: '18rem', height:'400px',marginBottom: '20px' }}>
            <Card.Img variant="top" src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/idi/image/ROazs2HATMpunuQWulcjVc9d0Nk.JPG"
                style={{ 
                  width: '100%',  // 이미지의 너비를 카드 너비에 맞춤
                  height: '200px', // 이미지의 높이를 지정
                  objectFit: 'cover' // 이미지가 비율을 유지하면서 주어진 높이에 맞게 조정됨
                }} 
            />
            <Card.Body>
            <Card.Title>{field.field_name}</Card.Title>
            <Card.Text>
              경기장 정보
            </Card.Text>
            <Button variant="primary">일정 확인</Button>
            </Card.Body>
          </CustomCard>
        ))}
      </StadiumsContainer>
    </Layout>
  );
};

export default Match;
