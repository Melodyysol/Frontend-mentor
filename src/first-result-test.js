import { topScreenHTML } from "./share/home-header.js";

document.querySelector('header').innerHTML = topScreenHTML()

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
          <span>85</span>
        </div>
        <div>
          <span>Accuracy:</span>
          <span class="accuracy">90%</span>
        </div>
        <div>
          <span>Characters</span>
          <span>
            <span class="correct">120/<span class="incorrect">5<span>
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