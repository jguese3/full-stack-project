import "./GameReview.css";
import { reviews } from "../../data/reviewdata";
import CommentSection from "../formcomments/commentsection";

const GameReview = () => {
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
            <CommentSection reviewId={review.id} reviewGame={review.game} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GameReview;