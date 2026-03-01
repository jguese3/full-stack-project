import type { Game } from '../assets/temp/tempGames';
import * as gameRepository from '../apis/gameRepository';

const gameStatus = ["backlog", "playing", "completed"];

export function isValidStatus(status: string): boolean {
    return gameStatus.includes(status);
}

export function updateGameStatus(gameId: number, newStatus: string): Game {
    if (!isValidStatus(newStatus)) {
        throw new Error("Invalid game status");
    }

    return gameRepository.updateUserGame(gameId, newStatus);
}

export function addGame(newGame: Game): Game {
    const currentLibrary = gameRepository.fetchAllUserGames();

    for (const game of currentLibrary) {
        if (game.id === newGame.id) {
            throw new Error("Game is already in your library");
        }
    }

    const gameAdded: Game = {
        ...newGame,
        status: "backlog"
    };
    
    return gameRepository.addUserGame(gameAdded);
}

export function removeGame(gameId: number): Game {
    return gameRepository.removeUserGame(gameId);
}

export function getAllUserGames(): Game[] {
    return gameRepository.fetchAllUserGames();
}