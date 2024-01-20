import "../Layout/layout.css";
import "../SignUp/signup.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";

const LogIn = () => {
  const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  // 로그인 후 리디렉션을 처리하기 위한 효과
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (err: any) {
      alert(err.response?.data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  // const CLIENT_ID = `${process.env.KAKAO_API_KEY}`;
  // const REDIRECT_URI = `${process.env.KAKAO_CALLBACK_URL}`;
  const CLIENT_ID = "87e81e12dd9ec54f482031c186a83318";
  const REDIRECT_URI =  "http://localhost:3000/api/auth/kakao/callback";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onKakaoLoginClick = () => {
    // axios
    //   .get("http://localhost:3000/api/auth/kakao",
    //   {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log("Kakao login successful:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error during Kakao login:", error);
    //   });
      window.location.href = kakaoURL;

      )
      .then((res) => {
        mutate(res.data, false);
        if (res.data.statusCode === 200) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          // setAccessToken(res.data.data.accessToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err.response?.data.message || "로그인 실패");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  if (data) {
    navigate("/home", { replace: true });
  }

  return (
    <div className="page-container">
      <div className="login-form">
        <form onSubmit={onSubmit}>
          {/* Your form input fields */}
          <button className="contrast outline" type="submit">
            로그인
          </button>
        </form>
        <button className="contrast outline">회원가입</button>
        <div
          className="ms-auto"
          style={{ cursor: "pointer", width: "50%", padding: 0 }}>
          <img
            src="img/kakao_login_image.png"
            alt="카카오 로그인"
            width="100%"
            style={{ cursor: "pointer" }}
            onClick={onKakaoLoginClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
