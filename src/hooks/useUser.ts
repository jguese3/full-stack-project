import { useEffect, useState } from "react";
import * as UserService from "../services/userService"
import type { User } from "../types/user";
import { fetchUsers } from "../apis/usersRepository";

export function useUser(
    dependencies: unknown[],
) {
    const [users] = useState<User[]>([]);
    const [error, setError] = useState<string | null>();

    const toggleFollow = async(termId: number) => {
        try {
            await UserService.toggleFollowUser(termId);

            await fetchUsers();
        } catch(errorObject) {
            setError(`${errorObject}`);
        }   
    }

    useEffect(() => {
        fetchUsers();
    }, [...dependencies]);

    return { 
        users, 
        error, 
        toggleFollow 
    };
}
