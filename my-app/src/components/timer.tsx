import React, { FC, useEffect, useRef, useState } from 'react';
//import { Figure } from '../models/figures/Figure';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
import Modal from '../components/modal';

interface TimerProps {
  currentPlayer: Player | null;
  restart: ()=>void;
  flipBoard: ()=>void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, flipBoard})=>{
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [winner, setWinner] = useState<Colors | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (blackTime <= 0) {
      setWinner(Colors.WHITE);
      stopTimer();
      setIsGameStarted(false);
    } else if (whiteTime <= 0) {
      setWinner(Colors.BLACK);
      stopTimer();
      setIsGameStarted(false);
    }
  }, [blackTime, whiteTime]);

  useEffect(() => {
    if (!isGameStarted || !currentPlayer || winner) return;

    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback =
      currentPlayer.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlakTimer;

    timer.current = setInterval(callback, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [currentPlayer, winner, isGameStarted]);

  function stopTimer() {
  if (timer.current) {
    clearInterval(timer.current);
    timer.current = null;
  }
}
  function decrementBlakTimer() {
    setBlackTime(prev=>prev-1);
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev=>prev-1);
  }
  const heandleRestart =()=>{
    stopTimer();
    setBlackTime(300);
    setWhiteTime(300);
    setWinner(null);
    setIsGameStarted(false);
    restart();
  }
  const heandleStart=()=>{
    setBlackTime(300);
    setWhiteTime(300);
    setWinner(null);
    restart();
    setIsGameStarted(true);
  }
  return (
    <div>
      <div className="panel">
        <button onClick={heandleStart}>Старт</button>
        <button onClick={heandleRestart}>Перезапуск</button>
        <button onClick={flipBoard}>Смена сторон игроков</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
      <Modal visible={!!winner} onClose={heandleRestart}>
        <h2>Игра окончена!</h2>
        <p>Победили {winner === Colors.WHITE ? 'белые' : 'черные'}!</p>
        <button onClick={heandleRestart}>Новая игра</button>
      </Modal>
    </div>
  );
};

export default Timer;