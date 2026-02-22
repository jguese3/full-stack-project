import { useState, useEffect } from "react";
import type { UserGame } from "../assets/temp/tempUserGames";
import * as userGamesService from "../services/userGamesService";

export function useUserGames() {
    const [userGames, setUserGames] = useState<UserGame[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const games: UserGame[] = userGamesService.getAllUserGames();
        setUserGames(games);
    }, []);

    const filteredGames = userGames.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function updateGameStatus(gameId: number, newStatus: string) {
        try {
            const updatedGame = userGamesService.updateGameStatus(gameId, newStatus);
            setUserGames(prevGames =>
                prevGames.map(game => (game.id === gameId ? updatedGame : game))
            );
        } catch (error) {
            console.error("Failed to update game status:", error);
        }
    }

    return {
        games: filteredGames,
        searchTerm,
        setSearchTerm,
        updateGameStatus,
    };

}