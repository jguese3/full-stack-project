import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";


// export function Search({searchValue, handleSearchChange}
//     : {
//         searchValue: string, 
//         handleSearchChange: (newValue: string) => void
//     }) {
//     return(
//         <form className="search-form" action="#">
//             {/* Note use of closing tags on inputs */}
//             <input type="text" 
//                 name="field-term" 
//                 placeholder="Enter username or id..." 
//                 value={searchValue}
//                 onChange={e => handleSearchChange(e.target.value)}
//             />
//             <input type="submit" value="Search" />
//         </form>
//     );
// }

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
        <form className="search-form" action="#">
            {/* Note use of closing tags on inputs */}
            <input type="text" 
                name="field-term" 
                placeholder="Enter username or id..." 
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    );
}