import type { User } from "../types/user";

type UsersResponseJSON = {message: String, data: User[]};
type UserResponseJSON = {message: String, data: User};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const USER_ENDPOINT = "/users"

export async function fetchUsers(): Promise<User[]> {
    const userResponse: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}`
    );

    if(!userResponse.ok) {
        throw new Error("Failed to fetch user");
    }

    const json: UsersResponseJSON = await userResponse.json();
    return json.data;
}

export async function getUserByUsername(userName: string): Promise<User> {
    const userResponse: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}/${userName}`
    );

    if (!userResponse.ok) {
        throw new Error(`Failed to fetch user with username: ${userName}`);
    }

    const json: UserResponseJSON = await userResponse.json();
    return json.data;
}

export async function followUser(user: User): Promise<User> {
    user.isFollowing = true;

    const updateResponse: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}/${user.id}`,
        {
            method: "PUT",
            body: JSON.stringify({...user}),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!updateResponse.ok) {
        throw new Error(`Failed to follow user with ID ${user.id}`)
    }

    const json: UserResponseJSON = await updateResponse.json();
    return json.data;
}

export async function unfollowUser(user: User): Promise<User> {
    user.isFollowing = false;

    const updateResponse: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}/${user.id}`,
        {
            method: "PUT",
            body: JSON.stringify({...user}),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!updateResponse.ok) {
        throw new Error(`Failed to unfollow user with ID ${user.id}`)
    }

    const json: UserResponseJSON = await updateResponse.json();
    return json.data;
}