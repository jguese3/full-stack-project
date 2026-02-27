import React from "react";
import { useReviewAndCommentForm } from "../../hooks/useReviewAndCommentForm";
import "./commentsection_module.css";

interface ReviewFormProps {
  type: "review";
  gameId: number;
  gameTitle: string;
  onSubmitSuccess: () => void;
}

interface CommentFormProps {
  type: "comment";
  reviewId: number;
  reviewGame: string;
}

type ReviewAndCommentFormProps = ReviewFormProps | CommentFormProps;

export const ReviewAndCommentForm: React.FC<ReviewAndCommentFormProps> = (props) => {
  const {
    commentList,
    username,
    setUsername,
    text,
    setText,
    rating,
    setRating,
    submitForm,
  } = useReviewAndCommentForm(props);

  const title = props.type === "comment"
    ? `Comments for ${props.reviewGame}`
    : `Leave a Review for ${props.gameTitle}`;

  const textLabel = props.type === "comment" ? "Leave a Comment:" : "Your Review:";
  const textPlaceholder = props.type === "comment"
    ? "Share your thoughts about this review..."
    : "Share your thoughts about this game...";
  const buttonText = props.type === "comment" ? "Post Comment" : "Submit Review";

  return (
    <div className="comment-section">
      {props.type === "comment" && (
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
      )}

      <h3>{title}</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="comment-form"
      >
        <div className="form-group">
          <label htmlFor={`${props.type}-username`}>Username:</label>
          <input
            id={`${props.type}-username`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        {props.type === "review" && (
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={1}>1 ★</option>
              <option value={2}>2 ★★</option>
              <option value={3}>3 ★★★</option>
              <option value={4}>4 ★★★★</option>
              <option value={5}>5 ★★★★★</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor={`${props.type}-text`}>{textLabel}</label>
          <textarea
            id={`${props.type}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={textPlaceholder}
          />
        </div>

        <button type="submit" className="submit-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
