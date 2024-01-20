import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import KakaoLogin from "pages/KakaoLogin/index";
import KakaoCallback from "pages/KakaoCallBack/KakaoCallBack";
import Calendar from "pages/Calendar/index"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
      {/* <Route path="/api/auth/kakao/callback" element={<KakaoCallback />} /> */}
</Routes>
  );
};

export default App;
