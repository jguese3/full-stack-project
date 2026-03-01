import type { Review } from "../types/reviewtype";
import { reviews as testReviews } from "../data/reviewdata";

let reviews: Review[] = testReviews;

export function fetchAllReviews(): Review[] {
  return reviews;
}

export function fetchReviewById(reviewId: number): Review | undefined {
  return reviews.find((review) => review.id === reviewId);
}

export function addReview(newReview: Review): Review {
  reviews.push(newReview);
  return newReview;
}

export function updateReview(reviewId: number, updates: Partial<Review>): Review {
  const reviewIndex = reviews.findIndex((review) => review.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error("Review not found");
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], ...updates };
  return reviews[reviewIndex];
}

export function removeReview(reviewId: number): Review {
  const reviewIndex = reviews.findIndex((review) => review.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error("Review not found");
  }

  const removedReview = reviews[reviewIndex];
  reviews.splice(reviewIndex, 1);
  return removedReview;
}
