import { useLiveQuery } from "dexie-react-hooks";
import type { League, Roster } from "@/types/sleeperAPITypes";
import type {
  PlayerRankInfo,
  PlayerSpreadsheetVals,
} from "@/types/playerTypes";
import { playerDB } from "@/db/playerDB";
import RosterComponent from "@/components/RosterComponent";

type LeagueUserCardProps = {
  userLeagues: Array<Roster>;
  league: League;
  playerRankMap: Map<string, PlayerSpreadsheetVals>;
};

export default function LeagueUserCard({
  userLeagues,
  league,
  playerRankMap,
}: LeagueUserCardProps) {
  // create a map for all of the user's player ID's to the player's full name
  const allPlayerIDs = userLeagues.flatMap((roster) => roster.players || []);

  const playerNamesMap: Map<string, PlayerRankInfo> =
    useLiveQuery(async () => {
      const players = await playerDB.players.bulkGet(allPlayerIDs);

      const map: Map<string, PlayerRankInfo> = new Map();

      players.forEach((player, index) => {
        if (player) {
          map.set(allPlayerIDs[index], {
            playerName: player.first_name + " " + player.last_name,
            spreadsheetVals: playerRankMap.get(
              player.first_name + " " + player.last_name,
            ),
          });
        }
      });
      return map;

      // re-renders if user's player's change OR if new rankings sheet
      // is uploaded
    }, [allPlayerIDs.length, playerRankMap]) ||
    new Map<string, PlayerRankInfo>();

  const playerRoster = userLeagues.find(
    (userLeague) => userLeague.league_id === league.league_id,
  )?.players;
  const starters =
    userLeagues.find((userLeague) => userLeague.league_id === league.league_id)
      ?.starters || [];
  const bench =
    playerRoster?.filter((player) => !starters?.includes(player)) || [];
  const reserve =
    userLeagues.find((userLeague) => userLeague.league_id === league.league_id)
      ?.reserve || [];

  return (
    <div key={league.league_id} className="m-2">
      <p className="text-3xl">League Name: {league.name}</p>
      <p>League Avatar: {league.avatar}</p>
      <p>Draft ID: {league.draft_id}</p>
      <p>League ID: {league.league_id}</p>
      <RosterComponent
        rosterName="Starters"
        roster={starters}
        playerNamesMap={playerNamesMap}
      />
      <RosterComponent
        rosterName="Bench"
        roster={bench}
        playerNamesMap={playerNamesMap}
      />
      <RosterComponent
        rosterName="Injured Reserve"
        roster={reserve}
        playerNamesMap={playerNamesMap}
      />
    </div>
  );
}
