import type { User } from "../types/user";
import { userData } from "../assets/temp/tempUsers";

// Get all users
export function fetchUsers(): User[] {
    return userData;
}

// Get user by Id
export function getUserById(userId: number): User {
    const foundUser = userData.find(u => u.id === userId);

    if(!foundUser) {
        throw new Error(`Failed to fetch user with ID: ${userId}`)
    }

    return foundUser;
}

// Add following
export async function followUser(userId: number) {
    const foundUser = userData.find(u => u.id === userId);

    if(!foundUser) {
        throw new Error(`Failed to fetch user with ID: ${userId}`);
    } else {
        foundUser.isFollowing = true;
    }

    return foundUser;
    
}

// Delete following
export async function unfollowUser(userId: number) {
    const foundUser = userData.find(u => u.id === userId);

    if(!foundUser) {
        throw new Error(`Failed to fetch user with ID: ${userId}`);
    } else {
        foundUser.isFollowing = false;
    }
    console.log("User unfollowed:", foundUser);
    return foundUser;
}