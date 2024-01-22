import axios from "axios";

export const BASE_URL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT || 3000
}`;


  
// 기본 인스턴스
export const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// 인증이 필요한 인스턴스
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-type": "application/json",
  },
});

// 토큰 업데이트 함수
export const updateAuthToken = () => {
  authAxios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
};

// 이미지 인스턴스
export const imgAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // config.headers.Authorization이 문자열인 경우에만 includes 메서드 사용
    if (
      typeof config.headers.Authorization === "string" &&
      config.headers.Authorization.includes("null")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("interceptor: ", config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
