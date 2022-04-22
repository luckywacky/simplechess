import * as React from 'react'
import { Chess } from 'chess.js'
import { Square } from '../types/gameEngine'

export function useGameEngine() {
	const [game, setGame] = React.useState(new Chess())

	function onPieceDrop(sourceSquare: Square, targetSquare: Square) {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q',
		})
		setGame({ ...game, ...move })
		return true
	}

	return { onPieceDrop, position: game.fen() }
}
