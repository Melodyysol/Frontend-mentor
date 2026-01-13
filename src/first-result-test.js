import { topScreenHTML } from "./share/home-header.js";
import { savedResult } from "./share/saved-result-store.js";

console.log(savedResult.inCorrectChars);


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
          <span>${savedResult.wpm}</span>
        </div>
        <div>
          <span>Accuracy:</span>
          <span class="accuracy">${savedResult.accuracy}%</span>
        </div>
        <div>
          <span>Characters</span>
          <span>
            <span class="correct" style="color: hsl(140, 63%, 57%); font-size: 16px;">
              ${savedResult.correctChars}
            </span>
            /
            <span class="incorrect">${savedResult.inCorrectChars}</span>
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

document.querySelector('.start-over').addEventListener('click', () => {
  window.location.href = 'index.html';
})