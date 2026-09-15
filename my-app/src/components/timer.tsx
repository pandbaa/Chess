import React, { FC, useEffect, useRef, useState } from 'react';
//import { Figure } from '../models/figures/Figure';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
import Modal from '../components/modal';

interface TimerProps {
  currentPlayer: Player | null;
  restart: ()=>void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart})=>{
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [winner, setWinner] = useState<Colors | null>(null);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)
  
  useEffect(()=>{
    startTimer()
  }, [currentPlayer])

  useEffect(() => {
    if (blackTime <= 0) {
      setWinner(Colors.WHITE);
      stopTimer();
    } else if (whiteTime <= 0) {
      setWinner(Colors.BLACK);
      stopTimer();
    }
  }, [blackTime, whiteTime]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback=currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlakTimer;
    timer.current=setInterval(callback, 1000);
  }
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
    setBlackTime(300);
    setWhiteTime(300);
    setWinner(null);
    restart();
    startTimer();
  }
  return (
    <div>
      <div>
        <button onClick={heandleRestart}>Перезапуск игры</button>
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