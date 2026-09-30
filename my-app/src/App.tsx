import React, { useEffect, useState } from 'react';
import BoardComponent from './components/boardComponent';
import './App.css';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { Cell } from './models/Cell';
import LostFigures from './components/lostFigures';
import Timer from './components/timer';

function App() {
  const [board, setBoard] = useState(new Board);
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);

  useEffect(()=>{
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])
  function flipBoard() {
    setIsBoardFlipped(prev => !prev);
    setSelectedCell(null);
  }
  function restart() {
    const newBoard=new Board();
    newBoard.initCells()
    newBoard.addFigures();
    setBoard(newBoard);
    setSelectedCell(null);
    setCurrentPlayer(new Player(Colors.WHITE));
  }
  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }
  return (
    <div className='app'>
      <Timer restart={restart} currentPlayer={currentPlayer} flipBoard={flipBoard}/>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} selectedCell={selectedCell} setSelectedCell={setSelectedCell} isBoardFlipped={isBoardFlipped} flipBoard={flipBoard}/>
      <div>
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigure}/>
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigure}/>
      </div>
    </div>
  );
}

export default App;
