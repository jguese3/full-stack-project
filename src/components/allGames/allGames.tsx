import { useState } from "react";
import { useNavigate } from "react-router";
import type { Game } from "../../assets/temp/tempGames";
import { tempGames } from "../../assets/temp/tempGames";
import { GameSearch } from "../search/gameSearch";
import { useUserGames } from "../../hooks/useUserGames";

export function AllGames() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const filteredGames = tempGames.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const { addGameToLibrary } = useUserGames();

    const handleGameClick = (gameId: number) => {
        navigate('/reviews', { state: { selectedGameId: gameId } });
    };

    function addToLibrary(game: Game ) {
        try {
            addGameToLibrary({
                id: game.id,
                title: game.title,
                platform: game.platform,
                status: 'backlog'
            });
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
                return;
            }
            alert("An unexpected error occurred while adding the game to your library.");
        }
    }

    return (
        <section className="all-games">
            <h2>All Games</h2>
            <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ul>
                {filteredGames.map((game) => (
                    <li 
                        key={game.id}
                        className="game-item"
                    > 
                        <div>
                            <strong>{game.title}</strong>
                            <span className="game-platform"> - {game.platform}</span>
                        </div>

                        <button onClick={() => addToLibrary(game)}>Add to Library</button>
                        <button onClick={() => handleGameClick(game.id)}>View Reviews</button>
                    </li>
                ))}
            </ul>
        </section>
    );
  }
