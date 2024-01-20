import React from "react";

const KakaoLogin = () => {
  const CLIENT_ID = `${process.env.KAKAO_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.KAKAO_CALLBACK_URL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <img
      alt="카카오 로그인"
      src="image/kakaoLogin.png"
      width="255"
      height="35"
      style={{ margin: "0px 24px 16px 24px" }}
      onClick={() => (window.location.href = kakaoURL)}
    />
  );
};

export default KakaoLogin


    
      
      