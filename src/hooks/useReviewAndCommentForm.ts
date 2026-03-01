import { useState } from "react";
import { addComment, fetchAllComments, fetchCommentsByReviewId } from "../apis/commentRepository";
import { addReview } from "../apis/reviewRepository";
import type { Comment } from "../types/comment";
import type { Review } from "../types/reviewtype";

type ReviewConfig = { type: "review"; gameId: number; onSubmitSuccess: () => void };
type CommentConfig = { type: "comment"; reviewId: number };
type FormConfig = ReviewConfig | CommentConfig;

export function useReviewAndCommentForm(config: FormConfig) {
  const [commentList, setCommentList] = useState<Comment[]>(
    config.type === "comment" ? fetchCommentsByReviewId(config.reviewId) : []
  );
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  function submitForm() {
    if (!username.trim() || !text.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    if (config.type === "comment") {
      const existing = fetchAllComments();
      const nextId = existing.length > 0 ? Math.max(...existing.map(c => c.id)) + 1 : 1;

      const newComment: Comment = {
        id: nextId,
        reviewId: config.reviewId,
        username,
        text,
        date,
      };

      addComment(newComment);
      setCommentList(prev => [...prev, newComment]);
    } else {
      const newReview: Review = {
        id: Date.now(),
        username,
        gameId: config.gameId,
        rating,
        date,
        review: text,
        likes: 0,
      };

      addReview(newReview);
      config.onSubmitSuccess();
    }

    setUsername("");
    setText("");
    setRating(5);
  }

  return {
    commentList,
    username,
    setUsername,
    text,
    setText,
    rating,
    setRating,
    submitForm,
  };
}
