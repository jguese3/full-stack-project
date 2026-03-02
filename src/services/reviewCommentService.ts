import type { Comment } from "../types/comment";
import type { Review } from "../types/reviewtype";

export function validateReviewOrCommentInput(username: string, text: string): void {
  if (!username.trim() || !text.trim()) {
    throw new Error("Please fill in all fields");
  }
}

export function formatDisplayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getNextCommentId(existingComments: Comment[]): number {
  if (existingComments.length === 0) {
    return 1;
  }

  return Math.max(...existingComments.map((comment) => comment.id)) + 1;
}

export function buildComment(params: {
  reviewId: number;
  username: string;
  text: string;
  existingComments: Comment[];
}): Comment {
  return {
    id: getNextCommentId(params.existingComments),
    reviewId: params.reviewId,
    username: params.username,
    text: params.text,
    date: formatDisplayDate(),
  };
}

export function sortComments(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => b.id - a.id);
}

export function buildReview(params: {
  gameId: number;
  username: string;
  text: string;
  rating: number;
}): Review {
  return {
    id: Date.now(),
    username: params.username,
    gameId: params.gameId,
    rating: params.rating,
    date: formatDisplayDate(),
    review: params.text,
    likes: 0,
  };
}
