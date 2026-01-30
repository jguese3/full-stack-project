import type { User } from "../../assets/types/user";
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
        onUsernameClick: () => void,
        onFollowClick: () => void
    }
) {
    return (
        <div className="user-card">
            <div className="user-card-top">
            {}
            <h3 onClick={onUsernameClick}>
                {user.userName}
            </h3>
            {}
            <button onClick={onFollowClick}>
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