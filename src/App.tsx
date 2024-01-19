import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "pages/Home";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";

const App = () => {
  const setAccessToken = useSetRecoilState(TokenAtom);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default App;
