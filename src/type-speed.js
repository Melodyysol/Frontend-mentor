import { data } from './data/data.js';
import { topScreenHTML } from './share/home-header.js';
import { currentResult, savedResult, updatePersonalBest } from './share/saved-result-store.js';

let headerHTML = ''
let mainHTML = ''

let shuffleEasy = data.easy.sort(() => Math.random() - 0.5);
let shuffleMedium  = data.medium.sort(() => Math.random() - 0.5)
let shuffleHard  = data.hard.sort(() => Math.random() - 0.5);
let inCorrectChars = 0;
let typedData = []


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
    <textarea class="text-area" spellcheck="false"
     autocorrect="off" autocapitalize="off" 
     autocomplete="off" autosuggest="off" autofocus></textarea>
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
const PENALTY_PER_MISTAKE = 1;


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
  setTimeout(() => {
    document.querySelector('.js-easy-mode').classList.add('active')
    document.querySelector('.js-medium-mode').classList.remove('active')
    document.querySelector('.js-hard-mode').classList.remove('active')
    easyMediumHard('Easy');
    changeMode('easy')
    input.focus()
  }, 200);
})
document.querySelector('.js-medium-mode').addEventListener('click', () => {
  setTimeout(() => {
    document.querySelector('.js-medium-mode').classList.add('active')
    document.querySelector('.js-easy-mode').classList.remove('active')
    document.querySelector('.js-hard-mode').classList.remove('active')
    easyMediumHard('Medium')
    changeMode('medium')
    input.focus()
  }, 200);
})
document.querySelector('.js-hard-mode').addEventListener('click', () => {
  setTimeout(() => {
    document.querySelector('.js-hard-mode').classList.add('active')
    document.querySelector('.js-easy-mode').classList.remove('active')
    document.querySelector('.js-medium-mode').classList.remove('active')
    easyMediumHard('Hard')
    changeMode('hard')
    input.focus()
  }, 200);
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
  setTimeout(() => {
    easyMediumHard('Easy');
    changeMode('easy')
    input.focus()
  }, 200);
})
document.querySelector('.js-medium-mode-2').addEventListener('click', () => {
  setTimeout(() => {
    easyMediumHard('Medium')
    changeMode('medium')
    input.focus()
  }, 200);
})
document.querySelector('.js-hard-mode-2').addEventListener('click', () => {
  setTimeout(() => {
    easyMediumHard('Hard')
    changeMode('hard')
    input.focus()
  }, 200);
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

    typedData = [];
    startTime = null;
    finished = false;
    clearInterval(timer);

    remainingTime = TEST_DURATION;
    timeEl.textContent = remainingTime;

    input.innerHTML = "";
    input.focus();

    wpmEl.textContent = 0;
    accEl.textContent = '0.0%';
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

    typedData = [];
    startTime = null;
    finished = false;
    clearInterval(timer);

    remainingTime = TEST_DURATION;
    timeEl.textContent = remainingTime;

    input.innerHTML = "";
    input.focus();

    wpmEl.textContent = 0;
    accEl.textContent = '0.0%';
  }, 100);
  if(document.querySelector('.js-mode-value').textContent === 'Hard') {
      shuffleMode('hard')
  }else if(document.querySelector('.js-mode-value').textContent === 'Medium') {
    shuffleMode('medium')
  }else {
    shuffleMode('easy')
  }
})

  const textDisplay = document.querySelector('.js-text-to-type');
  input.value = '';

  input.addEventListener('input', () => {
    if (finished) return;

    if (!startTime) startTimer();

    typedData = [];
    const typedValue = input.value;
    
    for (let i = 0; i < typedValue.length; i++) {
      typedData.push({
        char: typedValue[i],
        expected: textDisplay.textContent[i],
        correct: typedValue[i] === textDisplay.textContent[i]
      });
    }

    renderText();
    updateStats();

    if (typedValue.length >= textDisplay.textContent.length) {
      finish();
    }
  })

  function renderText() {
    let html = '';
    for (let i = 0; i < textDisplay.textContent.length; i++) {
      if (typedData[i]) {
        html += `<span class="${typedData[i].correct ? 'correct' : 'incorrect'}">${textDisplay.textContent[i]}</span>`;
      } else if (i === typedData.length) {
        html += `<span class="current">${textDisplay.textContent[i]}</span>`;
      } else {
        html += `<span>${textDisplay.textContent[i]}</span>`;
      }

    }
    textDisplay.innerHTML = html;
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
    const timeElapsed = (TEST_DURATION - remainingTime) / 60;
    let rawWPM = timeElapsed > 0 ? (correctChars / 5) / timeElapsed : 0;
    let penalizedWPM = Math.max(0, rawWPM - (inCorrectChars * PENALTY_PER_MISTAKE));
    const wpm = Math.round(penalizedWPM);

    const acc = totalChars ? Math.round((correctChars / totalChars) * 100) : 0;
    wpmEl.textContent = wpm;
    accEl.textContent = acc + '%';

    // Store test result
    currentResult.wpm = wpm;
    currentResult.accuracy = acc;
    currentResult.correctChars = correctChars;
    currentResult.inCorrectChars = inCorrectChars;
    currentResult.time = TEST_DURATION - remainingTime
    localStorage.setItem('currentResult', JSON.stringify(currentResult));
  }


  // Finish test
  function finish() {
    changePageHighWPM()
    finished = true;
    clearInterval(timer);
  }

  // Restart
  restartBtn.addEventListener('click', () => {
    window.location.reload();
  });
  updatePersonalBest();

  function changePageHighWPM() {
    if(currentResult.wpm > savedResult.wpm && savedResult.wpm !== 0) {
      window.location.href = 'second-result.html';
    } else {
      window.location.href = 'first-result-test.html';
    }
  }

  input.addEventListener('paste', e => e.preventDefault())