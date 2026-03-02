import type { User } from "../../types/user";
import "./user-card.css";

export function UserCard(
    {
        user,
        isExpanded,
        onUsernameClick,
        onFollowClick
    }
    : {
        user: User,
        isExpanded: boolean,
        onUsernameClick: (id: number) => void,
        onFollowClick: (id: number) => void
    }
) {
    return (
        <div className="user-card">
            <div className="user-card-top">
            {}
            <h3 onClick={() => onUsernameClick(user.id)}>
                {user.userName}
            </h3>
            {}
            <button onClick={() => onFollowClick(user.id)}>
                {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
            </div>
            {}
            { isExpanded
                ? <p>{user.bio}</p>
                : null
            }
        </div>
    );
}