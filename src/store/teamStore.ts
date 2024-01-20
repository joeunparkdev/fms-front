import { create } from "zustand";

interface TeamStore {
  teamId?: number;
  setTeamId: (teamId: number) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamId: undefined,
  setTeamId: (teamId: number) =>
    set({
      teamId,
    }),
}));
