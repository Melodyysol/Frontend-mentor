let currentResult = JSON.parse(localStorage.getItem('currentResult')) || {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0,
  time: 0
};

const savedResult = JSON.parse(localStorage.getItem('savedResult')) || [{
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0,
  time: 0
}];

savedResult.push(currentResult);
localStorage.setItem('savedResult', JSON.stringify(savedResult));

function updatePersonalBest() {
  if (savedResult.length === 0) {
    document.querySelector('.high-wpm').textContent = 0;
    document.querySelector('.high-wpm-mobile').textContent = 0;
    return;
  }
  let personalBest = savedResult.reduce((max, result) => result.wpm > max ? result.wpm : max, 0);
  document.querySelector('.high-wpm').textContent = personalBest;
  document.querySelector('.high-wpm-mobile').textContent = personalBest;
}

export { currentResult, savedResult, updatePersonalBest };