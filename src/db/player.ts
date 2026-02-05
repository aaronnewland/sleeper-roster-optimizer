export interface Player {
  player_id: string;
  depth_chart_position: string | null;
  active: boolean;
  status: string;
  fantasy_positions: Array<string>;
  team: string | null;
  height: string;
  last_name: string;
  years_exp: number;
  age: number;
  full_name: string;
  first_name: string;
  injury_status: string | null;
  search_full_name: string;
  number: number;
}

// keep for refrence for now, add only what is needed
// interface Player {
//   player_id: string;
//   metadata: string | null;
//   birth_date: Date;
//   search_first_name: string;
//   fantasy_data_id: number;
//   depth_chart_position: string | null;
//   espn_id: number;
//   practice_participation: string | null;
//   college: string;
//   team_abbr: string | null;
//   active: boolean;
//   player_shard: string;
//   practice_description: string | null;
//   sportradar_id: string;
//   injury_notes: string | null;
//   injury_start_date: Date | null;
//   rotowire_id: number;
//   birth_country: string | null;
//   rotoworld_id: string | null;
//   search_last_name: string;
//   status: string;
//   fantasy_positions: Array<string>;
//   pandascore_id: string | null;
//   team: string | null;
//   hashtag: string;
//   swish_id: number | null;
//   height: string;
//   search_rank: number;
//   news_updated: boolean | null; // check this
//   depth_chart_order: number | null;
//   gsis_id: string | null;
//   yahoo_id: number;
//   last_name: string;
//   team_changed_at: Date | null;
//   birth_city: string | null;
//   years_exp: number;
//   competitions: Array<string>;
//   weight: string;
//   injury_body_part: string | null;
//   age: number;
//   kalshi_id: string | null;
//   full_name: string;
//   first_name: string;
//   injury_status: string | null;
//   position: string;
//   stats_id: number;
//   oddsjam_id: string | null;
//   opta_id: string | null;
//   birth_state: string | null;
//   sport: string;
//   high_school: string | null;
//   search_full_name: string;
//   number: number;
// }
