import './App.css'
import { Footer } from './components/footer/footer'
import { FriendStatus } from './components/friend_status/friend_status'
import GameReview from './components/GameReview/GameReview'

function App() {
  return (
    <>
      <GameReview/>
      <FriendStatus/>
      <Footer />
    </>
  )
}

export default App
