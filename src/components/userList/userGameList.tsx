import { GameSearch } from '../search/gameSearch';
import { useUserGames } from '../../hooks/useUserGames';
import type { UserGame } from '../../assets/temp/tempUserGames';

export function UserGames() {

    const { games, searchTerm, setSearchTerm, updateGameStatus } = useUserGames();

    const backlogGames = games.filter(game => game.status === 'backlog');
    const playingGames = games.filter(game => game.status === 'playing');
    const completedGames = games.filter(game => game.status === 'completed');

    return (
        <section className="user-games">
            <h2>User Games</h2>
            <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div>
                <Backlog
                    games={backlogGames}
                    onMoveToPlaying={(game) => updateGameStatus(game.id, 'playing')}
                    onMoveToCompleted={(game) => updateGameStatus(game.id, 'completed')}
                />
                <Playing
                    games={playingGames}
                    onMoveToBacklog={(game) => updateGameStatus(game.id, 'backlog')}
                    onMoveToCompleted={(game) => updateGameStatus(game.id, 'completed')}
                />
                <Completed
                    games={completedGames}
                    onMoveToBacklog={(game) => updateGameStatus(game.id, 'backlog')}
                    onMoveToPlaying={(game) => updateGameStatus(game.id, 'playing')}
                />
            </div>
        </section>
    );
}

function Backlog({ games, onMoveToPlaying, onMoveToCompleted }: { games: UserGame[], onMoveToPlaying: (game: UserGame) => void, onMoveToCompleted: (game: UserGame) => void }) {
    return (
        <section className="backlog">
            <h2>Backlog</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}> 
                    {game.title}
                    <button onClick={() => onMoveToPlaying(game)}>Start Playing!</button>
                    <button onClick={() => onMoveToCompleted(game)}>Mark as Completed</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Playing({ games, onMoveToBacklog, onMoveToCompleted }: { games: UserGame[], onMoveToBacklog: (game: UserGame) => void, onMoveToCompleted: (game: UserGame) => void }) {
    return (
        <section className="playing">
            <h2>Playing</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}> 
                    {game.title}
                    <button onClick={() => onMoveToBacklog(game)}>Move to Backlog</button>
                    <button onClick={() => onMoveToCompleted(game)}>Mark as Completed</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Completed({ games, onMoveToBacklog, onMoveToPlaying }: { games: UserGame[], onMoveToBacklog: (game: UserGame) => void, onMoveToPlaying: (game: UserGame) => void }) {
    return (
        <section className="completed">
            <h2>Completed</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                    {game.title}
                    <button onClick={() => onMoveToBacklog(game)}>Move to Backlog</button>
                    <button onClick={() => onMoveToPlaying(game)}>Move to Playing</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}