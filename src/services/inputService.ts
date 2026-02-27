export function validateInput(inputValue: string):{
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string [] = [];

    if(inputValue.trim().length < 2) {
        isValid = false;
        errors.push("Field must at least be 2 characters long.");
    }

    return {isValid, errors};
}