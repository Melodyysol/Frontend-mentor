import { topScreenHTML } from "./share/home-header.js";
import { currentResult, updatePersonalBest } from "./share/saved-result-store.js";

document.querySelector('header').innerHTML = topScreenHTML()
updatePersonalBest();

function mainPageHTML() {
  let mainHTML = `
    <div class="pattern-confetti">
      <img alt="Pattern confetti" src="typing-speed-test-main/assets/images/pattern-confetti.svg">
    </div>
    <div class="middle-section">
      <div class="completed-icon">
        <img src="typing-speed-test-main/assets/images/icon-new-pb.svg" alt="Completed Icon">
      </div>
      <div class="base-encourage">
        <h2>High Score Smashed!</h2>
        <p>You are getting faster. That was incredible typing</p>
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
            <span style="color: hsl(140, 63%, 57%);">${currentResult.correctChars}</span>
            / <span style="color: hsl(25, 98%, 50%);">${currentResult.inCorrectChars}</span>
          </span>
        </div>
      </div>
      <footer>
        <button type="reset" class="start-over">
          <span>Beat This Score</span> 
          <span>
            <img src="typing-speed-test-main/assets/images/icon-restart-2.svg" alt="icon restart">
          </span>
        </button>
        <button type="submit" class="learderboard js-learderboard">LEADERBOARD</button>
      </footer>
    </div>
  `

  document.querySelector('main').innerHTML = mainHTML;

  document.querySelector('.start-over').addEventListener('click', () => window.location.href = `index.html`)

  document.querySelector('.js-learderboard').addEventListener('click', () => window.location.href = 'leaderboard.html')
}
mainPageHTML()