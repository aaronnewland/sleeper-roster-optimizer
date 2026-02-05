import { playerDB } from "@/db/playerDB";
import { type Player } from "@/db/player";
import { getAllPlayers } from "@/services/playerService";

export async function populate() {
  console.log("Populating database...");
  getAllPlayers().then((players) => {
    if (players) {
      addPlayers(players);
    }
  });
}

async function addPlayers(players: Array<Player>) {
  try {
    await playerDB.players.bulkPut(players);
  } catch (e) {
    console.error(`Failed to add player: ${e}`);
  }
}
