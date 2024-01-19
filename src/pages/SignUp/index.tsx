import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import "./signup.css"
const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, name, password, passwordConfirm } = inputs;

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
      .post("http://localhost:3001/api/auth/sign-up", {
        email,
        name,
        password,
        passwordConfirm,
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  return (
    <div>
      <div className="login-form">
        <h3>회원가입</h3>
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

          <label id="name-label">
            <span>이름</span>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름"
                value={name}
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

          <label id="password-confrim-label">
            <span>비밀번호 확인</span>
            <div>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={onChange}
              />
            </div>
          </label>
          <button type="submit">가입완료</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
