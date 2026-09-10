import React, { useEffect, useState } from 'react';
import BoardComponent from './components/boardComponent';
import './App.css';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/lostFigures';
import Timer from './components/timer';

function App() {
  const [board, setBoard] = useState(new Board);
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(()=>{
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])
  function restart() {
    const newBoard=new Board();
    newBoard.initCells()
    newBoard.addFigures();
    setBoard(newBoard)
  }
  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }
  return (
    <div className='app'>
      <Timer restart={restart} currentPlayer={currentPlayer}/>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
      <div>
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigure}/>
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigure}/>
      </div>
    </div>
  );
}

export default App;
