interface backlogItem {
    id: number;
    title: string;
    platform: string;
}

const backlogList: backlogItem[] = [
    { id: 1, title: "The Legend of Zelda: Breath of the Wild", platform: "Nintendo Switch" },
    { id: 2, title: "God of War", platform: "PlayStation 4" },
    { id: 3, title: "Red Dead Redemption 2", platform: "Xbox One" },
];

export function Backlog() {
    return (
        <section className="backlog">
            <h2>Backlog</h2>
            <ul>
                {backlogList.map((game) => (
                    <li key={game.id}> {game.title} </li>
                ))}
            </ul>
        </section>
    );
}