import { useState } from "react";
import { UserCard } from "../user-card/UserCard";
import type { User } from "../../types/user";
import "./user-list-display.css";

export function UserListDisplay({users, onFollowClick}: 
    {
        users: User[], 
        onFollowClick: (id: number) => void
    }) {
    const [expandedId, setExpandedId] = useState<number|null>(null);

    const termListItems: JSX.Element[] = users.map((user) => {
        return (
            <UserCard
                user={user} 
                isExpanded={user.id === expandedId} 
                onUsernameClick={ 
                    () => {user.id !== expandedId ? 
                        setExpandedId(user.id) : 
                        setExpandedId(null)
                    }
                }
                onFollowClick={onFollowClick}
                key={user.id} 
            />
        )
    });

    return(
        <ol className="users-list">
            {termListItems}
        </ol>
    )
}