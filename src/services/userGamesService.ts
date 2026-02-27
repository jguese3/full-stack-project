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
    if (!isValidStatus(newGame.status)) {
        throw new Error("Invalid game status");
    }
    return gameRepository.addUserGame(newGame);
}

export function removeGame(gameId: number): UserGame {
    return gameRepository.removeUserGame(gameId);
}

export function getAllUserGames(): UserGame[] {
    return gameRepository.fetchAllUserGames();
}