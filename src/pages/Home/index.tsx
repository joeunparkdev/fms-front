import Layout from "layouts/App";
import { useTeamStore } from "store/teamStore";
import CustomButton from "components/CustomButton";
import { ErrorContainer, ErrorMessage } from "./styles";

const Home = () => {
  const { teamId } = useTeamStore();

  return (
    <Layout>
      {teamId ? (
        <div>Your content here</div>
      ) : (
        <ErrorContainer>
          <ErrorMessage>
            속한 팀이 없습니다.
            <br />
            팀을 생성하거나 팀에 참가하세요.
          </ErrorMessage>
          <CustomButton to="/team/create">팀 생성</CustomButton>
          <CustomButton to="/team/join">팀 참가하기</CustomButton>
        </ErrorContainer>
      )}
    </Layout>
  );
};

export default Home;
