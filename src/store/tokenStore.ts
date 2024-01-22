import { create } from "zustand";

interface TokenStore {
  accessToken?: string;
  refreshToken?: string;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  clearToken: () =>
    set({
      accessToken: "",
    }),
}));
