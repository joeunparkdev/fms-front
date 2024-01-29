import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  FormContainer,
  Label,
  LinkContainer,
  StyledButton,
  StyledForm,
  StyledInput,
  Title,
} from "./styles";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });
  const { email, name, password, passwordConfirm, verificationCode } = inputs;

  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState(
    "비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해서 8자리 이상으로 입력해야 합니다."
  );

  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState<number | null>(null);
  const [verificationTimeRemaining, setVerificationTimeRemaining] = useState(180);
  const [timerVisible, setTimerVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const isStrong = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    const strengthMessage = isStrong(value)
      ? "강력한 비밀번호입니다."
      : "비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해서 8자리 이상으로 입력해야 합니다.";
    setPasswordStrengthMessage(strengthMessage);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (verificationSent && !verificationCode) {
      setAlertMessage("인증 코드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setInputs({
        ...inputs,
        password: "",
        passwordConfirm: "",
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT || 3000}/api/auth/sign-up-verification`,
        {
          email,
          name,
          password,
          passwordConfirm,
          verificationCode,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT || 3000}/api/auth/send-code`,
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setAlertMessage("인증 번호 전송 성공!");
      setVerificationSent(true);
      setTimerVisible(true);

      // Set the verification timer
      setVerificationTimer(
        setInterval(() => {
          setVerificationTimeRemaining((prev) => Math.max(0, prev - 1));
        }, 1000) as unknown as number
      );
    } catch (error) {
      console.error(error);
      setAlertMessage("인증 번호 전송 실패");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT || 3000}/api/auth/verify-code`,
        { verificationCode },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setAlertMessage("Verification code verified!");
      // Reset verification state and timer
      setVerificationSent(false);
      setVerificationTimeRemaining(180);
      setTimerVisible(false);
      if (verificationTimer) {
        clearInterval(verificationTimer);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to verify the code.");

      setVerificationSent(false);
      setVerificationTimeRemaining(180);
      setTimerVisible(false);
      setInputs({
        ...inputs,
        verificationCode: "", // 인증 코드 입력 상자 비우기
      });
      setAlertMessage("");
    }
  };

  const CLIENT_ID = "87e81e12dd9ec54f482031c186a83318";
  const REDIRECT_URI = "http://localhost:3000/api/auth/kakao/callback";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onKakaoLoginClick = async () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <FormContainer>
        <Title>회원가입</Title>
        <StyledForm onSubmit={onSubmit}>
          <Label>
            <span>이메일</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <StyledInput
                type="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={onChange}
              />
              {/* {!verificationSent && (
                <StyledButton type="button" onClick={sendVerificationCode}>
                  인증
                </StyledButton>
              )} */}
            </div>
          </Label>
          <Label>
            <span>이름</span>
            <div>
              <StyledInput
                type="text"
                name="name"
                placeholder="이름"
                value={name}
                onChange={onChange}
              />
            </div>
          </Label>
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
            </div>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {passwordStrengthMessage}
            </div>
          </Label>
          <Label>
            <span>비밀번호 확인</span>
            <div>
              <StyledInput
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={onChange}
              />
            </div>
          </Label>
          {verificationSent && (
            <>
              <Label>
                <span>인증 코드</span>
                <div>
                  <StyledInput
                    type="text"
                    name="verificationCode"
                    placeholder="인증 코드"
                    value={verificationCode}
                    onChange={onChange}
                  />
                </div>
              </Label>
              {timerVisible && (
                <div>
                  <p style={{ color: "red" }}>남은 시간: {Math.floor(verificationTimeRemaining / 60)}:{verificationTimeRemaining % 60}</p>
                </div>
              )}
              <StyledButton type="button" onClick={verifyCode}>
                인증 확인
              </StyledButton>
            </>
          )}
          <StyledButton type="submit">가입완료</StyledButton>
        </StyledForm>
        <div
          className="ms-auto kakao-login-container"
          style={{ cursor: "pointer", width: "100%" }}
        >
          <img
            src="img/kakao_login_image.png"
            alt="카카오 로그인"
            style={{ cursor: "pointer", width: "100%" }}
            onClick={onKakaoLoginClick}
          />
        </div>
        {alertMessage && <p>{alertMessage}</p>}
        <LinkContainer>
          이미 회원이신가요?&nbsp;
          <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
