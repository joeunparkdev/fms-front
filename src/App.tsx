import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "recoil/TokenAtom";
import ProtectedRoute from "routes/ProtectedRoute";

const App = () => {
  const setAcccessToken = useSetRecoilState(TokenAtom);

  useEffect(() => {
    // localStorage에서 토큰을 가져와 상태를 설정
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAcccessToken(token);
    }
  }, [setAcccessToken]);

  const isLoggedIn = useRecoilValue(isLoginSelector);
  return (
    <Routes>
      {/* {isLoggedIn ? (
        <>
 
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )} */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
