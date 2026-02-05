import { type Roster } from "@/types/sleeperAPITypes";
// https://api.sleeper.app/v1/league/<league_id>/rosters

export async function getAllRostersForLeague(league_id: string) {
  const baseURL = import.meta.env.VITE_SLEEPER_BASE_URL;

  try {
    const res = await fetch(`${baseURL}league/${league_id}/rosters`);
    const rosters: Array<Roster> = await res.json();

    return rosters;
  } catch (e) {
    console.error(e);
  }
}
