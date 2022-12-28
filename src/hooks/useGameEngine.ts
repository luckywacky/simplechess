import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { ChessMove, Square } from '../types/gameEngine'
import { gameMove, joinGame } from '../services/GameService'
import { useBoardWidth } from './useBoardWidth'

export function useGameEngine(gamename: string) {
  const [game, setGame] = useState(new Chess())
  const [conntected, setConnected] = useState(false)
  const { boardWidth } = useBoardWidth()

  useEffect(() => {
    if (conntected) return

    joinGame(gamename, (newMove: ChessMove) => {
      game.move(newMove)
      setGame({ ...game, ...newMove })
    })
    setConnected(true)
  }, [])

  function onPieceDrop(sourceSquare: Square, targetSquare: Square) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })
    if (!!move) gameMove(gamename, move)

    return true
  }

  return {
    boardWidth,
    onPieceDrop,
    position: game.fen(),
  }
}
