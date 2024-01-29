import { create } from "zustand";

interface TeamStore {
  teamId?: number;
  name?: string;
  imageUUID?: string;
  setTeamInfo: (teamId: number, name: string, imageUUID: string) => void;
  setTeamId: (teamId: number) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamId: undefined,
  name: "",
  imageUUID: "",
  setTeamInfo: (teamId: number, name: string, imageUUID: string) =>
    set({
      teamId,
      name,
      imageUUID,
    }),

  setTeamId: (teamId: number) =>
    set({
      teamId,
    }),
}));
