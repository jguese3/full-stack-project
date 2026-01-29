import { tempGames } from "../../assets/temp/tempGames";

export function AllGames() {
    return (
        <section className="all-games">
            <h2>All Games</h2>
            <ul>
                {tempGames.map((game) => (
                    <li key={game.id}> <strong>{game.title}</strong> - {game.platform} </li>
                ))}
            </ul>
        </section>
    );
}
