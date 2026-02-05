import Dexie, { type Table } from "dexie";
import { type Player } from "@/db/player";
import { populate } from "@/db/populate";

// A database for all players fetched by sleeper's API
export class PlayerDB extends Dexie {
  players!: Table<Player, string>;
  constructor() {
    super("PlayerDB");

    this.version(1).stores({
      players:
        "player_id, depth_chart_position, active, status, fantasy_positions, team, height, last_name, years_exp, age, full_name, first_name, injury_status, search_full_name, number",
    });
  }
}

export const playerDB = new PlayerDB();

playerDB.on("populate", populate);
