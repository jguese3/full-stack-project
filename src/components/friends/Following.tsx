import { useUser } from "../../hooks/useUser";
import type { User } from "../../types/user";
import { UserListDisplay } from "../user-list-display/UserListDisplay";

type UserListPageProps = {
    userDependencies: any[],
    userFilterFn: ((user: User) => boolean)|null
}

export function Following({userDependencies, userFilterFn}: UserListPageProps) {

    const { users, error, toggleFollow } = useUser(userDependencies, userFilterFn);

    const handleFollowClick = async (id: number) => {
        await toggleFollow(id);
    }
    return (
        <section className="friend-status">
          <h2>Following</h2>
            {error ? (
                <span className="error">Something went wrong: ({error})</span>
            ) : (
                <UserListDisplay
                    users={users}
                    onFollowClick={handleFollowClick}
                />
            )}
        </section>
    );
}



 