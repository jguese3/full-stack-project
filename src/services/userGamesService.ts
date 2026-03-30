import type { Game } from "../assets/temp/tempGames";
import * as gameRepository from "../apis/gameRepository";

const gameStatus = ["backlog", "playing", "completed"];

export function isValidStatus(status: string): boolean {
  return gameStatus.includes(status);
}

export async function updateGameStatus(gameId: number, newStatus: string): Promise<Game> {
  if (!isValidStatus(newStatus)) {
    throw new Error("Invalid game status");
  }

  return gameRepository.updateUserGame(gameId, newStatus);
}

export async function addGame(newGame: Game): Promise<Game> {
  const currentLibrary = await gameRepository.fetchAllUserGames();

  for (const game of currentLibrary) {
    if (game.title === newGame.title && game.platform === newGame.platform) {
      throw new Error("Game is already in your library");
    }
  }

  const gameAdded: Game = {
    ...newGame,
    status: "backlog",
  };

  return gameRepository.addUserGame(gameAdded);
}

export async function removeGame(gameId: number): Promise<void> {
  await gameRepository.removeUserGame(gameId);
}

export async function getAllUserGames(): Promise<Game[]> {
  return gameRepository.fetchAllUserGames();
}