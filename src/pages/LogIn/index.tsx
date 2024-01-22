import "../SignUp/signup.css";
import axios from "axios";
import {
  Container,
  FormContainer,
  Label,
  LinkContainer,
  StyledButton,
  StyledForm,
  StyledInput,
} from "pages/SignUp/styles";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInStatusStore } from "store/loggedInStatusStore";
import { useTokenStore } from "store/tokenStore";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";

const LogIn = () => {
  const { accessToken } = useTokenStore();
  const { isLoggedIn, setIsLoggedIn } = useLoggedInStatusStore();
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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("clicked");
      const res = await axios.post(
        `http://localhost:${
          process.env.REACT_APP_SERVER_PORT || 3000
        }/api/auth/sign-in`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      setIsLoggedIn(true);
      navigate("/home", { replace: true });
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message);
      // setTimeout(() => {zss
      //   window.location.reload();
      // }, 2000);
    }
  };

  // const CLIENT_ID = `${process.env.KAKAO_API_KEY}`;
  // const REDIRECT_URI = `${process.env.KAKAO_CALLBACK_URL}`;
  const CLIENT_ID = "87e81e12dd9ec54f482031c186a83318";
  const REDIRECT_URI = "http://localhost:3000/api/auth/kakao/callback";
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
  };

  // if (data) {
  //   navigate("/home", { replace: true });
  // }
  // alert(isLoggedIn);
  if (isLoggedIn) {
    navigate("/home", { replace: true });
  }
  return (
    <Container>
      {/* <div className="page-container"> */}
      <FormContainer>
        {/* <div className="login-form"> */}
        <StyledForm onSubmit={onSubmit}>
          {/* <form onSubmit={onSubmit}> */}
          {/* <label id="email-label"> */}
          <Label>
            <span>이메일</span>
            <div>
              <StyledInput
                type="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={onChange}
              />
              {/* <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={onChange}
              /> */}
            </div>
          </Label>
          {/* </label> */}
          <Label>
            <span>비밀번호</span>
            <div>
              <StyledInput
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
              />
              {/* <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
              /> */}
            </div>
          </Label>
          <label id="password-label"></label>
          <Label>
            {/* <button className="contrast outline" type="submit">
            로그인
          </button> */}
            <StyledButton type="submit">로그인</StyledButton>
          </Label>

          {/* </form> */}
          <LinkContainer>
            아직 회원이 아니신가요?&nbsp;
            <Link to="/signup">회원가입 하러가기</Link>
            {/* <button className="contrast outline">회원가입</button>
             */}
          </LinkContainer>
          <div
            className="ms-auto"
            style={{ cursor: "pointer", width: "50%", padding: 0 }}
          >
            <img
              src="img/kakao_login_image.png"
              alt="카카오 로그인"
              width="100%"
              style={{ cursor: "pointer" }}
              onClick={onKakaoLoginClick}
            />
          </div>
        </StyledForm>

        {/* </div> */}
      </FormContainer>

      {/* </div> */}
    </Container>
  );
};

export default LogIn;
