import { useLiveQuery } from "dexie-react-hooks";
import type { League, Roster } from "@/types/sleeperAPITypes";
import type {
  PlayerRankInfo,
  PlayerSpreadsheetVals,
} from "@/types/playerTypes";
import { playerDB } from "@/db/playerDB";
import RosterComponent from "@/components/RosterComponent";

type LeagueUserCardProps = {
  roster: Roster;
  league: League;
  playerRankMap: Map<string, PlayerSpreadsheetVals>;
};

export default function LeagueUserCard({
  roster,
  league,
  playerRankMap,
}: LeagueUserCardProps) {
  const playerIDs = roster.players;

  // create a map for all of the user's player ID's to the player's full name
  const playerNamesMap: Map<string, PlayerRankInfo> =
    useLiveQuery(async () => {
      const players = await playerDB.players.bulkGet(playerIDs);

      const map: Map<string, PlayerRankInfo> = new Map();

      players.forEach((player, index) => {
        if (player) {
          map.set(playerIDs[index], {
            playerName: player.first_name + " " + player.last_name,
            // add rank info to player if applicable
            spreadsheetVals: playerRankMap.get(
              player.first_name + " " + player.last_name,
            ),
          });
        }
      });
      return map;

      // re-renders if user's player's change OR if new rankings sheet
      // is uploaded
    }, [playerIDs.length, playerRankMap]) || new Map<string, PlayerRankInfo>();

  const starters = roster.starters;
  const bench =
    playerIDs?.filter((player) => !starters?.includes(player)) || [];
  const reserve = roster.reserve;

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
