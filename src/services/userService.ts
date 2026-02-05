import { type User } from "@/types/sleeperAPITypes";

export async function getUserInfo(username: string) {
  const baseURL = import.meta.env.VITE_SLEEPER_BASE_URL;

  try {
    const res = await fetch(`${baseURL}user/${username}`);
    const userInfo: User = await res.json();

    return userInfo;
  } catch (e) {
    console.error(e);
  }
}
