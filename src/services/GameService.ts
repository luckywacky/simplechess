import './FirebaseService'
import { getDatabase, ref, set, get, onValue, child } from 'firebase/database'
import { ChessMove } from '../types/gameEngine'

export async function checkGame(gamename: string) {
  try {
    const db = getDatabase()
    const snapshot = await get(child(ref(db), `games/${gamename}`))
    return snapshot.exists()
  } catch (error) {
    console.error('error while checking if the game exists', error)
  }
}

export async function joinGame(
  gamename: string,
  onNewMove: (newMove: ChessMove) => void,
) {
  try {
    const db = getDatabase()
    const snapshot = await get(child(ref(db), `games/${gamename}/playerCount`))
    set(ref(db, `games/${gamename}/playerCount`), snapshot.val() + 1)
    onValue(ref(db, `games/${gamename}/lastMove`), (snapshot) => {
      const newMove = snapshot.val() as ChessMove
      if (newMove!!) onNewMove(newMove)
    })
  } catch (error) {
    console.error('error while joining the game', error)
  }
}

export async function createGame(gamename: string) {
  try {
    const db = getDatabase()
    set(ref(db, `games/${gamename}`), { lastMove: '', playerCount: 0 })
  } catch (error) {
    console.error('error while creating the game', error)
  }
}

export async function gameMove(gamename: string, move: ChessMove) {
  try {
    const db = getDatabase()
    set(ref(db, `games/${gamename}/lastMove`), move)
  } catch (error) {
    console.error('error while moving the piece', error)
  }
}

export async function leaveGame(gamename: string) {
  try {
    const db = getDatabase()
    const snapshot = await get(child(ref(db), `games/${gamename}/playerCount`))
    const playerCount = snapshot.val() as number
    console.log('player count:', playerCount)
    if (playerCount === 1) {
      set(ref(db, `games/${gamename}`), null)
    } else {
      set(ref(db, `games/${gamename}/playerCount`), playerCount - 1)
    }
  } catch (error) {
    console.error('error while leaving the game', error)
  }
}
