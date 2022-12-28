import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { ChessMove, Square } from '../types/gameEngine'
import { gameMove, joinGame, leaveGame } from '../services/GameService'
import { useBoardWidth } from './useBoardWidth'

export function useGameEngine(gamename: string) {
  const [gameEngine, setGameEngine] = useState(new Chess())
  const [conntected, setConnected] = useState(false)
  const { boardWidth } = useBoardWidth()
  const [name] = useState(gamename)

  useEffect(() => {
    if (conntected) return

    joinGame(name, (newMove: ChessMove) => {
      console.log('joining game')
      gameEngine.move(newMove)
      setGameEngine({ ...gameEngine, ...newMove })
    })
    setConnected(true)
  }, [])

  function onPieceDrop(sourceSquare: Square, targetSquare: Square) {
    const move = gameEngine.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })
    if (!!move) gameMove(name, move)

    return true
  }

  return {
    boardWidth,
    onPieceDrop,
    leaveGame: () => leaveGame(name),
    position: gameEngine.fen(),
  }
}
