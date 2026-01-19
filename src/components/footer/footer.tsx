const members = ["Jarone Guese", "Christian Martin", "Lars Sy"];
const currentYear = new Date().getFullYear();

export function Footer() {
    return(
    <footer>
        <p>Team Full Stack &#169; {currentYear} Members: {members.join(", ")}</p>
    </footer>
    );
}