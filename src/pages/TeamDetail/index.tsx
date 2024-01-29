import ImageView from 'components/image/ImageView';
import TitleText from 'components/text/TitleText';
import Layout from 'layouts/App';
import './team-detail.css';
import DlText from 'components/text/DlText';
import { Button, Card, CardGroup, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import MyResponsivePie, { MyResponsivePieType } from 'components/graph/MyResponsePie';
// import MyResponsivePie from 'components/graph/MyResponsePie';

const TeamDetail = () => {
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

    const ScoreboardContainer = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-height: 90vh; /* Maximum height of the scoreboard container */
        overflow-y: auto; /* Enable vertical scrolling */
        :: -webkit-scrollbar {
            /* Hide scrollbar for Chrome, Safari and Opera */
            display: none;
        }
    `;

    const test: MyResponsivePieType = {
        data: [
            {
                id: '승',
                value: 10,
            },
            {
                id: '무',
                value: 2,
            },
            {
                id: '패',
                value: 3,
            },
        ],
    };

    return (
        <Layout>
            <ScoreboardContainer>
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
                    <TitleText title="통계" />
                    <div className="team-info-graph">
                        <MyResponsivePie data={test.data} />
                        <MyResponsivePie data={test.data} />
                    </div>
                </Card>
                <Card>
                    <TitleText title="탑 플레이어" />
                    <CardGroup>
                        <Card className="team-card">
                            <p>득점</p>
                            <p>1</p>
                            <Card.Img
                                variant="top"
                                src="https://img1.daumcdn.net/thumb/S200x200/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F908372.jpg&scode=default_face_profile_big_p"
                            />
                            <Card.Body>
                                <Card.Text>2. 래시포드</Card.Text>
                                <Card.Text>3. 페르난데스</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="team-card">
                            <p>도움</p>
                            <p>1</p>
                            <Card.Img
                                variant="top"
                                src="https://img1.daumcdn.net/thumb/S200x200/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F288205.jpg&scode=default_face_profile_big_p"
                            />
                            <Card.Body>
                                <Card.Text>2. 래시포드</Card.Text>
                                <Card.Text>3. 페르난데스</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="team-card">
                            <p>공격P</p>
                            <p>1</p>
                            <Card.Img
                                variant="top"
                                src="https://img1.daumcdn.net/thumb/S76x76/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F903830.jpg&scode=default_face_profile_big_p"
                            />
                            <Card.Body>
                                <Card.Text>2. 래시포드</Card.Text>
                                <Card.Text>3. 페르난데스</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="team-card">
                            <p>출전수</p>
                            <p>1</p>
                            <Card.Img
                                variant="top"
                                src="https://img1.daumcdn.net/thumb/S76x76/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F772389.jpg&scode=default_face_profile_big_p"
                            />
                            <Card.Body>
                                <Card.Text>
                                    <Card.Text>2. 래시포드</Card.Text>
                                    <Card.Text>3. 페르난데스</Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Card>
            </ScoreboardContainer>
        </Layout>
    );
};

export default TeamDetail;
