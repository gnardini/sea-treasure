import React, { useEffect } from 'react'
import useGameLogic, { getTreasureLevel } from '../logic/GameLogic'
import './css/Game.css'

function divideTreasures(treasures) {
  let treasuresPerLine = []
  let currentLine = []

  for (let i = 0; i < treasures.length; i++) {
    if (currentLine.length < 10) {
      currentLine.push(treasures[i])
    } else {
      treasuresPerLine.push(currentLine)
      treasuresPerLine.push([treasures[i]])
      currentLine = []
    }
  }
  if (currentLine.length > 0) {
    treasuresPerLine.push(currentLine)
  }

  return treasuresPerLine
}

function levelColor(level) {
  return {
    1: 'rgb(176, 243, 235)',
    2: 'rgb(113, 240, 230)',
    3: 'rgb(35, 200, 175)',
    4: 'rgb(45, 155, 175)',
  }[level]
}

function GameUI() {
  const { 
    state: { oxygen, treasures },
    startGame,
  } = useGameLogic()

  useEffect(() => {
    startGame()
  }, [])

  const treasuresPerLine = divideTreasures(treasures)

  return (
    <div className="container">
      <div className="header">
        <div className="turn-container">
          <div className="label">Oxygen</div>
          <div className="value">{oxygen}</div>
        </div>
      </div>
      <div className="game-area">
        {treasuresPerLine.map((line, index) => {
          const reverse = index !== 0 && (Math.floor((index - 1) / 2) % 2) === 0
          return (
            <div className={`game-line${reverse ? '-reverse' : ''}`}>
              {line.map(item => {
                const level = getTreasureLevel(item)
                return (
                  <div className="game-item" style={{ backgroundColor: levelColor(level) }}>
                    {level}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameUI
