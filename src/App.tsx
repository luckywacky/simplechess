import * as React from 'react'
import { Chessboard } from 'react-chessboard'
import { useGameEngine } from './hooks/useGameEngine'

function App() {
	const gameEngine = useGameEngine()

	return <Chessboard {...gameEngine} />
}

export default App
