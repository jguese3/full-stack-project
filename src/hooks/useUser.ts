import { useEffect, useState } from "react";
import * as UserService from "../services/userService"
import type { User } from "../types/user";

export function useUser(
    dependencies: unknown[] = [],
    filterFn?: ((user: User) => boolean) | null,
) {
    const [users, updateUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async() => {
        try {
            let result = await UserService.fetchUsers();

            if(filterFn) {
                result = result.filter(filterFn);
            }

            // map the resulting array onto the state
            updateUsers([...result]);
        } catch(errorObject) {
            // set the error state to the error object if an error is caught
            setError(`${errorObject}`);
        }
    }
    
    const toggleFollow = async(userId: number) => {
        try {
            const user = users.find(u) => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }
            
            await UserService.toggleFollowUser(user);
            await fetchUsers();
        } catch(errorObject) {
            setError(`${errorObject}`);
        }   
    };

    useEffect(() => {
        fetchUsers();
    }, [...dependencies]);

    return { 
        users, 
        error, 
        toggleFollow 
    };
}
