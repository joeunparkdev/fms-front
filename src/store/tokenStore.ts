import { create } from "zustand";

// interface TokenStore {
//   accessToken?: string;
//   refreshToken?: string;
// }

export const useTokenStore = () => ({
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
});
