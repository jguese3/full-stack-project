import type { Game } from "../assets/temp/tempGames";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function fetchAllUserGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/user-games`);
  if (!response.ok) throw new Error("Failed to fetch user games");
  return response.json();
}

export async function addUserGame(newGame: Game): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/user-games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newGame.title,
      platform: newGame.platform,
      status: newGame.status,
    }),
  });

  if (!response.ok) throw new Error("Failed to add user game");
  return response.json();
}

export async function updateUserGame(gameId: number, newStatus: string): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/user-games/${gameId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) throw new Error("Failed to update user game");
  return response.json();
}

export async function removeUserGame(gameId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/user-games/${gameId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to remove user game");
}