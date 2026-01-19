import './App.css'
import { Footer } from './components/footer/footer'
import { FriendStatus } from './components/friend_status/friend_status'
import GameReview from './components/GameReview/GameReview'
import { Backlog } from './components/backlog/backlog'

function App() {
  return (
    <>
      <Backlog/>
      <GameReview/>
      <FriendStatus/>
      <Footer />
    </>
  )
}

export default App
