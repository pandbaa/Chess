import React,  { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './cellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  selectedCell: Cell | null;
  setSelectedCell: (cell: Cell | null)=>void;
  currentPlayer: Player | null;
  swapPlayer: ()=>void;
  isBoardFlipped: boolean;
  flipBoard: ()=>void;
}

const BoardComponent: FC<BoardProps> =({board, setBoard, swapPlayer, currentPlayer, selectedCell, setSelectedCell, isBoardFlipped, flipBoard})=>{
  function click(cell: Cell) {
    if (selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      } 
    }
  }

  useEffect(()=>{highlightCells()}, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard=board.getCopyBoard();
    setBoard(newBoard);
  }

  const rows = isBoardFlipped ? [...board.cells].reverse() : board.cells;

  return (
    <div>
    <h3>Текущий игрок {currentPlayer?.color}</h3>
    <div className='board'>
      {rows.map((row, rowIndex)=>{
        const cells = isBoardFlipped ? [...row].reverse() : row;
        return <React.Fragment key={rowIndex}>
          {cells.map(cell=><CellComponent cell={cell} key={cell.id} selected={cell.x===selectedCell?.x && cell.y===selectedCell?.y} click={() => click(cell)} />)}
        </React.Fragment>
      }
      )}
    </div>
    </div>
  );
}

export default BoardComponent;