import type { Player } from "@/db/player";

export async function getAllPlayers() {
  const baseURL = import.meta.env.VITE_SLEEPER_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/players/nfl`);
    const allPlayerInfo = await res.json();
    const allPlayers: Array<Player> = Object.values(allPlayerInfo);

    return allPlayers;
  } catch (e) {
    console.error(e);
  }
}
