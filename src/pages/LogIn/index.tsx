import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
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
      const res = await axios.post(
        "http://localhost:3001/api/auth/sign-in",
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
        <div className="ms-auto" style={{ cursor: 'pointer', width: '50%', padding: 0 }}>
          <img
            src="img/kakao_login_image.png"
            alt="카카오 로그인"
            width="100%"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
