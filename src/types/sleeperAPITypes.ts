export type User = {
  username: string;
  user_id: string;
  display_name: string;
  avatar: string;
  leagues?: Array<League>;
};

export type League = {
  avatar: string | null;
  name: string;
  draft_id: string;
  league_id: string;
  previous_league_id: string;
  roster_positions: Array<string>;
  total_rosters: number;
  season: string;
  season_type: string;
  sport: string;
  status: string;
};

export type Roster = {
  roster_id: number;
  owner_id: string;
  league_id: string;
  players: Array<string>;
  starters: Array<string>;
  reserve: Array<string>;
  taxi: Array<string> | null;
  player_map: Map<string, string>;
  co_owners: Array<string>;
  keepers: Array<string>;
  metadata: Map<string, string>;
  settings: Map<string, string>;
};

//     self.roster_id: int = 0
//     self.owner_id: str = ""
//     self.league_id: str = ""
//     self.players: list[str] = []
//     self.starters: list[str] = []
//     self.reserve: list[str] = []
//     self.taxi: list[str] | None = None
//     self.player_map: dict[str, str] | None = None
//     self.co_owners: list[str] | None = None
//     self.keepers: list[str] | None = None
//     self.metadata: dict[str, str] = {}
//     self.settings: dict[str, str] = {}
//
//     self._parse_roster_data(roster_info)
//
// def _parse_roster_data(self, roster_info: dict[str, object]) -> None:
//     self.roster_id = int(str(roster_info.get("roster_id", 0)))
//     self.owner_id = str(roster_info.get("owner_id", 0))
//     self.league_id = str(roster_info.get("league_id", 0))
//
//     if isinstance(roster_info["players"], list):
//         self.players = roster_info["players"]
//     if isinstance(roster_info["starters"], list):
//         self.starters = roster_info["starters"]
//     if isinstance(roster_info["reserve"], list):
//         self.reserve = roster_info["reserve"]
//     if isinstance(roster_info["taxi"], list):
//         self.taxi = roster_info["taxi"]
//     if isinstance(roster_info["player_map"], dict):
//         self.player_map = roster_info["player_map"]
//
//     if isinstance(roster_info["co_owners"], list):
//         self.co_owners = roster_info["co_owners"]
//     if isinstance(roster_info["keepers"], list):
//         self.keepers = roster_info["keepers"]
//     if isinstance(roster_info["metadata"], dict):
//         self.metadata = roster_info["metadata"]
//     if isinstance(roster_info["settings"], dict):
//         self.settings = roster_info["settings"]
