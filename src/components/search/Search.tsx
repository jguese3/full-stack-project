import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { SearchBar } from "../common/search-bar/SearchBar";
import { UserListDisplay } from "../user-list-display/UserListDisplay";
import { fetchUsers, followUser, unfollowUser } from "../../apis/usersRepository";
import { validateSearch } from "../../services/searchService";

export function Search() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };

        loadUsers();
    }, []);

    const handleSubmit = () => {
        const validation = validateSearch(searchValue);

        if (!validation.isValid) {
            setMessages(validation.errors);
            setFilteredUsers([]);
            return;
        }

        setMessages([]);

        const results = users.filter(user =>
            user.userName.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredUsers(results);
    };

    const handleFollowToggle = async (id: number) => {
        const user = users.find(u => u.id === id);
        if (!user) return;

        if (user.isFollowing) {
            await unfollowUser(user);
        } else {
            await followUser(user);
        }
        
        const updateUsers = users.map(u =>
            u.id === id ? { ...u, isFollowing: !u.isFollowing } : u
        );

        const updatedFilteredUsers = filteredUsers.map(u =>
            u.id === id ? { ...u, isFollowing: !u.isFollowing } : u
        );

        setUsers(updateUsers);
        setFilteredUsers(updatedFilteredUsers);
    };

    return (
        <section className="friend-status">
            <header>
                <h2>Search Friends</h2>
            </header>

            <main>
                <SearchBar
                    searchValue={searchValue}
                    messages={messages}
                    handleSearchChange={setSearchValue}
                    handleSubmit={handleSubmit}
                />

                <UserListDisplay
                    users={filteredUsers}
                    onFollowClick={handleFollowToggle}
                />
            </main>
        </section>
    );
}