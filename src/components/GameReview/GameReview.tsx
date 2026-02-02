import React, { useState } from "react";

type Review = {
  id: number;
  username: string;
  game: string;
  rating: number;
  date: string;
  review: string;
  likes: number;
};

const GameReview: React.FC = () => {
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const reviews: Review[] = [
    {
      id: 1,
      username: "Christian",
      game: "valorant",
      rating: 5,
      date: "Jan 16, 2026",
      review: "best fps game ever made",
      likes: 1,
    },
    {
      id: 2,
      username: "Lars",
      game: "Minecraft",
      rating: 4,
      date: "Jan 16, 2026",
      review: "played this game every day for a year straight",
      likes: 365,
    },
    {
      id: 3,
      username: "Jarone",
      game: "God of War: Ragnarok",
      rating: 3.5,
      date: "Jan 16, 2026",
      review: "played this game 67 times and died 67 times",
      likes: 67,
    },
  ];

  const handleLike = (id: number, baseLikes: number) => {
    const isLiked = liked[id];

    setLikes((prev) => ({
      ...prev,
      [id]: isLiked
        ? (prev[id] ?? baseLikes) - 1 // unlike: subtract 1
        : (prev[id] ?? baseLikes) + 1, // like: add 1
    }));

    setLiked((prev) => ({
      ...prev,
      [id]: !isLiked,
    }));
  };

  return (
    <section className="game-review">
      <h2>Reviews</h2>

      <ul className="review-list">
        {reviews.map((review) => (
          <li className="review-card" key={review.id}>
            <header className="review-header">
              <div className="user-info">
                <p className="user-line">
                  <strong>{review.username}</strong>{" "}
                  <span className="reviewed-text">
                    reviewed {review.game}
                  </span>
                </p>

                <div className="rating">{"★".repeat(review.rating)}</div>
              </div>

              <time className="date">{review.date}</time>
            </header>

            <p className="review-text">{review.review}</p>

            <footer className="review-footer">
              <button
                className={`like-button ${liked[review.id] ? "liked" : ""}`}
                onClick={() => handleLike(review.id, review.likes)}
              >
                ❤️ {likes[review.id] ?? review.likes}
              </button>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GameReview;