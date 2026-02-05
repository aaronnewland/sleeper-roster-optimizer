import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";

import { useUserQueries } from "@/hooks/useUserQueries";
import { useLeagueQueries } from "@/hooks/useLeagueQueries";
import { playerDB } from "@/db/playerDB";
import { useRostersQueries } from "@/hooks/useRostersQueries";

export default function User() {
  // get username from url
  const { username } = useParams<{ username: string }>();

  // fetch user information from sleeper
  const { data: user, isLoading: isUserLoading } = useUserQueries(username);

  //TODO: delete this, I don't think it's needed
  // const user_id = user?.user_id;

  // fetch all user's league information once the user info is fetched
  const { data: allLeagueData, isSuccess: isLeagueFetched } = useLeagueQueries(
    user?.user_id,
  );

  // fetch all user's rosters across all leagues
  const userRostersQueries = useRostersQueries(allLeagueData || []);

  // ensure all roster data has been fetched
  const isRostersFetched = userRostersQueries.every((query) => query.isSuccess);

  // contains ONLY user's rosters across all leagues
  const userLeagues = userRostersQueries.flatMap((query) =>
    (query.data || []).filter((roster) => roster.owner_id === user?.user_id),
  );

  const allPlayerIDs = userLeagues.flatMap((roster) => roster.players || []);

  // create a map for all of the user's player ID's to the player's full name
  const playerNamesMap = useLiveQuery(async () => {
    const players = await playerDB.players.bulkGet(allPlayerIDs);

    const map = new Map();

    players.forEach((player, index) => {
      if (player) {
        map.set(allPlayerIDs[index], player.full_name);
      }
    });
    return map;

    // re-renders if user's player's change
  }, [allPlayerIDs.length]);

  return (
    <div>
      {isUserLoading ? (
        <h1>Loading user data...</h1>
      ) : (
        <div>
          <h1>User Information</h1>
          <p>Username: {user!.username}</p>
          <p>UserID: {user!.user_id}</p>
          <p>Avatar: {user!.avatar}</p>
          <p>Display Name: {user?.display_name}</p>
        </div>
      )}
      {!isLeagueFetched || !isRostersFetched ? (
        <h1>Loading all user league data...</h1>
      ) : (
        <div>
          <h1>User Leagues</h1>
          {allLeagueData!.map((league) => {
            const playerRoster = userLeagues.find(
              (userLeague) => userLeague.league_id === league.league_id,
            )?.players;
            const starters = userLeagues.find(
              (userLeague) => userLeague.league_id === league.league_id,
            )?.starters;
            const bench = playerRoster?.filter(
              (player) => !starters?.includes(player),
            );
            const reserve = userLeagues.find(
              (userLeague) => userLeague.league_id === league.league_id,
            )?.reserve;
            return (
              <div key={league.league_id} className="m-2">
                <p className="text-3xl">League Name: {league.name}</p>
                <p>League Avatar: {league.avatar}</p>
                <p>Draft ID: {league.draft_id}</p>
                <p>League ID: {league.league_id}</p>
                <p>Previous League ID</p>
                <p className="text-2xl">Starters: {league.name}</p>
                {starters && starters[0] !== "0" ? (
                  starters.map((player) => {
                    return (
                      <p key={player}>
                        {player.length < 4
                          ? player
                          : `${player} - ${playerNamesMap?.get(player)}`}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
                <p className="text-2xl">Bench: {league.name}</p>
                {bench && bench[0] !== "0" ? (
                  bench.map((player) => {
                    return (
                      <p key={player}>
                        {player.length < 4
                          ? player
                          : `${player} - ${playerNamesMap?.get(player)}`}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
                <p className="text-2xl">Injured Reserve: {league.name}</p>
                {reserve && reserve[0] !== "0" ? (
                  reserve.map((player) => {
                    return (
                      <p key={player}>
                        {player.length < 4
                          ? player
                          : `${player} - ${playerNamesMap?.get(player)}`}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
