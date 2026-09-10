import React, { FC, useEffect, useRef, useState } from 'react';
import { Figure } from '../models/figures/Figure';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
  currentPlayer: Player | null;
  restart: ()=>void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart})=>{
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)
  
  useEffect(()=>{
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback=currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlakTimer;
    timer.current=setInterval(callback, 1000);
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
    restart();
  }
  return (
    <div>
      <div>
        <button onClick={heandleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Черные - {whiteTime}</h2>
    </div>
  );
};

export default Timer;