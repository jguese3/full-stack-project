export interface userGameItem {
    id: number;
    title: string;
    platform: string;
    status: string;
}

type UserGamesProps = {
    userGames: userGameItem[];
    updateUserGames: React.Dispatch<React.SetStateAction<userGameItem[]>>;
};

export function UserGames({ userGames, updateUserGames }: UserGamesProps) {

    // books in different shelves
    const backlogGames = userGames.filter(game => game.status === 'backlog');
    const playingGames = userGames.filter(game => game.status === 'playing');
    const completedGames = userGames.filter(game => game.status === 'completed');

    // i want to move a book from this shelf to this shelf, so i need the name of the book, where it is coming from and where it is going to
    const moveGame = (
        game: userGameItem,
        newStatus: string,
    ) => {
        updateUserGames(userGames.map(gameItem => gameItem.id === game.id ? { ...gameItem, status: newStatus } : gameItem)
        );
    };

    return (
        <section className="user-games">
            <h2>User Games</h2>
            <div>
                <Backlog
                    games={backlogGames}
                    onMoveToPlaying={(game) => moveGame(game, 'playing')}
                    onMoveToCompleted={(game) => moveGame(game, 'completed')}
                />
                <Playing
                    games={playingGames}
                    onMoveToBacklog={(game) => moveGame(game, 'backlog')}
                    onMoveToCompleted={(game) => moveGame(game, 'completed')}
                />
                <Completed
                    games={completedGames}
                    onMoveToBacklog={(game) => moveGame(game, 'backlog')}
                    onMoveToPlaying={(game) => moveGame(game, 'playing')}
                />
            </div>
        </section>
    );
}

function Backlog({ games, onMoveToPlaying, onMoveToCompleted }: { games: userGameItem[], onMoveToPlaying: (game: userGameItem) => void, onMoveToCompleted: (game: userGameItem) => void }) {
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

function Playing({ games, onMoveToBacklog, onMoveToCompleted }: { games: userGameItem[], onMoveToBacklog: (game: userGameItem) => void, onMoveToCompleted: (game: userGameItem) => void }) {
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

function Completed({ games, onMoveToBacklog, onMoveToPlaying }: { games: userGameItem[], onMoveToBacklog: (game: userGameItem) => void, onMoveToPlaying: (game: userGameItem) => void }) {
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