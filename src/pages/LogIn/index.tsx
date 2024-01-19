import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";

const LogIn = () => {
  const { data, error } = useSWR("http://localhost:3001/api/users/me", fetcher);
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(TokenAtom);
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
    await axios
      .post(
        "http://localhost:3001/api/auth/sign-in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // mutate("http://localhost:3001/api/users/me"); 수정본
        mutate(res.data, false);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response?.data.message || "로그인 실패");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  if (data) {
    navigate("/home");
  }
  // useEffect(() => {
  //   if (data) {
  //     navigate("/home");
  //   }
  // }, [data, navigate]);

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
