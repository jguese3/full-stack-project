export type UserGame = {
  id: number;
  title: string;
  platform: string;
  status: string;
};

export const tempUserGames: UserGame[] = [
  { id: 1, title: "The Legend of Zelda: Breath of the Wild", platform: "Nintendo Switch", status: "backlog" },
  { id: 2, title: "God of War", platform: "PlayStation 4", status: "done" },
  { id: 3, title: "Red Dead Redemption 2", platform: "Xbox One", status: "playing" },
];
