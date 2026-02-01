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
        <>
        <header>
            <h1>Following</h1>
        </header>
        <main>
            <UserListDisplay
                users={users.filter(user => user.isFollowing)}
                updateFollowing={updateFollowing}
                />
        </main>
        </>
    )
}