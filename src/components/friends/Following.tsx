import type { User } from "../../assets/types/user";
import { UserListDisplay } from "../user-list-display/UserListDisplay";

export function Following(
    {
        users,
        updateFollowing
    }:
    {
        users: User[],
        updateFollowing: React.Dispatch<React.SetStateAction<User[]>>
    }
) {
    return(
        <section className="friend-status">
        <header>
            <h2>Following</h2>
        </header>
        <main>
            <UserListDisplay
                users={users.filter(user => user.isFollowing)}
                updateFollowing={updateFollowing}
                />
        </main>
        </section>
    )
}