export function validateSearch(searchValue: string):{
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string [] = [];

    if(searchValue.trim().length < 2) {
        isValid = false;
        errors.push("Please search for at least two characters");
    }

    return {isValid, errors};
}