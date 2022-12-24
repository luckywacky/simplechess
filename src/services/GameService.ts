import './FirebaseService'
import { getDatabase, ref, set, get, onValue, child } from 'firebase/database'
import { ChessMove } from '../hooks/useGameEngine'

export async function checkGame(gamename: string): Promise<boolean> {
  const dbRef = ref(getDatabase())
  const snapshot = await get(child(dbRef, `games/${gamename}`))
  return snapshot.exists()
}

export async function joinGame(
  gamename: string,
  onNewMove: (newMove: ChessMove) => void,
) {
  const db = getDatabase()
  const starCountRef = ref(db, 'games/' + gamename + '/lastMove')
  onValue(starCountRef, (snapshot) => {
    const newMove = snapshot.val() as ChessMove
    if (newMove!!) onNewMove(newMove)
  })
}

export async function createGame(gamename: string) {
  const db = getDatabase()
  set(ref(db, 'games/' + gamename), { lastMove: '' })
}

export async function gameMove(gamename: string, move: ChessMove) {
  const db = getDatabase()
  set(ref(db, 'games/' + gamename), {
    lastMove: move,
  })
}
