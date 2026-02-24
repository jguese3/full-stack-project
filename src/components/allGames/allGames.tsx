import { useState } from "react";
import { useNavigate } from "react-router";
import { tempGames } from "../../assets/temp/tempGames";
import { GameSearch } from "../search/gameSearch";

export function AllGames() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const filteredGames = tempGames.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleGameClick = (gameId: number) => {
        navigate('/reviews', { state: { selectedGameId: gameId } });
    };

    return (
        <section className="all-games">
            <h2>All Games</h2>
            <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ul>
                {filteredGames.map((game) => (
                    <li 
                        key={game.id}
                        className="game-item"
                        onClick={() => handleGameClick(game.id)}
                    > 
                        <div>
                            <strong>{game.title}</strong>
                            <span className="game-platform"> - {game.platform}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
  }
