import React, { useCallback, useEffect, useState } from "react";

import "./save-the-date.scss";

const weddingDate = new Date("May 3, 2025 18:00 MST");

const SaveTheDate = () => {
  const [isSpanish, setIsSpanish] = useState(false);
  const [isFrancisco, setIsFrancisco] = useState(false);
  const [days, setDays] = useState(444);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const msToCountdown = useCallback((duration) => {
    let newSeconds = Math.floor((duration / 1000) % 60),
      newMinutes = Math.floor((duration / (1000 * 60)) % 60),
      newHours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      newDays = Math.floor(duration / (1000 * 60 * 60 * 24));

    newHours = (newHours < 10) ? "0" + newHours : newHours;
    newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;
    newSeconds = newSeconds < 10 ? "0" + newSeconds : newSeconds;

    if (newDays !== days) setDays(newDays);
    if (newHours !== hours) setHours(newHours);
    if (newMinutes !== minutes) setMinutes(newMinutes);
    if (newSeconds !== seconds) setSeconds(newSeconds);
  }, [days, hours, minutes, seconds]);

  const countdownInterval = useCallback(() => {
    const now = new Date();
    const msToWedding = weddingDate - now;
    msToCountdown(msToWedding);
  }, [msToCountdown]);

  useEffect(() => {
    setVariant();

    countdownInterval();
  }, [countdownInterval]);

  useEffect(() => {
    const interval = setInterval(countdownInterval, 1000);
    return () => clearInterval(interval);
  }, [countdownInterval, hours, minutes, seconds]);

  const setVariant = () => {
    const search = window.location.search;
    if (search.includes("id=es")) {
      setIsSpanish(true);
    }

    if (search.includes("de=fr")) {
      setIsFrancisco(true);
    }
  };

  return (
    <div className={`std ${isSpanish && 'spanish'} ${isFrancisco && 'francisco-first'}`}>
      <div className="std__bg">
        <div className="std__date">
          <span className="english-opt">May 3, 2025</span>
          <span className="spanish-opt">3 de Mayo de 2025</span>
        </div>
        <div className="std__countdown">
          <span className="std__countdown-number std__countdown-days">{days}</span>
          <span className="std__countdown-word">
            <span className="english-opt">days,</span>
            <span className="spanish-opt">días,</span>
          </span>
          <span className="std__countdown-number std__countdown-number--ghost-width-container std__countdown-hours">
            <span className="std__countdown-number--ghost-max-width">00</span>
            <span className="std__countdown-number--current-number">{hours}</span>
          </span>
          <span className="std__countdown-word">
            <span className="english-opt">hours,</span>
            <span className="spanish-opt">horas,</span>
          </span>
          <br className="std__countdown-br" />
          <span className="std__countdown-number std__countdown-number--ghost-width-container std__countdown-minutes">
            <span className="std__countdown-number--ghost-max-width">00</span>
            <span className="std__countdown-number--current-number">{minutes}</span>
          </span>
          <span className="std__countdown-word">
            <span className="english-opt">minutes,</span>
            <span className="spanish-opt">minutos,</span>
          </span>
          <span className="std__countdown-number std__countdown-number--ghost-width-container std__countdown-seconds">
            <span className="std__countdown-number--ghost-max-width">00</span>
            <span className="std__countdown-number--current-number">{seconds}</span>
          </span>
          <span className="std__countdown-word">
            <span className="english-opt">seconds</span>
            <span className="spanish-opt">segundos</span>
          </span>
        </div>
        <div className="std__location">Phoenix, Arizona, USA</div>
        <div className="std__names">
          <span className="std__name std__names--james">J. Dorr</span>
          <span className="std__name std__names--and">&</span>
          <span className="std__name std__names--francisco">F. Brown Muñoz</span>
        </div>
        <div className="std__alternatives">
          <span className="english-opt">
            Second reception in Spokane<br/>to be scheduled
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaveTheDate;
