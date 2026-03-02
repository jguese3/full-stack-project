import * as UserRepo from "../apis/usersRepository";
import type { User } from "../types/user";

/**
 * Function decides which repo method to invoke depending on the user's
 * input if they want to follow or unfollow a user.
 * @param userId: the id of the user to be followed/unfollowed
 */
export async function toggleFollowUser(userId: number) {
    const user: User = await UserRepo.getUserById(userId);
    if(user.isFollowing) {
        await UserRepo.unfollowUser(
            user.id,
        );
    } else {
        await UserRepo.followUser(
            user.id,
        );
    }
}

/**
 * A straightforward request to get all users from the repository.
 * @returns Promise<User[]>: an array of users
 */
export async function fetchUsers() {
    const users = await UserRepo.fetchUsers();
    return users;
}
