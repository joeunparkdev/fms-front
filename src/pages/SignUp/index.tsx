import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 30%;
  border: 2px solid #blue;
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
`;

// SignUp component
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
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      setInputs({
        ...inputs,
        password: "",
        passwordConfirm: "",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/sign-up",
        {
          email,
          name,
          password,
          passwordConfirm,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      console.log(response.data);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message || "An error occurred");
      } else if (error instanceof Error) {
        // Handle generic error instances
        alert(error.message);
      } else {
        // Handle cases where the caught error is not an Error instance
        alert("An error occurred");
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>회원가입</Title>
        <StyledForm onSubmit={onSubmit}>
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
          <StyledButton type="submit">가입완료</StyledButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};
export default SignUp;
