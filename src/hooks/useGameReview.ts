import { useState } from "react";
import { fetchAllReviews } from "../apis/reviewRepository";
import {
  filterReviewsByGameId,
  findMatchingGameId,
  getGameTitleById,
  sortReviews,
} from "../services/gameReviewService";
import { useSelectedGameFilter } from "./useSelectedGameFilter";

export function useGameReview() {
  const [selectedReviewId, setSelectedReviewId] = useState<number>(1);
  const { selectedGameId, setSelectedGameId } = useSelectedGameFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [selectedGameFromSearch, setSelectedGameFromSearch] = useState<number | null>(null);
  const [allReviews, setAllReviews] = useState(sortReviews(fetchAllReviews()));

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

  const handleReviewAdded = () => {
    setAllReviews(sortReviews(fetchAllReviews()));
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
