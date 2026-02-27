import type { UserGame } from '../assets/temp/tempUserGames';
import * as gameRepository from '../apis/gameRepository';

const gameStatus = ["backlog", "playing", "completed"];

export function isValidStatus(status: string): boolean {
    return gameStatus.includes(status);
}

export function updateGameStatus(gameId: number, newStatus: string): UserGame {
    if (!isValidStatus(newStatus)) {
        throw new Error("Invalid game status");
    }

    return gameRepository.updateUserGame(gameId, newStatus);
}

export function addGame(newGame: UserGame): UserGame {
    const currentLibrary = gameRepository.fetchAllUserGames();

    for (const game of currentLibrary) {
        if (game.id === newGame.id) {
            throw new Error("Game is already in your library");
        }
    }

    if (!isValidStatus(newGame.status)) {
        throw new Error("Invalid game status");
    }

    const gameAdded: UserGame = {
        ...newGame,
        status: "backlog"
    };
    
    return gameRepository.addUserGame(gameAdded);
}

export function removeGame(gameId: number): UserGame {
    return gameRepository.removeUserGame(gameId);
}

export function getAllUserGames(): UserGame[] {
    return gameRepository.fetchAllUserGames();
}