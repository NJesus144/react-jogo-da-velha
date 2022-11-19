import { useState, useEffect } from "react";
import styles from "./Game.module.css";

import GameOption from "../gameOption/GameOption";
import GameInfo from "../gameInfo/GameInfo";

const winnerTable = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game() {
  const [gameState, setGameState] = useState(Array(9).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [winner, setWinner] = useState(0);
  const [winnerLine, setWinnerLine] = useState([]);
  const [draw, setDraw] = useState(false);

  const handleClick = (position) => {
    if (gameState[position] === 0 && winner === 0) {
      let newGameState = [...gameState];
      newGameState[position] = currentPlayer;
      setGameState(newGameState);
    }
  };

  const verifyGame = () => {
    winnerTable.forEach((row) => {
      const values = row.map((pos) => gameState[pos]);
      const sum = values.reduce((sum, val) => sum + val);
      if (sum === 3 || sum === -3) {
        setWinner(sum / 3);
        setWinnerLine(row);
      }
    });
  };

  const handleReset = () => {
    setGameState(Array(9).fill(0));
    setWinner(0);
    setWinnerLine([]);
    setDraw(false)
  };

  const verifyDraw = () => {
    // if(gameState.filter((value) => value === 0).length === 0)
    if(gameState.find((value) => value === 0) === undefined && winner === 0) {
      setDraw(true)
    }
  }

  const verifyWinnerLine = (pos) => 
  winnerLine.find((value) => value === pos) !== undefined;

  useEffect(() => {
    setCurrentPlayer(currentPlayer * -1);
    verifyDraw()
    verifyGame();
  }, [gameState]);

  useEffect(() => {
    if(winner !== 0) setDraw(false);
}, [winner])

  return (
    <div className={styles.gameContent}>
      <div className={styles.game}>
        {gameState.map((value, position) => (
          <GameOption
            key={`game-option-pos-${position}`}
            status={value}
            onClick={() => handleClick(position)}
            isWinner={verifyWinnerLine(position)}
            isDraw={draw}
          />
        ))}
      </div>
      <GameInfo
        currentPlayer={currentPlayer}
        winner={winner}
        onReset={handleReset}
        isDraw={draw}
      />
    </div>
  );
}

export default Game;
