import { useState } from "react";
import type { User } from "../../assets/types/user";
import { Search } from "../search/Search";
import { UserListDisplay } from "../user-list-display/UserListDisplay";

function Following({
    users,
    updateFollowing
}:
{
    users: User[],
    updateFollowing: React.Dispatch<React.SetStateAction<User[]>>
}) {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <>
        <header>
            <h1>Following</h1>
        </header>
        <main>
            <section>
                {}
                <Search
                    searchValue={searchValue}
                    handleSearchChange={setSearchValue}
                />
                <UserListDisplay
                    users={
                        searchValue.trim()
                        ? users.filter(user => {
                            return user.userName.toLowerCase().includes(
                                searchValue.toLowerCase().trim()
                            )
                        })
                        : []
                    }
                    updateFollowing={updateFollowing}
                />
            </section>
        </main>
        </>
    );
}

export default Following;