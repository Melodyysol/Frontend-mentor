import { data } from './data/data.js';
import { topScreenHTML } from './share/home-header.js';
import { savedResult } from './share/saved-result-store.js';

let headerHTML = ''
let mainHTML = ''

let shuffleEasy = data.easy.sort(() => Math.random() - 0.5);
let shuffleMedium  = data.medium.sort(() => Math.random() - 0.5)
let shuffleHard  = data.hard.sort(() => Math.random() - 0.5);
let correctChars = 0;
let inCorrectChars = 0;
let typedData = []
const invalidKeys = 'Shift, Control, Alt, Meta, CapsLock, Tab, Escape, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Enter, Backspace, Delete, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12';

homeScreenHTML()
function homeScreenHTML() {
  headerHTML = `
    ${topScreenHTML()}
    <div class="type-bottom-header type-header">
      <div class="wpm-content content">
        <span class="wpm-count information info">
          <span>WPM: </span>
          <span class="wpm-value">0</span>
        </span>
        <span class="accuracy-info information info">
          <span>Accuracy: </span>
          <span class="accuracy-value">0.0%</span>
        </span>
        <span class="information info">
          <span>Time: </span>
          <span class="time-value">01:00</span>
        </span>
      </div>
      <div class="dif-mode-content content">
        <span class="information info">
          <span>Difficulty: </span>
          <button class="general-button active easy js-easy-mode">Easy</button> 
          <button class="general-button js-medium-mode">Medium</button> 
          <button class="general-button js-hard-mode">Hard</button>
        </span>
        <span class="information info mode-info">
          <span>Mode: </span>
          <button class="general-button active timed js-time-sec">Timed (60s)</button> 
          <button class="general-button js-time-passage">Passage</button>
        </span>
      </div>
      <div class="dif-mode-content-small">
        <div class="easy-time-select">
          <div class="list js-list-mode">
            <span class="js-mode-value">Easy</span>
            <img src="typing-speed-test-main/assets/images/icon-down-arrow.svg">
          </div>
          <div class="list js-list-time">
            <span class="js-time-value">Time (60s)</span>
            <img src="typing-speed-test-main/assets/images/icon-down-arrow.svg">
          </div>
        </div>
        <div class="drop-down drop-down-mode js-drop-down-mode js-drop-down-mode-2">
          <label class="js-easy-mode js-easy-mode-2">
            <input type="radio" name="mode" id="easy" checked>
            <label for="easy">Easy</label>
          </label>
          <label class="medium js-medium-mode js-medium-mode-2">
            <input type="radio" name="mode" id="medium">
            <label for="medium">Medium</label>
          </label>
          <label class="js-hard-mode js-hard-mode-2">
            <input type="radio" name="mode" id="hard">
            <label for="hard">Hard</label>
          </label>
        </div>
        <div class="drop-down drop-down-time js-drop-down-time">
          <label class="js-time-sec js-time-sec-2">
            <input type="radio" name="time" id="sec" checked>
            <label for="sec">Time (60s)</label>
          </label>
          <label class="medium passage js-time-passage js-time-passage-2">
            <input type="radio" name="time" id="passage">
            <label for="passage">Passage</label>
          </label>
        </div>
      </div>
    </div>
  `

document.querySelector('header').innerHTML = headerHTML
}
mainHTML = `
  <div class="start-message js-start-message">
    <button class="general-button start-button js-start-button">Start Typing Test</button>
    <p>Or click the test and start typing</p>
  </div>
  <div class="typing-container">
    <p class="text-to-type js-text-to-type"></p>
    <div contenteditable="plaintext-only" class="text-area" spellcheck="false" autocorrect="off" autocapitalize="off"></div>
  </div>
`
document.querySelector('main').innerHTML = mainHTML

let input = document.querySelector('.text-area')
let wpmEl = document.querySelector('.wpm-value');
let accEl = document.querySelector('.accuracy-value')
const timeEl = document.querySelector(".time-value");
let restartBtn = document.querySelector(".js-restart-button");
let startTime = null;
let timer = null;
let finished = false;
const TEST_DURATION = 60;

