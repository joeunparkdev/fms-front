import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import Team from "pages/Team";
import Player from "pages/Player";
import Strategy from "pages/Strategy";
import AdminTeams from "pages/AdminTeams";
import AdminUsers from "pages/AdminUsers";
import Match from "pages/match";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/player" element={<Player />} />
      <Route path="/strategy" element={<Strategy />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/match" element={<Match />} />
      {/* 어드민 용 페이지 */}
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/teams" element={<AdminTeams />} />
      {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
    </Routes>
  );
};

export default App;
