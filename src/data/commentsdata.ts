import type { Comment } from "../types/comment";

export let comments: Comment[] = [
  {
    id: 1,
    reviewId: 1,
    username: "GamerPro",
    text: "Totally agree! The gameplay is incredible.",
    date: "Jan 17, 2026",
  },
  {
    id: 2,
    reviewId: 1,
    username: "FPSFanatic",
    text: "Best competitive shooter out there!",
    date: "Jan 18, 2026",
  },
  {
    id: 3,
    reviewId: 2,
    username: "CasualPlayer",
    text: "Great game for relaxation.",
    date: "Jan 19, 2026",
  },
];