function getRandomText(difficulty) {
  let text = ''
  if (difficulty === 'easy') {
    text = shuffleEasy[0]
  } else if (difficulty === 'medium') {
    text = shuffleMedium[0]
  } else if (difficulty === 'hard') {
    text = shuffleHard[0]
  }
  return text
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function initialize() {
  let defaultText = getRandomText('easy')
  document.querySelector('.js-text-to-type').innerHTML = defaultText.text
}
function changeMode(difficulty) {
  let newText = getRandomText(difficulty)
  document.querySelector('.js-text-to-type').innerHTML = newText.text
}
document.querySelector('.js-list-mode').addEventListener('click', () => {
  document.querySelector('.js-drop-down-mode').style.display = 'flex'
})

document.querySelector('.js-easy-mode').addEventListener('click', () => {
  document.querySelector('.js-easy-mode').classList.add('active')
  document.querySelector('.js-medium-mode').classList.remove('active')
  document.querySelector('.js-hard-mode').classList.remove('active')
  easyMediumHard('Easy');
  changeMode('easy')
})
document.querySelector('.js-medium-mode').addEventListener('click', () => {
  document.querySelector('.js-medium-mode').classList.add('active')
  document.querySelector('.js-easy-mode').classList.remove('active')
  document.querySelector('.js-hard-mode').classList.remove('active')
  easyMediumHard('Medium')
  changeMode('medium')
})
document.querySelector('.js-hard-mode').addEventListener('click', () => {
  document.querySelector('.js-hard-mode').classList.add('active')
  document.querySelector('.js-easy-mode').classList.remove('active')
  document.querySelector('.js-medium-mode').classList.remove('active')
  easyMediumHard('Hard')
  changeMode('hard')
})

function shuffleMode (mode) {
  let randomNumber = Math.floor(Math.random() * 10);
  let shuffleSum = ('shuffle' + mode.at(0).toUpperCase() + mode.slice(1))

  if(shuffleSum === 'shuffleEasy') {
    shuffleSum = shuffleEasy
  }else if(shuffleSum === 'shuffleMedium') {
    shuffleSum = shuffleMedium
  }else if(shuffleSum === 'shuffleHard') {
    shuffleSum = shuffleHard
  }
  document.querySelector('.js-text-to-type').innerHTML = shuffleSum[randomNumber].text
}

document.querySelector('.js-easy-mode-2').addEventListener('click', () => {
  easyMediumHard('Easy');
  changeMode('easy')
})
document.querySelector('.js-medium-mode-2').addEventListener('click', () => {
  easyMediumHard('Medium')
  changeMode('medium')
})
document.querySelector('.js-hard-mode-2').addEventListener('click', () => {
  easyMediumHard('Hard')
  changeMode('hard')
})

function easyMediumHard(mode) {
  document.querySelector('.js-mode-value').innerHTML = mode
  document.querySelector('.js-drop-down-mode-2').style.display = 'none'
}

let startScreen = document.querySelector('.js-start-message')
startScreen.addEventListener('click', () => {
  clearScreen()
})
document.querySelector('.js-start-button').addEventListener('click', clearScreen)


function clearScreen() {
  setTimeout(() => {
    startScreen.style.display = 'none'
    restartBtn.style.display = 'flex'
    document.querySelector('.text-to-type').style.filter = 'blur(0px)'
    // timeSetup()
    input.focus();
  }, 400);
}



document.querySelector('.js-list-time').addEventListener('click', () => {
  document.querySelector('.js-drop-down-time').style.display = 'flex'
})
function timedPassage(mode) {
  document.querySelector('.js-time-value').innerHTML = mode
  document.querySelector('.js-drop-down-time').style.display = 'none'
}
document.querySelector('.js-time-passage').addEventListener('click', () => {
  setTimeout(() => {
    alert('Passage mode is coming soon!')
    document.querySelector('.js-time-sec').classList.add('active')
    document.querySelector('.js-time-passage').classList.remove('active')
  }, 100);
  if(document.querySelector('.js-hard-mode').classList.contains('active')) {
      shuffleMode('hard')
  }else if(document.querySelector('.js-medium-mode').classList.contains('active')) {
    shuffleMode('medium')
  }else {
    shuffleMode('easy')
  }
})
document.querySelector('.js-time-sec-2').addEventListener('click', () => {
  timedPassage('Time (60s)')
})
document.querySelector('.js-time-passage-2').addEventListener('click', () => {
  timedPassage('Passage')
  setTimeout(() => {
    alert('Passage mode is coming soon!')
    timedPassage('Time (60s)')
    // document.getElementById('sec').ariaChecked
  }, 100);
  if(document.querySelector('.js-mode-value').textContent === 'Hard') {
      shuffleMode('hard')
  }else if(document.querySelector('.js-mode-value').textContent === 'Medium') {
    shuffleMode('medium')
  }else {
    shuffleMode('easy')
  }
})


let referenceText = document.querySelector('.js-text-to-type').innerText;

  // Prevent paste & enter
  input.addEventListener("paste", e => e.preventDefault());
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") e.preventDefault();
  });

  // Core typing logic
  input.addEventListener("beforeinput", (e) => {
    if (finished) {
      e.preventDefault();
      return;
    }

    const cursorPos = getCursorPosition(input);

    if (!startTime) startTimer();

    // Backspace
    if (e.inputType === "deleteContentBackward") {
      if (cursorPos > 0) {
        typedData.splice(cursorPos - 1, 1);
        render(cursorPos - 1);
        updateStats();
      }
      e.preventDefault();
      return;
    }

    // Insert text
    if (e.data) {
      if (cursorPos >= referenceText.length) {
        e.preventDefault();
        return;
      }

      const expected = referenceText[cursorPos];
      typedData.splice(cursorPos, 0, {
        char: expected,
        correct: e.data === expected
      });

      render(cursorPos + 1);
      updateStats();

      if (typedData.length === referenceText.length) finish();
      

      e.preventDefault();
    }
  });

  // Render characters
  function render(cursorPos) {
    input.innerHTML = typedData
      .map(c =>
        `<span class="${c.correct ? "correct" : "incorrect"}">${c.char}</span>`
      )
      .join("");

    setCursorPosition(input, cursorPos);
  }

  // Timer
  let remainingTime = TEST_DURATION;
  function startTimer() {
    startTime = Date.now();
    remainingTime = TEST_DURATION;

    timeEl.textContent = '00:' + remainingTime;

    timer = setInterval(() => {
      remainingTime--
      const timeLeft = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`
      timeEl.textContent = timeLeft;
      
      updateStats();

      if(remainingTime <= 0) {
        finish()
      }
    }, 1000);
  }

  // Stats
  function updateStats() {
    const correctChars = typedData.filter(c => c.correct).length;
    const totalChars = typedData.length;

    inCorrectChars = totalChars - correctChars;
    // const timeElapsed = (Date.now() - startTime) / 1000;

    wpmEl.textContent = Math.round((correctChars / 5));
    accEl.textContent = totalChars ? Math.round((correctChars / totalChars) * 100) + '%' : '0%';

    // Store test result
    savedResult.wpm = Math.round((correctChars / 5));
    savedResult.accuracy = totalChars ? Math.round((correctChars / totalChars) * 100) : 0;
    savedResult.correctChars = correctChars
    savedResult.inCorrectChars = inCorrectChars
    savedResult.time = TEST_DURATION - remainingTime
    localStorage.setItem('savedResult', JSON.stringify(savedResult));
  }


  // Finish test
  function finish() {
    window.location.href = `first-result-test.html`
    finished = true;
    clearInterval(timer);
  }

  // Restart
  restartBtn.addEventListener('click', () => {
    // typedData = [];
    // startTime = null;
    // finished = false;
    // clearInterval(timer);

    // remainingTime = TEST_DURATION;
    // timeEl.textContent = remainingTime;

    // input.innerHTML = "";
    // input.focus();

    // wpmEl.textContent = 0;
    // accEl.textContent = '0.0%';

    window.location.reload();
  });

  // Cursor utilities
  function getCursorPosition(el) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return 0;

    const range = sel.getRangeAt(0);
    const pre = range.cloneRange();
    pre.selectNodeContents(el);
    pre.setEnd(range.endContainer, range.endOffset);
    return pre.toString().length;
  }

  function setCursorPosition(el, pos) {
    const range = document.createRange();
    const sel = window.getSelection();
    let current = 0;

    for (const node of el.childNodes) {
      const len = node.textContent.length;
      if (current + len >= pos) {
        range.setStart(node.firstChild, pos - current);
        break;
      }
      current += len;
    }

    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      input.focus();
    }
    if (e.key === 'Escape') {
      input.blur();
    }

    if (e.location === 0 && !invalidKeys.includes(e.key)) {
      input.focus();
    }
  });

  input.addEventListener('click', (e) => {
    e.preventDefault();
    input.focus();

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(input.childNodes[input.childNodes.length - 1], input.childNodes[input.childNodes.length - 1]?.textContent.length || 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  })