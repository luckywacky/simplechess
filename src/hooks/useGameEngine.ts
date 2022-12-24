import * as React from 'react'
import { Chess } from 'chess.js'
import { Square } from '../types/gameEngine'
import { gameMove, joinGame } from '../services/GameService'

export interface ChessMove {
  color: string
  flags: string
  from: string
  piece: string
  san: string
  to: string
}

export function useGameEngine(gamename: string) {
  const [game, setGame] = React.useState(new Chess())
  const [conntected, setConnected] = React.useState(false)

  React.useEffect(() => {
    if (conntected) {
      return
    }
    joinGame(gamename, (newMove: ChessMove) => {
      game.move(newMove)
      setGame({ ...game, ...newMove })
    })
    setConnected(true)
  }, [])

  React.useEffect(() => {}, [])

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
    boardWidth: window.innerWidth > 450 ? 560 : 400,
    onPieceDrop,
    position: game.fen(),
  }
}
