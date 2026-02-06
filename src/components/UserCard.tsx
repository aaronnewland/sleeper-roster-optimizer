import { type User } from "@/types/sleeperAPITypes";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h1>User Information</h1>
      <p>Username: {user!.username}</p>
      <p>UserID: {user!.user_id}</p>
      <p>Avatar: {user!.avatar}</p>
      <p>Display Name: {user?.display_name}</p>
    </div>
  );
}
