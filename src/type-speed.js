import { data } from './data/data.js';
import { topScreenHTML } from './share/home-header.js';
import { currentResult, savedResult, updatePersonalBest } from './share/saved-result-store.js';

try {
  renderTypeGrid()
} catch (error) {
  console.log('Uncaught error. Try again later.')
}

export function renderTypeGrid () {

  let headerHTML = ''
  let mainHTML = ''

  let shuffleEasy = data.easy.sort(() => Math.random() - 0.5);
  let shuffleMedium  = data.medium.sort(() => Math.random() - 0.5)
  let shuffleHard  = data.hard.sort(() => Math.random() - 0.5);
  let shuffleQuote  = data.quote.sort(() => Math.random() - 0.5);
  let shuffleLyrics  = data.lyrics.sort(() => Math.random() - 0.5);
  let inCorrectChars = 0;
  let typedData = []

  homeScreenHTML()
  function homeScreenHTML() {
    headerHTML = `
      <section>
        ${topScreenHTML()}
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
            <label for="easy" class="js-easy-mode js-easy-mode-2">
              <input type="radio" name="mode" id="easy" checked>
              <span>Easy</span>
            </label>
            <label for="medium" class="js-medium-mode js-medium-mode-2">
              <input type="radio" name="mode" id="medium">
              <span>Medium</span>
            </label>
            <label for="hard" class="js-hard-mode js-hard-mode-2">
              <input type="radio" name="mode" id="hard">
              <span>Hard</span>
            </label>
            <label for="quote" class="js-quote-mode js-quote-mode-2">
              <input type="radio" name="mode" id="quote">
              <span>Quote</span>
            </label>
            <label for="lyric" class="js-lyrics-mode js-lyrics-mode-2">
              <input type="radio" name="mode" id="lyrics">
              <span>Lyrics</span>
            </label>
            <label for="custom" class="js-custom-mode js-custom-mode-2">
              <input type="radio" name="mode" id="custom">
              <span>Custom</span>
            </label>
          </div>
          <div class="drop-down drop-down-time js-drop-down-time">
            <label for="sec-1" class="js-time-sec js-time-sec-2-1">
              <input type="radio" name="time" id="sec-1">
              <span>Time (15s)</span>
            </label>
            <label for="sec-2" class="js-time-sec js-time-sec-2-2">
              <input type="radio" name="time" id="sec-2">
              <span>Time (30s)</span>
            </label>
            <label for="sec" class="js-time-sec js-time-sec-2">
              <input type="radio" name="time" id="sec" checked>
              <span>Time (60s)</span>
            </label>
            <label for="sec-3" class="js-time-sec js-time-sec-2-3">
              <input type="radio" name="time" id="sec-3">
              <span>Time (120s)</span>
            </label>
            <label for="passage" class="medium passage js-time-passage js-time-passage-2">
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
  document.querySelector('main').innerHTML = mainHTML

  let input = document.querySelector('.text-area')
  let wpmEl = document.querySelector('.wpm-value');
  let accEl = document.querySelector('.accuracy-value')
  const timeEl = document.querySelector(".time-value");
  let restartBtn = document.querySelector(".js-restart-button");
  let startTime = null;
  let timer = null;
  let finished = false;
  let TEST_DURATION = 60; // default
  const PENALTY_PER_MISTAKE = 1;
  let custom = ''
  let newCustom = document.getElementById('custom-textarea')

  document.querySelector('.js-go').addEventListener('click', () => {
    setTimeout(() => {
      if (newCustom.value.length > 50) {
        custom = newCustom.value
        changeMode('custom')
        document.querySelector('.js-custom-container').style.display = 'none'
        input.focus()
      }else {
        alert('Text must be 50 characters or more')
      }
    }, 200);
  })


  function getRandomText(difficulty) {
    let text = ''
    if (difficulty === 'easy') {
      text = shuffleEasy[0]
    } else if (difficulty === 'medium') {
      text = shuffleMedium[0]
    } else if (difficulty === 'hard') {
      text = shuffleHard[0]
    } else if (difficulty === 'quote') {
      text = shuffleQuote[0]
    } else if (difficulty === 'lyrics') {
      text = shuffleLyrics[0]
    } else if (difficulty === 'custom') {
      text = custom
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
    if (difficulty === 'custom') {
      document.querySelector('.js-text-to-type').innerHTML = custom
      return
    }
    document.querySelector('.js-text-to-type').innerHTML = newText.text
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
    }else if(shuffleSum === 'shuffleLyrics') {
      shuffleSum = shuffleLyrics
    }else if(shuffleSum === 'shuffleQuote') {
      shuffleSum = shuffleQuote
    }
    document.querySelector('.js-text-to-type').innerHTML = shuffleSum[randomNumber].text
  }

  document.querySelector('.js-easy-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Easy');
      changeMode('easy')
      input.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-medium-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Medium')
      changeMode('medium')
      input.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-hard-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Hard')
      changeMode('hard')
      input.focus()
      document.querySelector('footer').style.marginTop = '11em';
    }, 200);
  })

  document.querySelector('.js-quote-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Quote')
      changeMode('quote')
      input.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })
  document.querySelector('.js-lyrics-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Lyrics')
      changeMode('lyrics')
      input.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })

  document.querySelector('.js-custom-mode-2').addEventListener('click', () => {
    setTimeout(() => {
      easyMediumHard('Custom')
      document.querySelector('.custom-container').style.display = 'flex'
      input.value = '';
      newCustom.focus()
      document.querySelector('footer').style.marginTop = '6em';
    }, 200);
  })

  function easyMediumHard(mode) {
    document.querySelector('.js-mode-value').innerHTML = mode
    document.querySelector('.js-drop-down-mode-2').style.display = 'none'
  }

  let startScreen = document.querySelector('.js-start-message')
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
    input.focus();
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
    input.focus();
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

      input.innerHTML = "";

      wpmEl.textContent = 0;
      accEl.textContent = '100%';

      document.getElementById('passage').checked = false
      document.getElementById('sec').checked = true
    }, 100);

    if(document.querySelector('.js-hard-mode').classList.contains('active')) {
      shuffleMode('hard')
    }else if(document.querySelector('.js-medium-mode').classList.contains('active')) {
      shuffleMode('medium')
    }else {
      shuffleMode('easy')
    }

    if(document.querySelector('.js-mode-value').textContent === 'Hard') {
      shuffleMode('hard')
    }else if(document.querySelector('.js-mode-value').textContent === 'Medium') {
      shuffleMode('medium')
    }else {
      shuffleMode('easy')
    }
  }


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
    let checkout
    typedData.forEach(d => {
      if(!d.correct) {
        checkout = d;
      }else {
        checkout = undefined
      }
      if (checkout && checkout !== undefined) {
        inCorrectChars++
      }
    })



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

    input.style.caretColor = 'transparent'

    timer = setInterval(() => {
      let timeLeft
      remainingTime--
      if (remainingTime > 60) {
        let timeLeftMin = remainingTime - 60
        timeLeft = `01:${timeLeftMin < 10 ? '0' + timeLeftMin : timeLeftMin} `
      } else {
        timeLeft = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`
      }
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
    let incorrectChageableChars = totalChars - correctChars

    const timeElapsed = (TEST_DURATION - remainingTime) / 60;
    let rawWPM = timeElapsed > 0 ? (correctChars / 5) / timeElapsed : 0;
    let penalizedWPM = Math.max(0, rawWPM - (incorrectChageableChars * PENALTY_PER_MISTAKE));
    const wpm = Math.round(penalizedWPM);

    const acc = totalChars ? Math.round((correctChars / totalChars) * 100) : 0;
    wpmEl.textContent = wpm;
    accEl.textContent = acc + '%';

    // Store test result
    currentResult.wpm = wpm;
    currentResult.accuracy = acc;
    currentResult.correctChars = correctChars;
    currentResult.inCorrectChars = inCorrectChars;
    currentResult.time = TEST_DURATION - remainingTime;

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
    newPassage()
    input.focus()
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

  input.addEventListener('click', e => {
    const len = input.value.length;
    input.setSelectionRange(len, len)
  })
}