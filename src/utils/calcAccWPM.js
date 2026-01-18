
export function calculateWPM(correctChars, secondsElapsed) {
  if (secondsElapsed < 5) return 0;
  const minutes = secondsElapsed / 60;
  return Math.round((correctChars / 5) / minutes)
}

export function calculateAccuracy(correctChars, totalChars) {
  return totalChars ? Math.round((correctChars / totalChars) * 100) : 100;
}