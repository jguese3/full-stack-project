import { useEffect, useState } from "react";
import { fetchAllReviews } from "../apis/reviewRepository";
import {
  filterReviewsByGameId,
  findMatchingGameId,
  getGameTitleById,
  sortReviews,
} from "../services/gameReviewService";
import { useSelectedGameFilter } from "./useSelectedGameFilter";
import type { Review } from "../types/reviewtype";

export function useGameReview() {
  const [selectedReviewId, setSelectedReviewId] = useState<number>(1);
  const { selectedGameId, setSelectedGameId } = useSelectedGameFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [selectedGameFromSearch, setSelectedGameFromSearch] = useState<number | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    const reviews = await fetchAllReviews();
    setAllReviews(sortReviews(reviews));
  };

  useEffect(() => {
    loadReviews().catch((error) => {
      console.error("Failed to load reviews:", error);
    });
  }, []);

  const getGameTitle = (id: number): string => getGameTitleById(id);

  const activeGameId = selectedGameFromSearch ?? selectedGameId ?? undefined;

  const reviewList = sortReviews(filterReviewsByGameId(allReviews, activeGameId));

  const applySearch = () => {
    const nextSearchTerm = searchTerm.trim().toLowerCase();
    setAppliedSearchTerm(nextSearchTerm);

    if (!nextSearchTerm) {
      setSelectedGameFromSearch(null);
      return;
    }

    setSelectedGameFromSearch(findMatchingGameId(nextSearchTerm));
  };

  const handleReviewAdded = async () => {
    await loadReviews();
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
