import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  id: string | undefined;
  gender: string;
  preferredPosition: string;
  height: number;
  weight: number;
  setProfile: (profile: Omit<ProfileStore, "setProfile">) => void;
}

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      id: "",
      gender: "",
      preferredPosition: "",
      height: 0,
      weight: 0,
      setProfile: (profile) => set(profile),
    }),
    {
      name: "profile-storage",
    }
  )
);
