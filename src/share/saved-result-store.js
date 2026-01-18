const currentResult = JSON.parse(localStorage.getItem('currentResult')) || {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0,
  time: 0
};

const savedResult = JSON.parse(localStorage.getItem('savedResult')) || {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0,
  time: 0
};

const resultHistory = JSON.parse(localStorage.getItem('resultHistory')) || [];

function saveCurrentResult() {
  resultHistory.push({...currentResult});
  localStorage.setItem('resultHistory', JSON.stringify(resultHistory));
}

function updatePersonalBest() {
  // if (savedResult.length === 0) {
  //   document.querySelector('.high-wpm').textContent = 0;
  //   document.querySelector('.high-wpm-mobile').textContent = 0;
  //   return;
  // }
  saveCurrentResult();
  if (currentResult.wpm > savedResult.wpm) {
    savedResult.wpm = currentResult.wpm;
    savedResult.accuracy = currentResult.accuracy;
    savedResult.correctChars = currentResult.correctChars;
    savedResult.inCorrectChars = currentResult.inCorrectChars;
    savedResult.time = currentResult.time;

    localStorage.setItem('savedResult', JSON.stringify(savedResult));
  }
  
  const personalBest = resultHistory.reduce((max, result) => result.wpm > max ? result.wpm : max, 0);
  document.querySelector('.high-wpm').textContent = savedResult.wpm;
  document.querySelector('.high-wpm-mobile').textContent = savedResult.wpm;

  localStorage.setItem('personalBest', JSON.stringify({wpm: personalBest}));
}

export { currentResult, savedResult, updatePersonalBest, resultHistory };