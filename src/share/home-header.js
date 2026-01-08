export function topScreenHTML() {
  let topScreenHTML = `
    <div class="type-top-header type-header">
      <div>
        <img src="typing-speed-test-main/assets/images/logo-large.svg" alt="Logo large" class="typing-logo-large">
        <img src="typing-speed-test-main/assets/images/logo-small.svg" alt="Logo small" class="typing-logo-small">
      </div>
      <div class="personal-best-container">
        <img src="typing-speed-test-main/assets/images/icon-personal-best.svg" alt="Icon personal best" class="cup">
        <span class="personal-best information">Personal best: <span class="personal-best-value">92 WPM</span></span>
        <span class="personal-best information personal-best-2">Best: <span class="personal-best-value">92 WPM</span></span>
      </div>
    </div>
  `
  return topScreenHTML
}