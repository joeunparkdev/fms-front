import Layout from "layouts/App";
import styled from 'styled-components';
import React, { useEffect,useRef,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import Draggable from 'react-draggable';
import formations from "./formations"; 


const responsiveWidth = '768px'; 

const Sidebar = styled.div`
    width: 58%;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #d6d6d6; /* 선명한 회색 테두리를 추가 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TripleContainer = styled.div`
    display: flex;
    width: 100%; // 부모의 전체 너비를 차지하도록 설정
    height: 95vh; // 높이를 화면의 전체 높이로 설정할 수도 있습니다
    // border: 2px solid #b3d4fc; // 옅은 푸른색 테두리 적용
    // border-radius: 15px; // 모서리 둥글게 설정

    > div {
    flex: 1; // 세 개의 div가 부모의 공간을 균등하게 나누어 가짐
    //border: 2px solid green; // 각 div의 테두리를 초록색으로 설정
    &:not(:last-child) {
        margin-right: 2px; // 오른쪽 div에만 여백을 추가하여 구분
    }
    }
`;

const ReservationInfo = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #d6d6d6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: auto; // 필요한 만큼 높이 자동 조정
`;

const ReservationTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 20px; // 타이틀과 리스트 사이의 여백
  color: black;
`;

const Button = styled.button`
  padding: 15px 25px; // 이 부분은 버튼의 크기를 조절하기 위해 변경할 수 있습니다.
  font-size: 1.3rem; // 이 부분은 버튼 안의 글씨 크기를 조절하기 위해 변경할 수 있습니다.
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  // 버튼에 flex-grow 속성을 추가하지 않습니다.
  // 대신 ButtonContainer 내에서 flex-grow를 조정합니다.
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // 버튼들 사이에 공간을 균등하게 배분합니다.
  gap: 10px;
  padding-top: 3vh; // 버튼과 예약 정보 사이의 간격
`;

const ImageContainer = styled.div`
  position: relative;
  height: 67vh;
  background-image: url('../../img/field.png'); // 배경 이미지로 경기장 이미지를 설정합니다.
  background-size: cover; // 배경 이미지가 컨테이너를 꽉 채우도록 합니다.
  background-position: center; // 배경 이미지를 중앙에 위치시킵니다.
  width: 100%; // 경기장 이미지의 너비를 설정합니다. 필요에 따라 조정하세요.

  @media (max-width: ${responsiveWidth}) {
    width: 100%; // 화면이 작아지면 너비를 100%로 설정하여 가로로 꽉 차게 합니다.
  }
`;


const SaveButton = styled(Button)`
  flex-grow: 9; // 저장 버튼이 더 큰 공간을 차지하도록 설정합니다.
`;

const CancelButton = styled(Button)`
  flex-grow: 1; // 취소 버튼은 작은 공간을 차지하도록 설정합니다.
  background-color:#808080;
`;

const Formation = () => {

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedItem, setSelectedItem] = useState<string>(''); // 선택된 아이템을 상태로 관리합니다.
  const [homeTeamLogo, setHomeTeamLogo] = useState<string>('');
  const [homeTeamId, setHomeTeamId] = useState<string>('');

  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // 구단주 체크를 수행하는 함수
    const checkIfIsCreator = async () => {
      try {
        const response = await axios.get(`http://localhost:${
          process.env.REACT_APP_SERVER_PORT || 3000
        }/api/match/creator`, {
          headers: {
            Authorization: `Bearer ${accessToken}` // Bearer 토큰 추가
          }
        });
        const homeTeamLogo = response.data?.data[0]?.logoUrl;
        const homeTeamId = response.data?.data[0]?.id;
        setHomeTeamLogo(homeTeamLogo);
        setHomeTeamId(homeTeamId);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    checkIfIsCreator(); // 데이터를 불러오는 함수 호출
  }, []);

    const Player = styled.div`
    position: absolute;
    width: 80px; // 선수 크기
    height: 80px;
    background-color: red;
    border-radius: 50%; // 원 모양
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; // 텍스트 크기
    color: white; // 텍스트 색상
  `;

  // 이미지의 ref를 생성합니다.
  const fieldRef = useRef<HTMLImageElement>(null);
  
  // 드래그 가능한 경계를 설정하는 state입니다.
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });


  useEffect(() => {
    // 이미지 로드 완료 시 경계값 계산


    if (fieldRef.current) {
      // 이미 로드된 이미지라면 바로 경계값 업데이트
      updateBounds();
    }

    // 이미지 로드 이벤트 리스너 등록
    const imageElement = fieldRef.current;
    if (imageElement) {
      imageElement.addEventListener('load', updateBounds);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', updateBounds);
      }
    };
  }, []);

  // ImageContainer의 참조를 생성합니다.
    const imageContainerRef = useRef<HTMLImageElement>(null);

    // 경계값을 계산하는 함수를 수정합니다.
    const updateBounds = () => {
    if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        setBounds({
        left: rect.left,
        top: rect.top,
        right: rect.width,
        bottom: rect.height,
        });
    }
    };

    // 현재 선택된 포메이션을 상태로 관리
    const [currentFormation, setCurrentFormation] = useState('4-3-3');

    // 콤보박스에서 선택된 포메이션에 따라 Player 컴포넌트를 렌더링하는 함수
    const renderFormation = (formationName:string) => {
        const formationData = formations[formationName];
        return (
        <>
            {formationData.attackers.map((pos, index) => (
            <Draggable bounds={bounds} key={`attacker-${index}`}>
                <Player style={{ left: pos.x, top: pos.y }}>
                {formationData.positionNames.attackers[index]}
                </Player>
            </Draggable>
            ))}
            {formationData.midfielders.map((pos, index) => (
            <Draggable bounds={bounds} key={`midfielder-${index}`}>
                <Player style={{ left: pos.x, top: pos.y }}>
                {formationData.positionNames.midfielders[index]}
                </Player>
            </Draggable>
            ))}
            {formationData.defenders.map((pos, index) => (
            <Draggable bounds={bounds} key={`defender-${index}`}>
                <Player style={{ left: pos.x, top: pos.y }}>
                {formationData.positionNames.defenders[index]}
                </Player>
            </Draggable>
            ))}
            <Draggable bounds={bounds} key="goalkeeper">
                <Player style={{ left: formationData.goalkeeper.x, top: formationData.goalkeeper.y }}>
                {formationData.positionNames.goalkeeper}
                </Player>
            </Draggable>
            {/* 중앙 미드필더, 공격수, 골키퍼 렌더링도 동일한 방식으로 추가... */}
        </>
        );
    };

  return (
    <Layout>
    <TripleContainer>
      <div>
        <Sidebar>
            {/* 콤보박스 렌더링 */}
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                포메이션 선택 <span>{currentFormation}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(formations).map(formationName => (
                <Dropdown.Item
                    key={formationName}
                    onClick={() => setCurrentFormation(formationName)}
                >
                    {formationName}
                </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>
          <ImageContainer ref={imageContainerRef}>
            {/* 선택된 포메이션 렌더링 */}
            {renderFormation(currentFormation)}
          </ImageContainer>
        </Sidebar>
      </div>
      <div>
        <ReservationInfo>
            {selectedDate && (
                <>
                <ReservationTitle>
                  예약 정보
                </ReservationTitle>
                </>
            )}
        <ButtonContainer>
        <CancelButton onClick={() => navigate("/match")}>취소</CancelButton>
        <SaveButton>경기 요청</SaveButton>
        </ButtonContainer>
        </ReservationInfo>

      </div>
    </TripleContainer>
    </Layout>
  );
};

export default Formation;
