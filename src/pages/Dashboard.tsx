import { useParams } from "react-router-dom";

import { useUserQueries } from "@/hooks/useUserQueries";
import { useLeagueQueries } from "@/hooks/useLeagueQueries";
import { useRostersQueries } from "@/hooks/useRostersQueries";

import UserCard from "@/components/UserCard";
import LeagueUserCard from "@/components/LeagueRosterCard";

export default function Dashboard() {
  const { username } = useParams<{ username: string }>();

  // fetch user info from sleeper in this order:
  //    fetch user info off of provided username
  //    fetch all user's league info
  //    fetch all user's roster across all leagues
  const { data: user, isLoading: isUserLoading } = useUserQueries(username);
  const { data: allLeagueData, isSuccess: isLeagueFetched } = useLeagueQueries(
    user?.user_id,
  );
  const userRostersQueries = useRostersQueries(allLeagueData || []);

  // ensure all roster data has been fetched
  const isRostersFetched = userRostersQueries.every((query) => query.isSuccess);

  // contains ONLY user's rosters across all leagues
  const userLeagues = userRostersQueries.flatMap((query) =>
    (query.data || []).filter((roster) => roster.owner_id === user?.user_id),
  );

  return (
    <div>
      {isUserLoading ? (
        <h1>Loading user data...</h1>
      ) : (
        user && <UserCard user={user} />
      )}
      {!isLeagueFetched || !isRostersFetched ? (
        <h1>Loading all user league data...</h1>
      ) : (
        <div>
          <h1>User Leagues</h1>
          {allLeagueData!.map((league) => (
            <LeagueUserCard
              userLeagues={userLeagues}
              league={league}
              key={league.league_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
