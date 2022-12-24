import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { Page } from '../../containers'
import { createGame, checkGame } from '../../services/GameService'
import classes from './Welcome.module.scss'

function Welcome() {
  const [gamename, setGamename] = useState('')
  const navigate = useNavigate()

  async function tryToJoinGame(gamename: string) {
    const gameExists = await checkGame(gamename)
    if (gameExists) {
      navigate(`/game/${gamename}`)
    }
  }

  async function tryToCreateGame(gamename: string) {
    const gameExists = await checkGame(gamename)
    if (!gameExists) {
      await createGame(gamename)
      navigate(`/game/${gamename}`)
    }
  }

  return (
    <Page>
      <h1>Simple Chess</h1>
      <Input
        value={gamename}
        onChange={(e) => setGamename(e.target.value)}
        placeholder="Game name"
      />
      <div className={classes.buttons}>
        <Button label="Join game" onClick={() => tryToJoinGame(gamename)} />
        <Button label="Create game" onClick={() => tryToCreateGame(gamename)} />
      </div>
    </Page>
  )
}

export default Welcome
