import ImageView from 'components/image/ImageView';
import TitleText from 'components/text/TitleText';
import Layout from 'layouts/App';
import './team-detail.css';
import DlText from 'components/text/DlText';
import { Card, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

const TeamDetail = () => {
    const TripleContainer = styled.div`
        display: flex;
        width: 80%; // 부모의 전체 너비를 차지하도록 설정
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

    const stats = {
        played: 32,
        won: 24,
        drawn: 29,
        lost: 5,
        goalsFor: 274,
        goalsAgainst: 29,
        goalDifference: '+5',
        points: '274',
        rank: '8위',
    };

    return (
        <Layout>
            <Card>
                <div className="team-info-preview">
                    <ImageView />
                    <div className="team-div">
                        <TitleText title="맨체스터 유나이티드1" />
                        <div className="">
                            <DlText title="감독" content="김승태" />
                            <DlText title="연고지" content="경기도 수원시 권선구" />
                        </div>
                        <div>
                            <div className="team-div">
                                <h5>2023</h5>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        년도
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>2022</Dropdown.Item>
                                        <Dropdown.Item>2021</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="team-div">
                                <DlText title="승" content="2" className="team-dl" />
                                <DlText title="무" content="2" className="team-dl" />
                                <DlText title="패" content="2" className="team-dl" />
                            </div>
                            <div className="team-div">
                                <DlText title="득점" content="2" className="team-dl" />
                                <DlText title="실점" content="2" className="team-dl" />
                                <DlText title="경기" content="2" className="team-dl" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div>시즌기록</div>
            </Card>
        </Layout>
    );
};

export default TeamDetail;
