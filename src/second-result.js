import { topScreenHTML } from "./share/home-header.js";

document.querySelector('header').innerHTML = topScreenHTML()

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
          <span>85</span>
        </div>
        <div>
          <span>Accuracy:</span>
          <span class="accuracy">90%</span>
        </div>
        <div>
          <span>Characters</span>
          <span>
            <span class="correct">120</span>
            / <span class="incorrect">5</span>
          </span>
        </div>
      </div>
      <button class="start-over">
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