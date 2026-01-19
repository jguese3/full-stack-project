import './App.css'
import { Footer } from './components/footer/footer'
import { FriendStatus } from './components/friend_status/friend_status'
import GameReview from './components/GameReview/GameReview'
import { Backlog } from './components/backlog/backlog'
import { Header } from './components/header/header'

function App() {
  return (
    <>
      <Header/>
      <Backlog/>
      <GameReview/>
      <FriendStatus/>
      <Footer />
    </>
  )
}

export default App
