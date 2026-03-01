import { useState } from "react";
import type { User } from "../../assets/types/user";
import { userData } from "../../assets/temp/tempUsers";
import SearchFriends from "./SearchFriends";
import { Following } from "./Following";
import { Friends } from "./Friends";

export const FriendsPage = () => {
  const [users, setUsers] = useState<User[]>(userData);

  return (
    <>
      <SearchFriends users={users} updateFollowing={setUsers} />
      <Following users={users} updateFollowing={setUsers} />
      <Friends />
    </>
  );
};