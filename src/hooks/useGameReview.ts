import { useState } from "react";
import { fetchAllReviews } from "../apis/reviewRepository";
import { tempGames } from "../assets/temp/tempGames";
import { useSelectedGameFilter } from "./useSelectedGameFilter";

export function useGameReview() {
  const [selectedReviewId, setSelectedReviewId] = useState<number>(1);
  const { selectedGameId, setSelectedGameId } = useSelectedGameFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [selectedGameFromSearch, setSelectedGameFromSearch] = useState<number | null>(null);
  const [allReviews, setAllReviews] = useState(fetchAllReviews());

  const getGameTitle = (id: number): string => {
    const game = tempGames.find(g => g.id === id);
    return game ? game.title : "Unknown Game";
  };

  const activeGameId = selectedGameFromSearch ?? selectedGameId ?? undefined;

  const reviewList = activeGameId
    ? allReviews.filter(review => review.gameId === activeGameId)
    : allReviews;

  const applySearch = () => {
    const term = searchTerm.trim().toLowerCase();
    setAppliedSearchTerm(term);

    if (!term) {
      setSelectedGameFromSearch(null);
      return;
    }

    const match = tempGames.find(game =>
      game.title.toLowerCase().includes(term)
    );
    setSelectedGameFromSearch(match ? match.id : null);
  };

  const handleReviewAdded = () => {
    setAllReviews(fetchAllReviews());
  };

  const handleResetAll = () => {
    setSelectedGameFromSearch(null);
    setSearchTerm("");
    setAppliedSearchTerm("");
    setSelectedGameId(null);
  };

  return {
    selectedReviewId,
    setSelectedReviewId,
    searchTerm,
    setSearchTerm,
    appliedSearchTerm,
    activeGameId,
    reviewList,
    applySearch,
    handleReviewAdded,
    handleResetAll,
    getGameTitle,
  };
}
