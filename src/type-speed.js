import data from './data/data.js';
import { topScreenHTML } from './share/home-header.js';

let homeHTML = ''
let headerHTML = ''
let mainHTML = ''

let shuffleEasy = data.easy.sort(() => Math.random() - 0.5);
let shuffleMedium  = data.medium.sort(() => Math.random() - 0.5)
let shuffleHard  = data.hard.sort(() => Math.random() - 0.5);

homeScreenHTML()
function homeScreenHTML() {
  headerHTML = `
    ${topScreenHTML()}
    <div class="type-bottom-header type-header">
      <div class="wpm-content content">
        <span class="wpm-count information info">
          <span>WPM: </span>
          <span class="wpm-value">46</span>
        </span>
        <span class="accuracy-info information info">
          <span>Accuracy: </span>
          <span class="accuracy-value">94%</span>
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
          <div class="js-easy-mode js-easy-mode-2">
            <input type="radio" name="mode" id="easy" checked>
            <label for="easy">Easy</label>
          </div>
          <div class="medium js-medium-mode js-medium-mode-2">
            <input type="radio" name="mode" id="medium">
            <label for="medium">Medium</label>
          </div>
          <div class="js-hard-mode js-hard-mode-2">
            <input type="radio" name="mode" id="hard">
            <label for="hard">Hard</label>
          </div>
        </div>
        <div class="drop-down drop-down-time js-drop-down-time">
          <div class="js-time-sec">
            <input type="radio" name="time" id="sec" checked>
            <label for="sec">Time (60s)</label>
          </div>
          <div class="medium passage js-time-passage">
            <input type="radio" name="time" id="passage">
            <label for="passage">Passage</label>
          </div>
        </div>
      </div>
    </div>
  `

document.querySelector('header').insertAdjacentHTML('afterbegin', headerHTML)
}
mainHTML = `
  <div class="start-message js-start-message">
    <button class="general-button start-button js-start-button">Start Typing Test</button>
    <p>Or click the test and start typing</p>
  </div>
  <div class="typing-container">
    <p class="text-to-type js-text-to-type">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <textarea class="text-area"></textarea>
  </div>
`
document.querySelector('main').insertAdjacentHTML('afterbegin', mainHTML)

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
    document.querySelector('.js-restart-button').style.display = 'flex'
    document.querySelector('.js-text-to-type').style.filter = 'blur(0px)'
    timeSetup()
  }, 400);
}

// document.body.addEventListener('keypress', clearScreen, once, true)


document.querySelector('.js-list-time').addEventListener('click', () => {
  document.querySelector('.js-drop-down-time').style.display = 'flex'
})
function timedPassage(mode) {
  document.querySelector('.js-time-value').innerHTML = mode
  document.querySelector('.js-drop-down-time').style.display = 'none'
}
document.querySelector('.js-time-sec').addEventListener('click', () => {
  timedPassage('Time (60s)')
})
document.querySelector('.js-time-passage').addEventListener('click', () => {
  timedPassage('Passage')

  setTimeout(() => {
    alert('Passage mode is coming soon!')
    document.querySelector('.js-time-sec').classList.add('active')
    document.querySelector('.js-time-passage').classList.remove('active')
    timedPassage('Time (60s)')
  }, 100);
  if(document.querySelector('.js-hard-mode').classList.contains('active')) {
      shuffleMode('hard')
  }else if(document.querySelector('.js-medium-mode').classList.contains('active')) {
    shuffleMode('medium')
  }else {
    shuffleMode('easy')
  }
})

let timerStarted = false;
let timerInterval;

function timeSetup() {
  let timeValue = document.querySelector('.js-time-value').innerHTML
  if (timeValue === 'Time (60s)') {
    timerStarted = false;
    document.querySelector('.text-area').addEventListener('input', handleTyping);
    setupRestart();
  } else if (timeValue === 'Passage') {
    // set passage mode
  }
}

function handleTyping() {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  // Add typing logic here (e.g., check input against text)
}

function startTimer() {
  let time = 60;
  timerInterval = setInterval(() => {
    time--;
    document.querySelector('.time-value').innerHTML = `00:${time < 10 ? '0' + time : time}`;
    if (time === 0) {
      clearInterval(timerInterval);
      // end the game logic here
    }
  }, 1000);
}

function setupRestart() {
  document.querySelector('.js-restart-button').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerStarted = false;
    document.querySelector('.time-value').innerHTML = '01:00';
    document.querySelector('.text-area').value = '';
    if(document.querySelector('.js-hard-mode').classList.contains('active')) {
      shuffleMode('hard')
    }else if(document.querySelector('.js-medium-mode').classList.contains('active')) {
      shuffleMode('medium')
    }else {
      shuffleMode('easy')
    }
  })
}


