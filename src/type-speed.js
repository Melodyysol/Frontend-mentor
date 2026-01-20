import { data } from './data/data.js';
import { topScreen } from './share/home-header.js';
import { currentResult, updatePersonalBest } from './share/saved-result-store.js';
import { calculateAccuracy, calculateWPM, shuffleDifficulty, finish } from './utils/calcAccWPM.js';
import { clickSound } from './utils/sound.js';

try {
  renderTypeGrid()
} catch (error) {
  console.log('Uncaught error detected. Try again later.', error);
}

export function renderTypeGrid () {

  let headerHTML = ''
  let mainHTML = ''

  let pools = {
    easy: shuffleDifficulty(data.easy),
    medium: shuffleDifficulty(data.medium),
    hard: shuffleDifficulty(data.hard),
    quote: shuffleDifficulty(data.quote),
    lyrics: shuffleDifficulty(data.lyrics)
  }
  let inCorrectChars = 0;
  let typedData = []

  homeScreenHTML()
  function homeScreenHTML() {
    headerHTML = `
      <section>
        ${topScreen()}
      </section>
      <section class="type-bottom-header type-header">
        <div class="wpm-content content">
          <span class="wpm-count information info">
            <span>WPM: </span>
            <span class="wpm-value">0</span>
          </span>
          <span class="accuracy-info information info">
            <span>Accuracy: </span>
            <span class="accuracy-value">100%</span>
          </span>
          <span class="information info">
            <span>Time: </span>
            <span class="time-value">01:00</span>
          </span>
        </div>
        <div class="dif-mode-content content">
          <span class="information info">
            <span>Difficulty: </span>
            <button type="button" class="general-button active easy js-easy-mode">Easy</button> 
            <button type="button" class="general-button js-medium-mode">Medium</button> 
            <button type="button" class="general-button js-hard-mode">Hard</button>
          </span>
          <span class="information info mode-info">
            <span>Mode: </span>
            <button type="button" class="general-button active timed js-time-sec">Timed (60s)</button> 
            <button type="button" class="general-button js-time-passage">Passage</button>
          </span>
        </div>
        <div class="dif-mode-content-small">
          <div class="easy-time-select">
            <div class="list js-list-mode">
              <span class="js-mode-value">Easy</span>
              <img class="arrow1" alt="arrow up" src="typing-speed-test-main/assets/images/icon-down-arrow.svg">
            </div>
            <div class="list js-list-time">
              <span class="js-time-value">Time (60s)</span>
              <img class="arrow2" alt="arrow down" src="typing-speed-test-main/assets/images/icon-down-arrow.svg">
            </div>
          </div>
          <div class="drop-down drop-down-mode js-drop-down-mode js-drop-down-mode-2">
            <label class="js-easy-mode js-easy-mode-2">
              <input type="radio" name="mode" id="easy" checked>
              <span>Easy</span>
            </label>
            <label class="js-medium-mode js-medium-mode-2">
              <input type="radio" name="mode" id="medium">
              <span>Medium</span>
            </label>
            <label class="js-hard-mode js-hard-mode-2">
              <input type="radio" name="mode" id="hard">
              <span>Hard</span>
            </label>
            <label class="js-quote-mode js-quote-mode-2">
              <input type="radio" name="mode" id="quote">
              <span>Quote</span>
            </label>
            <label class="js-lyrics-mode js-lyrics-mode-2">
              <input type="radio" name="mode" id="lyrics">
              <span>Lyrics</span>
            </label>
            <label class="js-custom-mode js-custom-mode-2">
              <input type="radio" name="mode" id="custom">
              <span>Custom</span>
            </label>
          </div>
          <div class="drop-down drop-down-time js-drop-down-time">
            <label class="js-time-sec js-time-sec-2-1">
              <input type="radio" name="time" id="sec-1">
              <span>Time (15s)</span>
            </label>
            <label class="js-time-sec js-time-sec-2-2">
              <input type="radio" name="time" id="sec-2">
              <span>Time (30s)</span>
            </label>
            <label class="js-time-sec js-time-sec-2">
              <input type="radio" name="time" id="sec" checked>
              <span>Time (60s)</span>
            </label>
            <label class="js-time-sec js-time-sec-2-3">
              <input type="radio" name="time" id="sec-3">
              <span>Time (120s)</span>
            </label>
            <label class="medium passage js-time-passage js-time-passage-2">
              <input type="radio" name="time" id="passage">
              <span>Passage</span>
            </label>
          </div>
        </div>
      </section>
    `

  document.querySelector('header').innerHTML = headerHTML
  }
  mainHTML = `
    <section>
      <div class="custom-container js-custom-container">
        <textarea maxlength="500" class="custom-textarea" id="custom-textarea" spellcheck="false" aria-labelledby="firstname"
          autocorrect="off" autocapitalize="off" autocomplete="off" autosuggest="off"
          placeholder="Paste or type text to be typed here. Max length of 500. Press Go to continue"></textarea>
        <button type="submit" class="general-button go js-go">Go</button>
      </div>
      <div class="start-message js-start-message">
        <button type="button" class="general-button start-button js-start-button">Start Typing Test</button>
        <p>Or click the test and start typing</p>
      </div>
      <div class="typing-container">
        <p class="text-to-type js-text-to-type"></p>
        <textarea class="text-area" spellcheck="false"
        autocorrect="off" autocapitalize="off" aria-labelledby="secondname"
        autocomplete="off" autosuggest="off"></textarea>
      </div>
    </section>
  `
  document.querySelector('main').innerHTML = mainHTML;
  const input = document.querySelector('.text-area');
  const textDisplay = document.querySelector('.js-text-to-type');
  const wpmEl = document.querySelector('.wpm-value');
  const accEl = document.querySelector('.accuracy-value')
  const timeEl = document.querySelector(".time-value");
  const restartBtn = document.querySelector(".js-restart-button");
  let startTime = null;
  let timer = null;
  let finished = false;
  let TEST_DURATION = 60; // default
  let custom = '';
  const newCustom = document.getElementById('custom-textarea')

  document.querySelector('.js-go').addEventListener('click', () => {
    setTimeout(() => {
      if (newCustom.value.length > 50) {
        custom = newCustom.value
        changeMode('custom')
        document.querySelector('.js-custom-container').style.display = 'none'
        clearScreen()
        input.focus()
      }else {
        alert('Text must be 50 characters or more')
      }
    }, 200);
  })


  function getRandomText(difficulty) {
    if (difficulty === 'custom') return custom;

    let pool = pools[difficulty]

    if (!pool || pool.length === 0) {
      pools[difficulty] = shuffleDifficulty(data[difficulty]);
      pool = pools[difficulty]
    }

    return pool.pop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  function initialize() {
    const defaultText = getRandomText('easy')
    textDisplay.innerHTML = defaultText.text
  }
  function changeMode(difficulty) {
    const newText = getRandomText(difficulty)
    textDisplay.innerHTML = difficulty === 'custom' ? custom : newText.text
  }


  let isDropDown1 = false
  document.querySelector('.js-list-mode').addEventListener('click', () => {
    setTimeout(() => {
      if (!isDropDown1) {
        document.querySelector('.js-drop-down-mode').style.display = 'flex'
        document.querySelector('.arrow1').style.transform = 'rotate(180deg)'
        isDropDown1 = true
      }else {
        document.querySelector('.js-drop-down-mode').style.display = 'none'
        document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
        isDropDown1 = false
      }
    }, 200);
  })

  document.querySelector('.js-easy-mode').addEventListener('click', () => {
    setTimeout(() => {
      document.querySelector('.js-easy-mode').classList.add('active')
      document.querySelector('.js-medium-mode').classList.remove('active')
      document.querySelector('.js-hard-mode').classList.remove('active')
      easyMediumHard('Easy');
      // changeMode('easy')
      newPassage()
    }, 200);
  })
  document.querySelector('.js-medium-mode').addEventListener('click', () => {
    setTimeout(() => {
      document.querySelector('.js-medium-mode').classList.add('active')
      document.querySelector('.js-easy-mode').classList.remove('active')
      document.querySelector('.js-hard-mode').classList.remove('active')
      easyMediumHard('Medium')
      newPassage()
    }, 200);
  })
  document.querySelector('.js-hard-mode').addEventListener('click', () => {
    setTimeout(() => {
      document.querySelector('.js-hard-mode').classList.add('active')
      document.querySelector('.js-easy-mode').classList.remove('active')
      document.querySelector('.js-medium-mode').classList.remove('active')
      easyMediumHard('Hard')
      newPassage()
    }, 200);
  })

  document.querySelector('.js-easy-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Easy');
      changeMode('easy')
      if(clearScreen) input.focus();
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-medium-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Medium')
      changeMode('medium')
      if(clearScreen) input.focus();
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-hard-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Hard')
      changeMode('hard')
      if(clearScreen) input.focus();
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      document.querySelector('footer').style.marginTop = '11em';
    }, 200);
  })

  document.querySelector('.js-quote-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Quote')
      changeMode('quote')
      if(clearScreen) input.focus();
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-lyrics-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Lyrics')
      changeMode('lyrics')
      if(clearScreen) input.focus();
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })

  document.querySelector('.js-custom-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Custom')
      document.querySelector('.custom-container').style.display = 'flex'
      input.value = '';
      document.querySelector('.arrow1').style.transform = 'rotate(0deg)'
      newCustom.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })

  function easyMediumHard(mode) {
    document.querySelector('.js-mode-value').innerHTML = mode
    document.querySelector('.js-drop-down-mode-2').style.display = 'none'
  }

  const startScreen = document.querySelector('.js-start-message')
  document.querySelector('.js-start-button').addEventListener('click', clearScreen)


  function clearScreen() {
    setTimeout(() => {
      startScreen.style.display = 'none'
      restartBtn.style.display = 'flex'
      document.querySelector('.text-to-type').style.filter = 'blur(0em)'
      // timeSetup()
      input.focus();;
    }, 400);
  }
  let isDropDown = false
  document.querySelector('.js-list-time').addEventListener('click', () => {
    setTimeout(() => {
      if(!isDropDown) {
        document.querySelector('.js-drop-down-time').style.display = 'flex'
        document.querySelector('.arrow2').style.transform = 'rotate(180deg)'
        isDropDown = true
      }else {
        document.querySelector('.js-drop-down-time').style.display = 'none'
        document.querySelector('.arrow2').style.transform = 'rotate(0deg)'
        isDropDown = false
      }
    }, 200);
  })
  function timedPassage(mode) {
    document.querySelector('.js-time-value').innerHTML = mode
    document.querySelector('.js-drop-down-time').style.display = 'none'
  }
  document.querySelector('.js-time-passage').addEventListener('click', () => {
    clearScreen()
    alert('Passage mode is coming soon!')
    newPassage()
    if(clearScreen) input.focus();
  })
  document.querySelector('.js-time-sec-2-1').addEventListener('click', () => {
    timedPassage('Time (15s)')
    TEST_DURATION = 15;
    timeEl.textContent = '00:15'
  })
  document.querySelector('.js-time-sec-2-2').addEventListener('click', () => {
    timedPassage('Time (30s)')
    TEST_DURATION = 30
    timeEl.textContent = '00:30'
  })
  document.querySelector('.js-time-sec-2').addEventListener('click', () => {
    timedPassage('Time (60s)')
    TEST_DURATION = 60
    timeEl.textContent = '01:00'
  })
  document.querySelector('.js-time-sec-2-3').addEventListener('click', () => {
    timedPassage('Time (120s)')
    TEST_DURATION = 120
    timeEl.textContent = '02:00'
  })

  document.querySelector('.js-time-passage-2').addEventListener('click', () => {
    clearScreen()
    timedPassage('Passage')
    alert('Passage mode is coming soon!')
    newPassage()
    if(clearScreen) input.focus();
  })

  function newPassage() {
    setTimeout(() => {
      timedPassage('Time (60s)')
      document.querySelector('.js-time-sec').classList.add('active')
      document.querySelector('.js-time-passage').classList.remove('active')

      typedData = [];
      startTime = null;
      finished = false;
      clearInterval(timer);

      remainingTime = TEST_DURATION;
      timeEl.textContent = '00:' + remainingTime;

      input.value = "";
      input.style.caretColor = 'var(--grey)'
      if(clearScreen) input.focus();

      wpmEl.textContent = 0;
      accEl.textContent = '100%';

      document.getElementById('passage').checked = false;
      document.getElementById('sec').checked = true;

      const mode = document.querySelector('.js-mode-value').textContent.toLowerCase();
      const newText = getRandomText(mode === 'custom' ? 'custom' : mode)
      textDisplay.innerHTML = mode === 'custom' ? custom : newText.text
    }, 100);
  }


  input.value = '';

  input.addEventListener('input', () => {
    if (finished) return;

    if (!startTime) startTimer();

    document.querySelector('.js-custom-container').style.display = 'none'

    typedData = [];
    const typedValue = input.value;
    
    for (let i = 0; i < typedValue.length; i++) {
      typedData.push({
        char: typedValue[i],
        expected: textDisplay.textContent[i],
        correct: typedValue[i] === textDisplay.textContent[i]
      });
    }
    let checkout
    typedData.forEach(d => {
      if(!d.correct) {
        checkout = d;
      }else {
        checkout = undefined;
      };
      if (checkout && checkout !== undefined) {
        inCorrectChars++;
      }
    });

    // Gives different sound on click wrong key

    let bringCorrect;
    for (let i = 0; i < typedData.length; i++) {
      const chars = typedData[i];
      bringCorrect = chars;
    }
    if (bringCorrect.correct) {
      clickSound(1200);
    }else if (!bringCorrect.correct) {
      clickSound (250);
    }




    renderText();
    updateStats();

    if (typedValue.length >= textDisplay.textContent.length) {
      finish(finished, timer);
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

    input.style.caretColor = 'transparent'

    timer = setInterval(() => {
      let timeLeft
      remainingTime--
      if (remainingTime > 60) {
        const timeLeftMin = remainingTime - 60
        timeLeft = `01:${timeLeftMin < 10 ? '0' + timeLeftMin : timeLeftMin} `
      } else {
        timeLeft = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`
      }
      timeEl.textContent = timeLeft;
      
      updateStats();

      if (remainingTime <= 5) {
        setInterval(() => clickSound(1200), 1000);
        if (remainingTime <= 1) {
          setInterval(() => clickSound(600, 0.08), 70);
        }
      }

      if(remainingTime <= 0) {
        finish(finished, timer)
      }
    }, 1000);
  }

  // Stats
  function updateStats() {
    const correctChars = typedData.filter(c => c.correct).length;
    const totalChars = typedData.length;
    const secondsElapsed = TEST_DURATION - remainingTime

    const wpm = calculateWPM(correctChars, secondsElapsed)

    const acc = calculateAccuracy(correctChars, totalChars)
    wpmEl.textContent = wpm;
    accEl.textContent = acc + '%';

    // Store test result
    currentResult.wpm = wpm;
    currentResult.accuracy = acc;
    currentResult.correctChars = correctChars;
    currentResult.inCorrectChars = inCorrectChars;
    currentResult.time = secondsElapsed;

    localStorage.setItem('currentResult', JSON.stringify(currentResult));
  }

  // Restart
  restartBtn.addEventListener('click', () => {
    newPassage()
    input.focus()
  });
  updatePersonalBest();

  input.addEventListener('paste', e => e.preventDefault())

  input.addEventListener('click', () => {
    const len = input.value.length;
    input.setSelectionRange(len, len)
  })
}