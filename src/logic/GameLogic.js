import { useState } from 'react';
import shuffle from '../utils/shuffle'

function generateInitialTreasures() {
  const twoOfEach = i => [i, i]
  return [
    ...shuffle([0, 1, 2, 3].map(twoOfEach).flat()), 
    ...shuffle([4, 5, 6, 7].map(twoOfEach).flat()), 
    ...shuffle([8, 9, 10, 11].map(twoOfEach).flat()),
    ...shuffle([12, 13, 14, 15].map(twoOfEach).flat()),
  ]
}

function initialState() {
  return {
    oxygen: 25,
    treasures: generateInitialTreasures(),
  }
}

export function getTreasureLevel(treasure) {
  if (treasure <= 3) return 1;
  if (treasure <= 7) return 2;
  if (treasure <= 11) return 3;
  return 4
}

export default function useGameLogic() {
  const [state, setState] = useState(initialState())
  const startGame = () => {
    setState(initialState())
  }
  return {
    state,
    startGame,
  }
}