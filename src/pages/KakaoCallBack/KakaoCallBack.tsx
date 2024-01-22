import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const grantType = "authorization_code";
    const REST_API_KEY = "87e81e12dd9ec54f482031c186a83318";
    const REDIRECT_URI = "http://localhost:3001/api/auth/kakao/callback";

    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        `grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;
        console.log("res is");
        console.log(res);
        axios
          .get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => {
            console.log("Kakao user info:", res.data);
          })
          .catch((error) => {
            console.error("Kakao user info error:", error);
          })
          .finally(() => {
            // 인증 후 다른 페이지로 이동
            navigate("/home");
          });
      })
      .catch((error) => {
        console.error("Kakao token request error:", error);
      });
  }, []);

  return <></>;
};

export default KakaoCallback;
