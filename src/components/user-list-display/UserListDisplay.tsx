import { useState } from "react";
import type { User } from "../../assets/types/user";
import "./user-list-display.css";

export function UserListDisplay({
    users,
    updateFollowing
}:
{
    users: User[],
    updateFollowing: React.Dispatch<React.SetStateAction<User[]>>
}) {
    const [expandedId, setExpandedId] = useState<number|null>(null);

    const handleUserFollowingClick = (userClicked: User): void => {
        updateFollowing(oldUserState => {
            return oldUserState.map(user => {
                if(user.id === userClicked.id) {
                    let newFollowing = !user.isFollowing;
                    return {...user, isFollowing: newFollowing};
                } else {
                    return user;
                }
            })
        });
    }

    const userListItems: JSX.Element[] = users.map((user) => {
        return (
            <UserCard
                user={user}
                isExpanded={user.id === expandedId}
                onTitleClick={
                    () => {
                        user.id !== expandedId ?
                        setExpandedId(user.id) :
                        setExpandedId(null);
                    }
                }
                onSaveClick={() => {
                    handleUserFollowingClick(user);
                }}

                key={user.id}
            />
        )
    });

    return(
        <div className="users-list">
            {userListItems}
        </div>
    )
}
