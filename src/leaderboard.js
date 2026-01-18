import { topScreen } from './share/home-header.js';
import { updatePersonalBest, resultHistory } from './share/saved-result-store.js';

document.querySelector('header').innerHTML = topScreen()
updatePersonalBest();

resultHistory.sort((a, b) => b.wpm - a.wpm);

// Limit the leaderboard to top 10 results

let topResults = resultHistory.slice(0, 10);

// Limit the leaderboaed such the best top 10 will not have the same WPM

topResults = topResults.filter((result, index, self) =>
  index === self.findIndex((r) => r.accuracy === result.accuracy && r.wpm === result.wpm)
).slice(0, 10);


let tableBodyHTML = '';
topResults.forEach((result, index) => {
  tableBodyHTML += `
    <div class="table-row">
      <span class="rank">${index + 1}</span>
      <span class="wpm">${result.wpm}</span>
      <span class="accuracy">${result.accuracy}%</span>
      <span class="time-left">00:${result.time < 10 ? `0${result.time}` : result.time}</span>
    </div>
  `;
});

document.querySelector('.table-body').innerHTML = tableBodyHTML;

document.querySelector('.js-go-to-home').addEventListener('click', () => {
  window.location.href = `index.html`;
});