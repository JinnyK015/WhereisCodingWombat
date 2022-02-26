import Popup from './popup.js'
import Field from './field.js'

const gameBtn = document.querySelector('.game__button')
const timerIndicator = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const CODINGWOMBAT_COUNT = 10
const AARDBARK_COUNT = 20
const GAME_DURATION_SEC = 20

let started = false
let score = 0
let timer = undefined

const gameFinishedPopup = new Popup()
gameFinishedPopup.setClickListener(()=>{
  startGame()
})
const gameField = new Field(CODINGWOMBAT_COUNT,AARDBARK_COUNT )
gameField.setClickListener(onItemClick)


console.log(score, CODINGWOMBAT_COUNT)

function onItemClick(item) {
  if (!started) {
    return
  }
  if (item === 'codingWombat') {
    console.log(score, CODINGWOMBAT_COUNT)
    score++
    updateScoreBoard()
    if (score === CODINGWOMBAT_COUNT) {
      finishGame(true)
    }
  } else if (item === 'aardbark') {
    finishGame(false)
  }
}

gameBtn.addEventListener('click', () => {
  started 
    ?stopGame()
    :startGame()
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
  gameFinishedPopup.showWithText(`Do you want to replay?`)
  //components function call similar
}

function finishGame(win) {
  started = false
  hideGameButton()
  stopGameTimer()
  gameFinishedPopup.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩')
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

function initGame() {
  score = 0
  gameScore.innerText = CODINGWOMBAT_COUNT
  gameField.init()
}

function updateScoreBoard() {
  gameScore.innerText = CODINGWOMBAT_COUNT - score
}
