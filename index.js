//bring Dom
const field = document.querySelector('.game__field')
const fieldRect = field.getBoundingClientRect()
const gameBtn = document.querySelector('.game__button')
const timerIndicator = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__message')
const popUpRefresh = document.querySelector('.pop-up__refresh')


const CODINGWOMBAT_SIZE = 100
const CODINGWOMBAT_COUNT = 10
const AARDBARK_COUNT = 20
const GAME_DURATION_SEC = 20

let started = false
let score = 0
let timer = undefined

field.addEventListener('click', onFieldClick)

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
})


popUpRefresh.addEventListener('click', () => {
  startGame()
  hidePopUp()
})

function startGame() {
  started = true
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()

}

function stopGame() {
  started = false
  stopGameTimer()
  hideGameButton()
  showPopUpWithText('REPLAY?')
}

function finishGame(win) {
  started = false
  hideGameButton()
  stopGameTimer()
  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩')
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas')
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
  gameBtn.style.visibility = 'visible'
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden'
}

function showTimerAndScore() {
  timerIndicator.style.visibility = 'visible'
  gameScore.style.visibility = 'visible'
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC
  updateTimerText(remainingTimeSec)
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer)
      finishGame(score === CODINGWOMBAT_COUNT)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}

function stopGameTimer() {
  clearInterval(timer)
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  timerIndicator.innerHTML = `0${minutes}:${seconds >= 10 ? seconds : `0${seconds}`}`
}


function showPopUpWithText(text) {
  popUpText.innerText = text
  popUp.classList.remove('pop-up--hide')
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide')
}

function initGame() {
  score = 0
  field.innerHTML = ''
  gameScore.innerText = CODINGWOMBAT_COUNT
  addItem('codingWombat', CODINGWOMBAT_COUNT, 'img/codingWombat.gif')
  addItem('aardbark', AARDBARK_COUNT, 'img/aardbark.gif')
}

function onFieldClick(event) {
  if (!started) {
    return
  }
  const target = event.target
  if (target.matches('.codingWombat')) {
    target.remove()
    score++
    updateScoreBoard()
    if (score === CODINGWOMBAT_COUNT) {
      finishGame(true)
    }
  } else if (target.matches('.aardbark')) {
    finishGame(false)
  }
}


function updateScoreBoard() {
  gameScore.innerText = CODINGWOMBAT_COUNT - score
}

function addItem(className, count, imgPath) {
  const x1 = 0
  const y1 = 0
  const x2 = fieldRect.width - CODINGWOMBAT_SIZE
  const y2 = fieldRect.height - CODINGWOMBAT_SIZE

  for (let i = 0 ; i < count ; i++) {
    const item = document.createElement('img')
    item.setAttribute('class', className)
    item.setAttribute('src', imgPath)
    item.style.position = 'absolute'
    const x = randomNumber(x1, x2)
    const y = randomNumber(y1, y2)
    item.style.left = `${x}px`
    item.style.top = `${y}px`
    field.appendChild(item)
  }
}
  

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
