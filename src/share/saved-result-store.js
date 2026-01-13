export let savedResult = JSON.parse(localStorage.getItem('savedResult')) || {
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  inCorrectChars: 0
};
