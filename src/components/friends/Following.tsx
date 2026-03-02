import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { UserListDisplay } from "../user-list-display/UserListDisplay";
import { fetchUsers, followUser, unfollowUser } from "../../apis/usersRepository";

export function Following() {
  const [users, setUsers] = useState<User[]>([]);

  // Load users on mount
  useEffect(() => {
    setUsers(fetchUsers());
  }, []);

  const handleFollowToggle = async (id: number) => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    if (user.isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }

    // Refresh from repo
    setUsers(fetchUsers());
  };

  return (
    <section className="friend-status">
      <header>
        <h2>Following</h2>
      </header>

      <main>
        <UserListDisplay
          users={users.filter(user => user.isFollowing)}
          onFollowClick={handleFollowToggle}
        />
      </main>
    </section>
  );
}