import { type League } from "@/types/sleeperAPITypes";

export async function getAllLeaguesForUser(user_id: string, season: number) {
  const baseURL = import.meta.env.VITE_SLEEPER_BASE_URL;

  try {
    const res = await fetch(`${baseURL}user/${user_id}/leagues/nfl/${season}`);
    const userLeagues: Array<League> = await res.json();

    return userLeagues;
  } catch (e) {
    console.error(e);
  }
}
