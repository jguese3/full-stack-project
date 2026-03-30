import type { Review } from "../types/reviewtype";

type BackendReview = {
  reviewId?: number;
  id?: number;
  gameId: string | number;
  userId?: string;
  username?: string;
  comment?: string;
  review?: string;
  ratings?: number;
  rating?: number;
  date?: string;
};

type ReviewsResponseJSON = { message?: string; data: BackendReview[] };
type ReviewResponseJSON = { message?: string; data: BackendReview };

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
const REVIEW_ENDPOINT = "/api/gamereviews";

function mapBackendReviewToFrontendReview(review: BackendReview): Review {
  const parsedGameId = Number(review.gameId);

  return {
    id: review.reviewId ?? review.id ?? Date.now(),
    username: review.username ?? review.userId ?? "Unknown User",
    gameId: Number.isNaN(parsedGameId) ? -1 : parsedGameId,
    rating: review.ratings ?? review.rating ?? 0,
    date: review.date ?? new Date().toISOString(),
    review: review.comment ?? review.review ?? "",
    likes: 0,
  };
}

async function getErrorMessage(response: Response, fallbackMessage: string): Promise<string> {
  try {
    const bodyText = await response.text();
    if (!bodyText) return fallbackMessage;

    try {
      const parsed = JSON.parse(bodyText);
      return parsed?.message ?? parsed?.error ?? fallbackMessage;
    } catch {
      return bodyText;
    }
  } catch {
    return fallbackMessage;
  }
}

export async function fetchAllReviews(): Promise<Review[]> {
  const response: Response = await fetch(`${BASE_URL}${REVIEW_ENDPOINT}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Failed to fetch reviews"));
  }

  const json: ReviewsResponseJSON = await response.json();
  return json.data.map(mapBackendReviewToFrontendReview);
}

export async function fetchReviewById(reviewId: number): Promise<Review> {
  const response: Response = await fetch(`${BASE_URL}${REVIEW_ENDPOINT}/${reviewId}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, `Failed to fetch review with ID ${reviewId}`));
  }

  const json: ReviewResponseJSON = await response.json();
  return mapBackendReviewToFrontendReview(json.data);
}

export async function addReview(newReview: Review): Promise<Review> {
  const response: Response = await fetch(`${BASE_URL}${REVIEW_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: newReview.gameId,
      username: newReview.username.trim(),
      comment: newReview.review,
      ratings: newReview.rating,
    }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Failed to add review"));
  }

  const json: ReviewResponseJSON = await response.json();
  return mapBackendReviewToFrontendReview(json.data);
}

export async function updateReview(reviewId: number, updates: Partial<Review>): Promise<Review> {
  const response: Response = await fetch(`${BASE_URL}${REVIEW_ENDPOINT}/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, `Failed to update review with ID ${reviewId}`));
  }

  const json: ReviewResponseJSON = await response.json();
  return mapBackendReviewToFrontendReview(json.data);
}

export async function removeReview(reviewId: number): Promise<void> {
  const response: Response = await fetch(`${BASE_URL}${REVIEW_ENDPOINT}/${reviewId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, `Failed to remove review with ID ${reviewId}`));
  }
}
