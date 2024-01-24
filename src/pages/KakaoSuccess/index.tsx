import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "layouts/App";
import useAuthStore from "store/useAuthStore";
import axios from "axios";
import { response } from "express";

const KakaoSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    console.log("code=",code);
    if (code) {
      axios
        .post(
          "http://localhost:3000/api/auth/kakao/callback/code",
          { code: code },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Kakao code verification response:", response.data);

          const { accessToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
        });
    }

  });


  return (
    <Layout>
      <br />
      Kakao 인증 성공!
    </Layout>
  );
};

export default KakaoSuccess;
