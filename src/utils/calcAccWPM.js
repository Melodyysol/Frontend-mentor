import { currentResult, savedResult } from "../share/saved-result-store.js";

export function calculateWPM(correctChars, secondsElapsed) {
  if (secondsElapsed < 5) return 0;
  const minutes = secondsElapsed / 60;
  return Math.round((correctChars / 5) / minutes)
}

export function calculateAccuracy(correctChars, totalChars) {
  return totalChars ? Math.round((correctChars / totalChars) * 100) : 100;
}

export function shuffleDifficulty (difficulty) {
  const difficulties = [...difficulty];
  for (let i = 0; i < difficulties.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [difficulties[i], difficulties[j]] = [difficulties[j], difficulties[i]]
  }
  return difficulties;
}

export function finish(finished, timer) {
  changePageHighWPM()
  finished = true;
  clearInterval(timer);
}

function changePageHighWPM() {
  if(currentResult.wpm > savedResult.wpm && savedResult.wpm !== 0) {
    window.location.href = 'second-result.html';
  } else if(currentResult.wpm === savedResult.wpm && savedResult.wpm !== 0) {
    if (currentResult.accuracy > savedResult.accuracy) {
      window.location.href = 'second-result.html';
      return;
    } else {
       window.location.href = 'first-result-test.html';
    }
  }else {
    window.location.href = 'first-result-test.html';
  }
}