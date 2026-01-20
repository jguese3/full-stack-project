import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'


import { FriendStatus } from './components/friend_status/friend_status'
import GameReview from './components/GameReview/GameReview'
import { Backlog } from './components/backlog/backlog'

import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
        />
        <Route path="/backlog" element={<Backlog />} />
        <Route path="/reviews" element={<GameReview />} />
        <Route path="/friends" element={<FriendStatus />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
