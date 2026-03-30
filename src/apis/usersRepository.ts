import type { User } from "../types/user";

type UsersResponseJSON = { message: string; data: User[] };
type UserResponseJSON = { message: string; data: User };

const BASE_URL = `${import.meta.env.VITE_API_ASE_URL}/api/v1`;
const USER_ENDPOINT = "/users";

// Get all users
export async function fetchUsers(): Promise<User[]> {
    const userResponse: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}`
    );

    if (!userResponse.ok) {
        throw new Error("Failed to fetch users");
    }

    const json: UserResponseJSON = await userResponse.json();
    return json.data;
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

    return userData.find(u => u.id === userId)!;
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
    return userData.find(u => u.id === userId)!;
}