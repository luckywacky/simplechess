import { Routes, Route } from 'react-router-dom'
import { Welcome, Lobby } from './pages'
import './styles/global.module.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="game/:id" element={<Lobby />} />
    </Routes>
  )
}

export default App
