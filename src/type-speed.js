import { data } from './data/data.js';
import { topScreenHTML } from './share/home-header.js';
import { savedResult } from './share/saved-result-store.js';

let shuffleEasy = data.easy.sort(() => Math.random() - 0.5);
let shuffleMedium = data.medium.sort(() => Math.random() - 0.5);
let shuffleHard = data.hard.sort(() => Math.random() - 0.5);

let typedData = [];
let startTime = null;
let finished = false;
let timer = null;
const TEST_DURATION = 60;
let remainingTime = TEST_DURATION;

const input = document.querySelector('.text-area');
const referenceEl = document.querySelector('.js-text-to-type');
const wpmEl = document.querySelector('.wpm-value');
const accEl = document.querySelector('.accuracy-value');
const timeEl = document.querySelector('.time-value');
const restartBtn = document.querySelector('.js-restart-button');

let referenceText = '';

// ---------------- TEXT SELECTION ----------------

function getRandomText(difficulty) {
  if (difficulty === 'easy') return shuffleEasy[0].text;
  if (difficulty === 'medium') return shuffleMedium[0].text;
  if (difficulty === 'hard') return shuffleHard[0].text;
}

function initialize() {
  referenceText = getRandomText('easy');
  referenceEl.textContent = referenceText;
}
initialize();

function changeMode(difficulty) {
  referenceText = getRandomText(difficulty);
  referenceEl.textContent = referenceText;
  typedData = [];
  input.innerHTML = '';
  input.focus();
  updateStats();
}

// ---------------- CURSOR ----------------

function moveCursorToEnd(el) {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

// ---------------- RENDER ----------------

function render() {
  input.innerHTML = typedData
    .map(c => `<span class="${c.correct ? 'correct' : 'incorrect'}">${c.char}</span>`)
    .join('');
  moveCursorToEnd(input);
}

// ---------------- STATS ----------------

function updateStats() {
  const total = typedData.length;
  const correct = typedData.filter(c => c.correct).length;
  const wpm = Math.round(correct / 5);
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  wpmEl.textContent = wpm;
  accEl.textContent = accuracy + '%';

  savedResult.wpm = wpm;
  savedResult.accuracy = accuracy;
  savedResult.correctChars = correct;
  savedResult.inCorrectChars = total - correct;
  savedResult.time = TEST_DURATION - remainingTime;

  localStorage.setItem('savedResult', JSON.stringify(savedResult));
}

// ---------------- TIMER ----------------

function startTimer() {
  if (startTime) return;
  startTime = Date.now();
  remainingTime = TEST_DURATION;

  timeEl.textContent = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;

  timer = setInterval(() => {
    remainingTime--;
    timeEl.textContent = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
    updateStats();

    if (remainingTime <= 0) finish();
  }, 1000);
}

// ---------------- FINISH ----------------

function finish() {
  finished = true;
  clearInterval(timer);
  window.location.href = 'first-result-test.html';
}

// ---------------- INPUT HANDLER ----------------

input.addEventListener('beforeinput', e => {
  e.preventDefault();
  if (finished) return;

  const char = e.data;
  if (!char) return;

  // Always append at the end
  if (typedData.length >= referenceText.length) return;

  const expected = referenceText[typedData.length];
  typedData.push({ char: expected, correct: char === expected });

  render();
  updateStats();

  if (!startTime) startTimer();
  if (typedData.length === referenceText.length) finish();
});

// ---------------- RESTART ----------------

restartBtn.addEventListener('click', () => {
  typedData = [];
  finished = false;
  startTime = null;
  clearInterval(timer);

  remainingTime = TEST_DURATION;
  timeEl.textContent = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;

  input.innerHTML = '';
  input.focus();
  updateStats();
});
