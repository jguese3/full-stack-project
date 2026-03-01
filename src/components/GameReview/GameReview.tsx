import "./gamereview_module.css";
import { ReviewAndCommentForm } from "../formcomments/ReviewAndCommentForm";
import { GameSearch } from "../search/gameSearch";
import { useGameReview } from "../../hooks/useGameReview";

export const GameReview = () => {
  const {
    searchTerm,
    setSearchTerm,
    appliedSearchTerm,
    activeGameId,
    reviewList,
    applySearch,
    handleReviewAdded,
    handleResetAll,
    getGameTitle,
    selectedReviewId,
    setSelectedReviewId,
  } = useGameReview();

  return (
    <section className="game-review">
      <div className="review-header-container">
        <h2>Reviews</h2>
        {(activeGameId || appliedSearchTerm) && (
          <button 
            onClick={handleResetAll}
            className="reset-filter-btn"
          >
            ✕ Reset Filter
          </button>
        )}
      </div>
      <div className="review-search">
        <GameSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <button
          type="button"
          className="search-btn"
          onClick={applySearch}
        >
          Search
        </button>
      </div>

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

      {activeGameId && (
        <ReviewAndCommentForm 
          type="review"
          gameId={activeGameId} 
          gameTitle={getGameTitle(activeGameId)} 
          onSubmitSuccess={handleReviewAdded}
        />
      )}
    </section>
  );
};