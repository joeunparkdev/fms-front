import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";

const Home = () => {
  return (
    <div className="page-container">
      <div className="menu">
        <p>
          <a href="/home">HOME</a>
        </p>
        <p>
          <a href="/team">TEAM</a>
        </p>
        <p>
          <a href="/player">PLAYER</a>
        </p>
        <p>
          <a href="/strategy">STRATEGY</a>
        </p>
        <p>
          <a href="/match">MATCH</a>
        </p>
      </div>
      <div className="card">
        <h2>
          <a href="/home">Football Management System (FMS) ⚽🔥</a>
        </h2>
        <div className="profile-logo">
          <div className="notification-bell">
            <img src="src/img/bell.png" alt="알림 로고" />
            <div id="notificationCounter" className="notification-counter">
              0
            </div>
          </div>
          <img src="src/img/profile.png" alt="프로필 로고" />
        </div>
        <slot />
      </div>
    </div>
  );
};

export default Home;
