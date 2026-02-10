import type { PlayerRankInfo } from "@/types/playerTypes";

type PlayerProps = {
  player: string;
  playerNamesMap: Map<string, PlayerRankInfo>;
  shouldStart: boolean;
};

export default function Player({
  player,
  playerNamesMap,
  shouldStart,
}: PlayerProps) {
  const allPlayerInfo = playerNamesMap?.get(player);
  const formattedPlayerInfo = allPlayerInfo?.spreadsheetVals
    ? allPlayerInfo.playerName +
      " - " +
      allPlayerInfo.spreadsheetVals.position +
      allPlayerInfo.spreadsheetVals.rank
    : allPlayerInfo?.playerName;
  return <p key={player}>{formattedPlayerInfo}</p>;
}
