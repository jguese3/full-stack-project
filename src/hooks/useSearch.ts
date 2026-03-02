import { useState } from "react";
import * as searchService from "../services/searchService"

export function useSearch() {
    const [searchValue, setSearchValue] = useState<string>("");

    /**
     * Validates search value
     * @returns validation <bool>: if the search is valid
     * errors <string[]>: if there's any error messages from by invalid search
     */

    function trySearch(): {isValid: Boolean, errors: string[]} {
        const validation = searchService.validateSearch(searchValue);

        return validation;
    };

    return {
        searchValue,
        setSearchValue,
        trySearch
    };

}