import { useState, useEffect } from "react";
import type { Game } from "../assets/temp/tempGames";
import * as userGamesService from "../services/userGamesService";

export function useUserGames() {
    const [userGames, setUserGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const games: Game[] = userGamesService.getAllUserGames();
        setUserGames(games);
    }, []);

    function filterGamesBySearch(games: Game[], term: string): Game[] {
        return games.filter(game =>
            game.title.toLowerCase().includes(term.toLowerCase())
        );
    }
    
    const filteredGames = filterGamesBySearch(userGames, searchTerm);

    function updateGameStatus(gameId: number, newStatus: string) {
        try {
            const updatedGame = userGamesService.updateGameStatus(gameId, newStatus);
            setUserGames(prevGames =>
                prevGames.map(game => (game.id === gameId ? updatedGame : game))
            );
        } catch (error) {
            console.error("Failed to update game status:", error);
            throw error;
        }
    }

    function addGameToLibrary(newGame: Game) {
        try {
            const addedGame = userGamesService.addGame(newGame);
            setUserGames(prevGames => [...prevGames, addedGame]);
        } catch (error) {
            console.error("Failed to add game:", error);
            throw error;
        }
    }

    function removeGameFromLibrary(gameId: number) {
        try {
            userGamesService.removeGame(gameId);
            setUserGames(prevGames => prevGames.filter(game => game.id !== gameId));
        } catch (error) {
            console.error("Failed to remove game:", error);
            throw error;
        }
    }

    return {
        games: filteredGames,
        searchTerm,
        setSearchTerm,
        updateGameStatus,
        addGameToLibrary,
        removeGameFromLibrary
    };

}