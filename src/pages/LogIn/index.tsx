import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "recoil/TokenAtom";

const LogIn = () => {
  const navigate = useNavigate();
  // const setLogin = useSetRecoilState(loginAtom);
  const setAcccessToken = useSetRecoilState(TokenAtom);
  const accessToken = useRecoilValue(TokenAtom);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

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
      const result = await axios.post(
        "http://localhost:3001/api/auth/sign-in",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setAcccessToken(result.data.data.accessToken);
      localStorage.setItem("accessToken", result.data.data.accessToken);
      navigate("/home");
      // localStorage.setItem("refreshToken", result.data.data.refreshToken);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    if (accessToken !== "") {
      navigate("/home");
    }
  }, [accessToken, navigate]);

  return (
    <div className="page-container">
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label id="email-label">
            <span>이메일</span>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={onChange}
              />
            </div>
          </label>
          <label id="password-label">
            <span>비밀번호</span>
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
              />
            </div>
          </label>
          <button className="contrast outline" type="submit">
            로그인
          </button>
        </form>
        <button className="contrast outline">회원가입</button>
        {/* <img
          src="src/img/kakao_login_image.png"
          alt="카카오 로그인"
          width="100%"
        /> */}
      </div>
    </div>
  );
};

export default LogIn;
