import type { PlayerRankInfo } from "@/types/playerTypes";

type PlayerProps = {
  player: string;
  playerNamesMap: Map<string, PlayerRankInfo>;
};

export default function Player({ player, playerNamesMap }: PlayerProps) {
  const allPlayerInfo = playerNamesMap?.get(player);
  const formattedPlayerInfo = allPlayerInfo?.spreadsheetVals
    ? allPlayerInfo.playerName +
      " - " +
      allPlayerInfo.spreadsheetVals.position +
      allPlayerInfo.spreadsheetVals.rank
    : allPlayerInfo?.playerName;
  return <p key={player}>{formattedPlayerInfo}</p>;
}
