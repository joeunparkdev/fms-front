import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoggedInStatusStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setLogOut: () => void;
}

export const useLoggedInStatusStore = create(
  persist<LoggedInStatusStore>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setLogOut: () => set({ isLoggedIn: false }),
    }),
    {
      name: "loggedInStatusStore",
    }
  )
);
