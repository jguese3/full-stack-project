import { useState } from 'react';

import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';


import { Friends } from './components/friends/Friends';
import GameReview from './components/GameReview/GameReview';
import { AllGames } from './components/all_games/allGames';
import { UserGames } from './components/userList/userGameList';
import Following from './components/friends/Following';

// Mock data imports
import type { User } from './assets/types/user';
import { userData } from './assets/temp/tempUsers';

import { Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  // Shared state concerning user data
  const [users, setUsers] = useState<User[]>(userData);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
        />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/UserGames" element={<UserGames />} />
        <Route path="/reviews" element={<GameReview />} />
        <Route path="/friends" element={
          <>
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
