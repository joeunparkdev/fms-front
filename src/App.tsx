import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import KakaoLogin from "pages/KakaoLogin/index";
import KakaoCallback from "pages/KakaoCallBack/KakaoCallBack";
import Calendar from "pages/Calendar/index";
import Team from "pages/Team";
import Player from "pages/Player";
import Strategy from "pages/Strategy";
import AdminTeams from "pages/AdminTeams";
import AdminUsers from "pages/AdminUsers";
//import Formation from "pages/Formation";
import TeamTable from "pages/TeamTable";
import MemberTable from "pages/memberTable";
import Match from "pages/match";
import EditProfile from "pages/RegisterProfile";
import Profile from "pages/Profile";
import { useLoggedInStatusStore } from "store/loggedInStatusStore";
import fetcher from "utils/fetcher";
import RegisterProfile from "pages/RegisterProfile";

const App = () => {
  // const { accessToken } = useTokenStore();
  // const { setIsLoggedIn, isLoggedIn } = useLoggedInStatusStore();
  // if (accessToken) {
  //   setIsLoggedIn(true);
  const { isLoggedIn } = useLoggedInStatusStore();

  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/login");
  }
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/player" element={<Player />} />
      <Route path="/strategy" element={<Strategy />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
      {/* <Route path="/formation " element={<Formation />} /> */}
      <Route path="/teamTable" element={<TeamTable />} />
      <Route path="/memberTable" element={<MemberTable />} />
      <Route path="/api/auth/kakao/callback" element={<KakaoCallback />} />
      <Route path="/profile/:userId/edit" element={<EditProfile />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/profile/:userId/register" element={<RegisterProfile />} />

      {/* <Route path="/api/auth/kakao/callback" element={<KakaoCallback />} /> */}
      <Route path="/match" element={<Match />} />
      {/* 어드민 용 페이지 */}
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/teams" element={<AdminTeams />} />
      {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
    </Routes>
  );
};

export default App;
