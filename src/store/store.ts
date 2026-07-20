import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from 'zustand/middleware'

type Player = {
  id: number
  name: string
  role?: string
  word?: string
}

type GameState = {
  players: Player[]
  theme?: string
  secretWord?: string
  imposterIndex?: number

  setPlayers: (players: Player[]) => void
  addPlayer: (player: Player) => void
  updatePlayer: (id: number, name: string) => void
  removePlayer: (id: number) => void

  setTheme: (theme?: string) => void
  setSecretWord: (word?: string) => void
  setImposterIndex: (i?: number) => void

  resetGame: () => void
}

export const useStore = create<GameState>()(
  persist(
    (set) => ({
      players: [{ id: 1, name: 'Player 1' }],

      theme: undefined,
      secretWord: undefined,
      imposterIndex: undefined,

      setPlayers: (players) => set(() => ({ players })),
      addPlayer: (player) => set((s) => ({ players: [...s.players, player] })),
      updatePlayer: (id, name) =>
        set((s) => ({ players: s.players.map(p => p.id === id ? { ...p, name } : p) })),
      removePlayer: (id) => set((s) => ({ players: s.players.filter(p => p.id !== id) })),

      setTheme: (theme) => set(() => ({ theme })),
      setSecretWord: (secretWord) => set(() => ({ secretWord })),
      setImposterIndex: (imposterIndex) => set(() => ({ imposterIndex })),

      resetGame: () => set(() => ({
        players: [{ id: 1, name: 'Player 1' }],
        theme: undefined,
        secretWord: undefined,
        imposterIndex: undefined
      }))
    }),
    {
      name: 'imposter-game',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useStore