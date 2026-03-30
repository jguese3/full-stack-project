import { useState, useEffect } from "react";
import type { Game } from "../assets/temp/tempGames";
import * as userGamesService from "../services/userGamesService";

export function useUserGames() {
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function loadGames() {
      try {
        const games: Game[] = await userGamesService.getAllUserGames();
        setUserGames(games);
      } catch (error) {
        console.error("Failed to load user games:", error);
      }
    }

    loadGames();
  }, []);

  function filterGamesBySearch(games: Game[], term: string): Game[] {
    return games.filter((game) =>
      game.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  const filteredGames = filterGamesBySearch(userGames, searchTerm);

  async function updateGameStatus(gameId: number, newStatus: string) {
    try {
      const updatedGame = await userGamesService.updateGameStatus(gameId, newStatus);
      setUserGames((prevGames) =>
        prevGames.map((game) => (game.id === gameId ? updatedGame : game))
      );
    } catch (error) {
      console.error("Failed to update game status:", error);
      throw error;
    }
  }

  async function addGameToLibrary(newGame: Game) {
    try {
      const addedGame = await userGamesService.addGame(newGame);
      setUserGames((prevGames) => [...prevGames, addedGame]);
    } catch (error) {
      console.error("Failed to add game:", error);
      throw error;
    }
  }

  async function removeGameFromLibrary(gameId: number) {
    try {
      await userGamesService.removeGame(gameId);
      setUserGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
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
    removeGameFromLibrary,
  };
}