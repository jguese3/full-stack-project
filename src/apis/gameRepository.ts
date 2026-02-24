import type { UserGame } from '../assets/temp/tempUserGames';
import { tempUserGames } from '../assets/temp/tempUserGames';

let userGames: UserGame[] = tempUserGames;

export function fetchAllUserGames(): UserGame[] {
    return userGames;
}

export function addUserGame(newGame: UserGame): UserGame {
    userGames.push(newGame);
    return newGame;
}

export function updateUserGame(gameId: number, newStatus: string): UserGame {
    const gameIndex = userGames.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
        throw new Error("Game not found");
    }

    userGames[gameIndex].status = newStatus;
    return userGames[gameIndex];
}

export function removeUserGame(gameId: number): UserGame {
    const gameIndex = userGames.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
        throw new Error("Game not found");
    }

    const removedGame = userGames[gameIndex];
    userGames.splice(gameIndex, 1);
    return removedGame;
}