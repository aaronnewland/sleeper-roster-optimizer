import { useQueries } from "@tanstack/react-query";

import type { League } from "@/types/sleeperAPITypes";
import { getAllRostersForLeague } from "@/services/rosterService";

export const useRostersQueries = (allLeagueData: Array<League>) => {
  return useQueries({
    queries: (allLeagueData || [])?.map((league) => {
      return {
        queryKey: ["roster", league.league_id],
        queryFn: () => getAllRostersForLeague(league.league_id),
        enabled: !!allLeagueData,
      };
    }),
  });
};
