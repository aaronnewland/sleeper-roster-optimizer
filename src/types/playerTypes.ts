export type PlayerSpreadsheetVals = {
  position: string;
  rank: number;
  tier: number;
};

export type PlayerRankInfo = {
  playerName: string;
  spreadsheetVals?: PlayerSpreadsheetVals;
};
