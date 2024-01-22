import { create } from "zustand";

interface ProfileStore {
  id: number | undefined;
  gender: string;
  preferredPosition: string;
  height: number;
  weight: number;
  setProfile: (profile: Omit<ProfileStore, "setProfile">) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  id: undefined,
  gender: "",
  preferredPosition: "",
  height: 0,
  weight: 0,
  setProfile: (profile) => set(profile),
}));
