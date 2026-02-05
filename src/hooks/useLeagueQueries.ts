import { useQuery } from "@tanstack/react-query";

import { getAllLeaguesForUser } from "@/services/leagueService";

export const useLeagueQueries = (user_id?: string, season: number = 2025) => {
  return useQuery({
    queryKey: ["userLeagues", user_id],
    queryFn: () => getAllLeaguesForUser(user_id!, season),
    enabled: !!user_id,
  });
};
