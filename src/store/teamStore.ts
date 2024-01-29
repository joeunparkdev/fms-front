import { create } from "zustand";

interface TeamStore {
  teamId?: number;
  name?: string;
  setTeamInfo: (teamId: number, name: string) => void;
  setTeamId: (teamId: number) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamId: undefined,
  name: "",
  setTeamInfo: (teamId: number, name: string) =>
    set({
      teamId,
      name,
    }),

  setTeamId: (teamId: number) =>
    set({
      teamId,
    }),
}));
