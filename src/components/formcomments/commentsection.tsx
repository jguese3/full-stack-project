import React, { useState } from "react";
import "./commentsection_module.css";
import { comments } from "../../data/commentsdata";
import type { Comment } from "../../types/comment";

const addComment = (newComment: Omit<Comment, "id">) => {
  const nextId = comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;
  const comment: Comment = {
    ...newComment,
    id: nextId,
  };
  comments.push(comment);
  return comment;
};

interface CommentSectionProps {
  reviewId: number;
  reviewGame: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ reviewId, reviewGame }) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments.filter(c => c.reviewId === reviewId));
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !commentText.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newComment = addComment({
      reviewId,
      username,
      text: commentText,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });

    setCommentList([...commentList, newComment]);
    setUsername("");
    setCommentText("");
  };

  return (
    <div className="comment-section">
        {/* Comments List */}
      <div className="comments-list">
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong>{comment.username}</strong>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
      <h3>Comments for {reviewGame}</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Leave a Comment:</label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts about this review..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Post Comment
        </button>
      </form>

    
    </div>
  );
};

export default CommentSection;