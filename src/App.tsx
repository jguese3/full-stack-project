import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';

// Components imports
import { AllGames } from './components/allGames/allGames';
import { Friends } from './components/friends/Friends';
import { Search } from './components/search/Search';
import { Following } from './components/friends/Following';
import { GameReview } from './components/GameReview/GameReview';
import { UserGames } from './components/userList/userGameList';

import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/UserGames" element={<UserGames />} />
        <Route path="/reviews" element={<GameReview />} />
        <Route path="/friends" element={
          <>
          <Search/>
          <Following userFilterFn={(user) => user.isFollowing}/>
          <Friends />
          </>
        } 
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App
