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
  }, 500);
}


document.querySelector('.js-list-mode').addEventListener('click', () => {
  document.querySelector('.js-drop-down-mode').style.display = 'flex'
  let easyMode = document.querySelector('.js-easy-mode')
  let mediumMode = document.querySelector('.js-medium-mode')
  let hardMode = document.querySelector('.js-hard-mode')
  let modeValue = document.querySelector('.js-mode-value')

  easyMode.addEventListener('click', () => {
    modeValue.innerHTML = 'Easy'
    document.querySelector('.js-drop-down-mode').style.display = 'none'
  })
  mediumMode.addEventListener('click', () => {
    modeValue.innerHTML = 'Medium'
    document.querySelector('.js-drop-down-mode').style.display = 'none'
  })
  hardMode.addEventListener('click', () => {
    modeValue.innerHTML = 'Hard'
    document.querySelector('.js-drop-down-mode').style.display = 'none'
  })
})
document.querySelector('.js-list-time').addEventListener('click', () => {
  document.querySelector('.js-drop-down-time').style.display = 'flex'
  let timeSec = document.querySelector('.js-time-sec')
  let timePassage = document.querySelector('.js-time-passage')
  let timeValue = document.querySelector('.js-time-value')
  timeSec.addEventListener('click', () => {
    timeValue.innerHTML = 'Time (60s)'
    document.querySelector('.js-drop-down-time').style.display = 'none'
  })
  timePassage.addEventListener('click', () => {
    timeValue.innerHTML = 'Passage';
    document.querySelector('.js-drop-down-time').style.display = 'none';
  })
})
