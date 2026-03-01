import type { Game } from '../assets/temp/tempGames';
import { tempUserGames } from '../assets/temp/tempUserGames';

let userGames: Game[] = tempUserGames;

export function fetchAllUserGames(): Game[] {
    return userGames;
}

export function addUserGame(newGame: Game): Game {
    userGames.push(newGame);
    return newGame;
}

export function updateUserGame(gameId: number, newStatus: string): Game {
    const gameIndex = userGames.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
        throw new Error("Game not found");
    }

    userGames[gameIndex].status = newStatus;
    return userGames[gameIndex];
}

export function removeUserGame(gameId: number): Game {
    const gameIndex = userGames.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
        throw new Error("Game not found");
    }

    const removedGame = userGames[gameIndex];
    userGames.splice(gameIndex, 1);
    return removedGame;
}