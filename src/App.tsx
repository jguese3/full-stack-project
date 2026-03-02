import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';

// Components imports
import { Friends } from './components/friends/Friends';
import { GameReview } from './components/GameReview/GameReview';
import { AllGames } from './components/allGames/allGames';
import { UserGames } from './components/userList/userGameList';
// import SearchFriends from './components/friends/SearchFriends';
import { Following } from './components/friends/Following';
import { Search } from './components/search/Search';

// // Mock data imports
// import type { User } from './types/user';
// import { userData } from './assets/temp/tempUsers';

import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [selectedReviewId, setSelectedReviewId] = useState<number>(1);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  // just remove this CJM when you get here, its just so the yellow squiggly lines go away for now
  console.log(selectedGameId)
  
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.selectedGameId) {
      setSelectedGameId(location.state.selectedGameId);
    }
  }, [location.state?.selectedGameId]);
  
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
        />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/UserGames" element={<UserGames />} />
        <Route path="/reviews" element={<GameReview selectedReviewId={selectedReviewId} setSelectedReviewId={setSelectedReviewId} />} />
        <Route path="/friends" element={
          <>
          <Search/>
          <Following/>
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