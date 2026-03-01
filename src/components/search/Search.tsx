import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { SearchBar } from "../common/search-bar/SearchBar";

export function Search() {
    const {
        searchValue,
        setSearchValue,
        trySearch
    } = useSearch();

    const [searchMessages, setSearchMessages] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    const doSearch = () => {
        const validation = trySearch();
        if(validation.isValid) {
            navigate(`/users/search?value=${searchValue}`);
            setSearchMessages([]);
            setSearchValue("");
        } else {
            setSearchMessages(validation.errors);
        }
    }

    useEffect(() => {
        setSearchValue("");
        setSearchMessages([]);
    }, [location]);

    return(
        <div>
            <SearchBar
                searchValue={searchValue}
                messages={searchMessages}
                handleSearchChange={setSearchValue}
                handleSubmit={doSearch}
            />
        </div>
    );
}