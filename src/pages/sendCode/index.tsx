import React, { useState, useEffect } from 'react';
import './styles.css';
import styles from "styled-components";

const SendCode = () => {
  // 이메일과 인증번호의 상태를 관리하는 state
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // 3분 동안의 제한 시간 상태를 관리하는 state
  const [remainingTime, setRemainingTime] = useState(0); // Set initial time to 0

  // Flag to track whether the timer is started
  const [timerStarted, setTimerStarted] = useState(false);

  // Type annotation for the timer variable
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  // 제한 시간이 감소할 때마다 호출되는 useEffect
  useEffect(() => {
    if (timerStarted && remainingTime > 0) {
      timerRef.current = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearTimeout(timerRef.current!);
  }, [timerStarted, remainingTime]);

  // 이메일 전송 버튼 클릭 시 호출되는 함수
  const handleEmailSubmit = () => {
    // 이메일 전송 로직 구현
    // 서버로 이메일 전송 요청 등 필요한 로직을 추가

    // Start the timer only if it's not already started
    if (!timerStarted) {
      setRemainingTime(180); // Set the initial time to 180 seconds (3 minutes)
      setTimerStarted(true);
    }
  };

  // 인증번호 확인 버튼 클릭 시 호출되는 함수
  const handleVerificationSubmit = () => {
    // 인증번호 확인 로직 구현
    // 서버로 인증번호 확인 요청 등 필요한 로직을 추가
  };

  return (
    <div>
      <h2>비밀번호 재설정</h2>
      
      {/* 이메일 입력 폼 */}
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEmailSubmit}>이메일 전송</button>
      
      {/* 인증번호 입력 폼 */}
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerificationSubmit}>확인</button>
      
      {/* 제한 시간 표시 */}
      {timerStarted && <p>남은 시간: {remainingTime}초</p>}
    </div>
  );
};

export default SendCode;
