import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  id: string | null;
  gender: string;
  preferredPosition: string;
  height: number;
  weight: number;
  setProfile: (profile: Omit<ProfileStore, "setProfile">) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  id: null,
  gender: "",
  preferredPosition: "",
  height: 0,
  weight: 0,
  setProfile: (profile) => set(profile),
  resetProfile: () =>
    set({ id: null, gender: "", preferredPosition: "", height: 0, weight: 0 }),
}));
