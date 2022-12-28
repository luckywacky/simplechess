import { Suspense, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { useParams } from 'react-router-dom'
import { useGameEngine } from '../../hooks/useGameEngine'
import { Page } from '../../containers'

function Game() {
  const params = useParams()
  const gameEngine = useGameEngine(params.id as string)

  useEffect(() => {
    return () => {
      gameEngine.leaveGame()
    }
  }, [])

  return (
    <Page>
      <Suspense>
        <Chessboard {...gameEngine} />
      </Suspense>
    </Page>
  )
}

export default Game
