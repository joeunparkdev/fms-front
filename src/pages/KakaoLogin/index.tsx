import React from "react";
import axios from "axios";

const KakaoLogin = () => {
  const onKakaoLoginClick = async () => {
    try {
      const CLIENT_ID = `${process.env.REACT_APP_KAKAO_API_KEY}`;
      const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_CALLBACK_URL}`;
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      window.location.href = kakaoURL;
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  return (
    <img
      alt="카카오 로그인"
      src="image/kakaoLogin.png"
      width="255"
      height="35"
      style={{ margin: "0px 24px 16px 24px", cursor: "pointer" }}
      onClick={onKakaoLoginClick}
    />
  );
};

export default KakaoLogin;
