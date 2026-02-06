import type { PlayerRankInfo } from "@/types/playerTypes";
import Player from "./Player";

type RosterComponentProps = {
  rosterName: string;
  roster: Array<string>;
  playerNamesMap: Map<string, PlayerRankInfo>;
};

export default function RosterComponent({
  rosterName,
  roster,
  playerNamesMap,
}: RosterComponentProps) {
  return (
    <>
      <p className="text-2xl">{rosterName}</p>
      {roster && roster[0] !== "0" ? (
        roster.map((player) => (
          <Player
            player={player}
            playerNamesMap={playerNamesMap}
            key={player}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
}
