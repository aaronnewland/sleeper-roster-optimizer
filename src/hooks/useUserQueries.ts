import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "@/services/userService";

export const useUserQueries = (username?: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserInfo(username!),
    enabled: !!username,
  });
};
