import React from "react";
import "./gamereview_module.css";
import { fetchAllReviews } from "../../apis/reviewRepository";
import { ReviewAndCommentForm } from "../formcomments/ReviewAndCommentForm";
import { GameSearch } from "../search/gameSearch";
import { tempGames } from "../../assets/temp/tempGames";


interface GameReviewProps {
  selectedReviewId: number;
  setSelectedReviewId: (id: number) => void;
  gameId?: number;
  onResetFilter?: () => void;
}

export const GameReview = ({ selectedReviewId, setSelectedReviewId, gameId, onResetFilter }: GameReviewProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allReviews, setAllReviews] = React.useState(fetchAllReviews());
  
  const getGameTitle = (id: number): string => {
    const game = tempGames.find(g => g.id === id);
    return game ? game.title : "Unknown Game";
  };

  let reviewList = gameId 
    ? allReviews.filter(review => review.gameId === gameId)
    : allReviews;

  // Apply search filter on game titles
  if (searchTerm.trim()) {
    reviewList = reviewList.filter(review => 
      getGameTitle(review.gameId).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleReviewAdded = () => {
    setAllReviews(fetchAllReviews());
  };

  return (
    <section className="game-review">
      <div className="review-header-container">
        <h2>Reviews</h2>
        {gameId && onResetFilter && (
          <button 
            onClick={onResetFilter}
            className="reset-filter-btn"
          >
            ✕ Reset Filter
          </button>
        )}
      </div>
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
              <ReviewAndCommentForm type="comment" reviewId={review.id} reviewGame={getGameTitle(review.gameId)} />
            )}
            {selectedReviewId !== review.id && (
              <button onClick={() => setSelectedReviewId(review.id)} className="view-comments-btn">
                View Comments
              </button>
            )}
          </li>
        ))}
      </ul>

      {gameId && (
        <ReviewAndCommentForm 
          type="review"
          gameId={gameId} 
          gameTitle={getGameTitle(gameId)} 
          onSubmitSuccess={handleReviewAdded}
        />
      )}
    </section>
  );
};