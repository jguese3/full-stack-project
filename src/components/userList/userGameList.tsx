import { useState } from 'react';

interface userGameItem {
    id: number;
    title: string;
    platform: string;
    status: string;
}

const backlogList: userGameItem[] = [
    { id: 1, title: "The Legend of Zelda: Breath of the Wild", platform: "Nintendo Switch", status: "backlog" },
    { id: 2, title: "God of War", platform: "PlayStation 4", status: "backlog" },
    { id: 3, title: "Red Dead Redemption 2", platform: "Xbox One", status: "backlog" },
];

export function UserGames() {

    // books in different shelves
    const [backlogGames, setBacklogGames] = useState<userGameItem[]>(backlogList);
    const [playingGames, setPlayingGames] = useState<userGameItem[]>([]);
    const [completedGames, setCompletedGames] = useState<userGameItem[]>([]);

    // i want to move a book from this shelf to this shelf, so i need the name of the book, where it is coming from and where it is going to
    const moveGame = (
        game: userGameItem,
        fromList: React.Dispatch<React.SetStateAction<userGameItem[]>>,
        toList: React.Dispatch<React.SetStateAction<userGameItem[]>>
    ) => {
        fromList((games) => games.filter((gameItem) => gameItem.id !== game.id));
        toList((games) => [...games, game]);
    };

    return (
        <section className="user-games">
            <h2>User Games</h2>
            <div>
                <Backlog
                    games={backlogGames}
                    onMoveToPlaying={(game) => moveGame(game, setBacklogGames, setPlayingGames)}
                    onMoveToCompleted={(game) => moveGame(game, setBacklogGames, setCompletedGames)}
                />
                <Playing
                    games={playingGames}
                    onMoveToBacklog={(game) => moveGame(game, setPlayingGames, setBacklogGames)}
                    onMoveToCompleted={(game) => moveGame(game, setPlayingGames, setCompletedGames)}
                />
                <Completed
                    games={completedGames}
                    onMoveToBacklog={(game) => moveGame(game, setCompletedGames, setBacklogGames)}
                    onMoveToPlaying={(game) => moveGame(game, setCompletedGames, setPlayingGames)}
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