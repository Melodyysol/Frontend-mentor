import { currentResult } from "./share/saved-result-store.js";


function topScreen() {
  let topScreenHTML = `
    <div class="type-top-header type-header">
      <div>
        <img src="typing-speed-test-main/assets/images/logo-large.svg" alt="Logo large" class="typing-logo-large">
        <img src="typing-speed-test-main/assets/images/logo-small.svg" alt="Logo small" class="typing-logo-small">
      </div>
      <div class="personal-best-container">
        <img src="typing-speed-test-main/assets/images/icon-personal-best.svg" alt="Icon personal best" class="cup">
        <span class="personal-best information">Personal best: <span class="personal-best-value">${currentResult.wpm} WPM</span></span>
        <span class="personal-best information personal-best-2">Best: <span class="personal-best-value">${currentResult.wpm} WPM</span></span>
      </div>
    </div>
  `
  document.querySelector('header').innerHTML = topScreenHTML
}
topScreen()

function mainPageHTML() {
  let mainHTML = `
    <div class="star-one">
      <img alt="star one" src="typing-speed-test-main/assets/images/pattern-star-2.svg">
    </div>
    <div class="star-two">
      <img alt="star one" src="typing-speed-test-main/assets/images/pattern-star-1.svg">
    </div>
    <div class="middle-section">
      <div class="completed-icon-container">
        <div class="completed-icon">
          <img src="typing-speed-test-main/assets/images/icon-completed.svg" alt="Completed Icon">
        </div>
      </div>
      <div class="base-encourage">
        <h2>Baseline Established!</h2>
        <p>You've set the bar. Now the real challenge begins-time to beat it.</p>
      </div>
      <div class="wpm-info">
        <div>
          <span>WPM:</span>
          <span>${currentResult.wpm}</span>
        </div>
        <div>
          <span>Accuracy:</span>
          <span class="accuracy">${currentResult.accuracy}%</span>
        </div>
        <div>
          <span>Characters</span>
          <span>
            <span style="color: hsl(140, 63%, 57%); font-size: 1rem;">
              ${currentResult.correctChars}
            </span>
            /
            <span style="color: hsl(354, 63%, 57%); font-size: 1rem;">
              ${currentResult.inCorrectChars}
            </span>
          </span>
        </div>
      </div>
      <button type="reset" class="start-over">
        <span>Beat This Score</span> 
        <span>
          <img src="typing-speed-test-main/assets/images/icon-restart.svg" alt="icon restart">
        </span>
      </button>
    </div>
  `

  document.querySelector('main').innerHTML = mainHTML;
}
mainPageHTML()

document.querySelector('.start-over').addEventListener('click', () => {
  window.location.href = 'index.html';
})