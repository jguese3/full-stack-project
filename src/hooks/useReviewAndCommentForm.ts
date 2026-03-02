import { useState } from "react";
import { addComment, fetchAllComments, fetchCommentsByReviewId } from "../apis/commentRepository";
import { addReview } from "../apis/reviewRepository";
import {
  buildComment,
  buildReview,
  sortComments,
  validateReviewOrCommentInput,
} from "../services/reviewCommentService";
import type { Comment } from "../types/comment";

type ReviewConfig = { type: "review"; gameId: number; onSubmitSuccess: () => void };
type CommentConfig = { type: "comment"; reviewId: number };
type FormConfig = ReviewConfig | CommentConfig;

export function useReviewAndCommentForm(config: FormConfig) {
  const [commentList, setCommentList] = useState<Comment[]>(
    config.type === "comment"
      ? sortComments(fetchCommentsByReviewId(config.reviewId))
      : []
  );
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  function submitForm() {
    try {
      validateReviewOrCommentInput(username, text);
    } catch (error) {
      alert("Please fill in all fields");
      return;
    }

    if (config.type === "comment") {
      const existing = fetchAllComments();
      const newComment: Comment = buildComment({
        reviewId: config.reviewId,
        username,
        text,
        existingComments: existing,
      });

      addComment(newComment);
      setCommentList(prev => sortComments([...prev, newComment]));
    } else {
      const newReview = buildReview({
        gameId: config.gameId,
        username,
        text,
        rating,
      });

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
