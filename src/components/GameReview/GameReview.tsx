import React from "react";
import "./gamereview_module.css";
import { fetchAllReviews } from "../../apis/reviewRepository";
import CommentSection from "../formcomments/commentsection";
import { GameSearch } from "../search/gameSearch";
import { tempGames } from "../../assets/temp/tempGames";


interface GameReviewProps {
  selectedReviewId: number;
  setSelectedReviewId: (id: number) => void;
  gameId?: number;
}

export const GameReview = ({ selectedReviewId, setSelectedReviewId, gameId }: GameReviewProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const allReviews = fetchAllReviews();
  
  const reviewList = gameId 
    ? allReviews.filter(review => review.gameId === gameId)
    : allReviews;

  const getGameTitle = (id: number): string => {
    const game = tempGames.find(g => g.id === id);
    return game ? game.title : "Unknown Game";
  };

  return (
    <section className="game-review">
      <h2>Reviews</h2>
      <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ul className="review-list">
        {reviewList.map((review) => (
          <li className="review-card" key={review.id}>
            <header className="review-header">
              <div className="user-info">
                <p className="user-line">
                  <strong>{review.username}</strong>{" "}
                  <span className="reviewed-text">
                    reviewed {getGameTitle(review.gameId)}
                  </span>
                </p>

                <div className="rating">{"★".repeat(review.rating)}</div>
              </div>

              <time className="date">{review.date}</time>
            </header>

            <p className="review-text">{review.review}</p>
            {selectedReviewId === review.id && (
              <CommentSection reviewId={review.id} reviewGame={getGameTitle(review.gameId)} />
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