export let currentResult = JSON.parse(localStorage.getItem('currentResult')) || {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0
};

export let savedResult = JSON.parse(localStorage.getItem('savedResult')) || [];

savedResult.push(currentResult);
localStorage.setItem('savedResult', JSON.stringify(savedResult));

export function updatePersonalBest() {
  if (savedResult.length === 0) {
    document.querySelector('.high-wpm').textContent = 0;
    return;
  }
  let personalBest = savedResult.reduce((max, result) => result.wpm > max ? result.wpm : max, 0);
  document.querySelector('.high-wpm').textContent = personalBest;
}

export function changePageHighWPM() {
  let personalBest = savedResult.reduce((max, result) => result.wpm > max ? result.wpm : max, 0);
  if (savedResult.length === 0) {
    document.querySelector('.high-wpm').textContent = 0;
    window.location.href = `first-result-test.html`;
    return;
  }

  setTimeout(() => {
    if (currentResult.wpm > personalBest && savedResult.length > 1) {
      window.location.href = `second-result.html`;
      document.querySelector('.high-wpm').textContent = currentResult.wpm;
    } else {
      window.location.href = `first-result-test.html`;
    }
  }, 59000);
}