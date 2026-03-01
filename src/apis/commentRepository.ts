import type { Comment } from "../types/comment";
import { comments as testComments } from "../data/commentsdata";

let comments: Comment[] = testComments;

export function fetchAllComments(): Comment[] {
  return comments;
}

export function fetchCommentsByReviewId(reviewId: number): Comment[] {
  return comments.filter((comment) => comment.reviewId === reviewId);
}

export function addComment(newComment: Comment): Comment {
  comments.push(newComment);
  return newComment;
}

export function updateComment(commentId: number, updates: Partial<Comment>): Comment {
  const commentIndex = comments.findIndex((comment) => comment.id === commentId);
  if (commentIndex === -1) {
    throw new Error("Comment not found");
  }

  comments[commentIndex] = { ...comments[commentIndex], ...updates };
  return comments[commentIndex];
}

export function removeComment(commentId: number): Comment {
  const commentIndex = comments.findIndex((comment) => comment.id === commentId);
  if (commentIndex === -1) {
    throw new Error("Comment not found");
  }

  const removedComment = comments[commentIndex];
  comments.splice(commentIndex, 1);
  return removedComment;
}
