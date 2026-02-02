import { useState } from 'react';

import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';

// Components imports
import { Friends } from './components/friends/Friends';
import { GameReview } from './components/gamereview/GameReview';
import { AllGames } from './components/allGames/allGames';
import { UserGames } from './components/userList/userGameList';
import SearchFriends from './components/friends/SearchFriends';
import { Following } from './components/friends/Following';

// Mock data imports
import type { User } from './assets/types/user';
import { userData } from './assets/temp/tempUsers';

import type { UserGame } from './assets/temp/tempUserGames';
import { tempUserGames } from './assets/temp/tempUserGames';

import { Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  const [selectedReviewId, setSelectedReviewId] = useState<number>(1);
  // Shared state concerning user data
  const [users, setUsers] = useState<User[]>(userData);

  const [userGameList, setUserGameList] = useState<UserGame[]>(tempUserGames);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
        />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/UserGames" element={<UserGames userGames={userGameList} updateUserGames={setUserGameList} />} />
        <Route path="/reviews" element={<GameReview selectedReviewId={selectedReviewId} setSelectedReviewId={setSelectedReviewId} />} />
        <Route path="/friends" element={
          <>
          <SearchFriends users={users} updateFollowing={setUsers} />
          <Following users={users} updateFollowing={setUsers} />
          <Friends />
          </>
        } 
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
