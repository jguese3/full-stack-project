import { tempGames } from "../assets/temp/tempGames";
import type { Review } from "../types/reviewtype";

export function getGameTitleById(gameId: number): string {
  const game = tempGames.find((item) => item.id === gameId);
  return game ? game.title : "Unknown Game";
}

export function findMatchingGameId(searchTerm: string): number | null {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  if (!normalizedSearch) {
    return null;
  }

  const matchedGame = tempGames.find((game) =>
    game.title.toLowerCase().includes(normalizedSearch)
  );

  return matchedGame ? matchedGame.id : null;
}

export function filterReviewsByGameId(reviews: Review[], gameId?: number): Review[] {
  if (!gameId) {
    return reviews;
  }

  return reviews.filter((review) => review.gameId === gameId);
}

export function sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => b.id - a.id);
}
