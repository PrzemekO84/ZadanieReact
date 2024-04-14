import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours(prevHours => prevHours + 1);
    }
  }, [seconds, minutes]);

  return (
    <div id="stopWatch-Container">
      <h1>Stopwatch</h1>
      <p>{hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={() => { setHours(0); setMinutes(0); setSeconds(0); }}>Reset</button>
    </div>
  );
}

export default Stopwatch;
