import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";

const App = () => {
  const setAccessToken = useSetRecoilState(TokenAtom);

  useEffect(() => {
    // localStorage에서 토큰을 가져와 상태를 설정
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, [setAccessToken]);

  // 로그인 상태 확인 로직
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  console.log(isLoggedIn);

  return (
    <Routes>
      {isLoggedIn ? (
        // 로그인한 사용자를 위한 라우트
        <Route path="/home" element={<Home />} />
      ) : (
        // 비로그인 사용자를 위한 라우트
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate replace to="/home" /> : <LogIn />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate replace to="/home" /> : <SignUp />}
      />
      <Route
        path="*"
        element={<Navigate replace to={isLoggedIn ? "/home" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
