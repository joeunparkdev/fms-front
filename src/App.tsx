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
import TeamTable from "pages/TeamTable";
import MemberTable from "pages/memberTable";
import Match from "pages/match";
import EditProfile from "pages/RegisterProfile";
import Profile from "pages/Profile";
import RegisterProfile from "pages/RegisterProfile";
import useAuthStore from "store/useAuthStore";
import { ReactNode, useEffect } from "react";
import MatchBook from "pages/match/book";
import MatchResult from "pages/MatchResult";
import InputMatchResult from "pages/InputMatchResult";
import InputMatchResultDetail from "pages/InputMatchResultDetail";
import MatchPreview from "pages/MatchPreview";
import MatchReview from "pages/MatchReview";
import MatchCalendar from "pages/match/calendar";


interface ProtectedRouteProps {
  children: ReactNode;
}

const App = () => {
  const { isLoggedIn } = useAuthStore();
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) {
        navigate("/home");
      }
    }, [isLoggedIn, navigate]);

    return <>{children}</>;
  };

  return (
    <Routes>
      {/* 로그인 안해도 접근 가능한 url */}

      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <LogIn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kakaoLogin"
        element={
          <ProtectedRoute>
            <KakaoLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/api/auth/kakao/callback"
        element={
          <ProtectedRoute>
            <KakaoCallback />
          </ProtectedRoute>
        }
      />
      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/player" element={<Player />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route
            path="/profile/:userId/register"
            element={<RegisterProfile />}
          />

          {/* <Route path="/api/auth/kakao/callback" element={<KakaoCallback />} /> */}
          <Route path="/match" element={<Match />} />
          <Route path="/match/:matchId/result" element={<MatchResult />} />
          <Route path="/match/:matchId/input" element={<InputMatchResult />} />
          <Route
            path="/match/:matchId/input/detail"
            element={<InputMatchResultDetail />}
          />
          <Route
            path="/match/:matchId/preview"
            element={<MatchPreview />}
          ></Route>
          <Route
            path="/match/:matchId/review"
            element={<MatchReview />}
          ></Route>

          <Route path="/match/book" element={<MatchBook />} />
          <Route path="/match/calendar" element={<MatchCalendar />} />
      {/* 어드민 용 페이지 */}
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/teamTable" element={<TeamTable />} />
          <Route path="/memberTable" element={<MemberTable />} />
          {/* <Route path="/formation " element={<Formation />} /> */}
          {/* <Route path="/*" element={<NotFound />} /> */}
        </>
      ) : (
        <Route path="/*" element={<Navigate replace to="/login" />} />
      )}
    </Routes>
  );
};

export default App;
