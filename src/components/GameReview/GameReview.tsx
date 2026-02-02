import "./gamereview_module.css";
import { reviews } from "../../data/reviewdata";
import CommentSection from "../formcomments/commentsection";

interface GameReviewProps {
  selectedReviewId: number;
  setSelectedReviewId: (id: number) => void;
}

const GameReview = ({ selectedReviewId, setSelectedReviewId }: GameReviewProps) => {
  return (
    <section className="game-review">
      <h2>Reviews</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li className="review-card" key={review.id}>
            <header className="review-header">
              <div className="user-info">
                  <strong>{review.username}</strong>{" "}
                  <span className="reviewed-text"> reviewed {review.game}</span>

                <div className="rating">
                  {"★".repeat(review.rating)}
                  <span className="rating-text">Rating: {review.rating}</span>
                </div>

              </div>
              <time className="date">{review.date}</time>
            </header>
            <p className="review-text">{review.review}</p>
            {selectedReviewId === review.id && (
              <CommentSection reviewId={review.id} reviewGame={review.game} />
            )}
            {selectedReviewId !== review.id && (
              <button onClick={() => setSelectedReviewId(review.id)} className="view-comments-btn">
                View Comments
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GameReview;