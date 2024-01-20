import axios from "axios";

export default (url: string) => {
  // localStorage에서 accessToken을 가져옵니다.
  const accessToken = localStorage.getItem("accessToken");

  // axios 요청을 보낼 때 Authorization 헤더에 accessToken을 포함합니다.
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
};
