import { create } from "zustand";

// 사용자 정보에 대한 인터페이스를 정의합니다.
interface UserStore {
  email: string;
  id: string;
  isAdmin: boolean;
  name: string;
  refreshToken: string | null;
  role: string;
  status: string;
  // 사용자 정보를 설정하는 함수들입니다.
  setUser: (user: Omit<UserStore, "setUser">) => void;
  clearUser: () => void; // 사용자 정보를 초기화합니다.
}

// useUserStore 훅을 생성합니다. 이 훅을 사용하여 상태를 읽고 업데이트할 수 있습니다.
export const useUserStore = create<UserStore>((set) => ({
  email: "",
  id: "",
  isAdmin: false,
  name: "",
  refreshToken: null,
  role: "",
  status: "",
  // 사용자 정보를 설정하는 함수입니다.
  setUser: (user) => set(user),
  // 모든 사용자 정보를 초기화하는 함수입니다.
  clearUser: () =>
    set({
      email: "",
      id: "",
      isAdmin: false,
      name: "",
      refreshToken: null,
      role: "",
      status: "",
    }),
}));
