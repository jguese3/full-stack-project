import { useState } from "react";
import { tempGames } from "../../assets/temp/tempGames";
import { GameSearch } from "../search/gameSearch";

export function AllGames() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredGames = tempGames.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <section className="all-games">
            <h2>All Games</h2>
            <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ul>
                {filteredGames.map((game) => (
                    <li key={game.id}> <strong>{game.title}</strong> - {game.platform} </li>
                ))}
            </ul>
        </section>
    );
}
