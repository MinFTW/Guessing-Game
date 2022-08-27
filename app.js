// GAME
function newGame() {
  winningNumber = generateWinningNumber(1, 100);
  playersGuess = null;
  pastGuesses = [];
  guessesLeft = 4;

  message.innerText = `Guess a number between 1 - 100`;
  subMessage.innerText = `Then press submit`;

  document.getElementById('playersGuess').value = '';
  document.getElementById('submit').disabled = false;
  document.getElementById('hint').disabled = false;
  document.getElementById('playersGuess').disabled = false;

  submitButton.style.backgroundColor = '#6d42c7';
  hintButton.style.backgroundColor = '#8aacff';
  guessCounter.innerText = 5;

  for (let i = 0; i < guessesLeft; i++) {
    let id = 'guess' + i.toString();
    let pastGuesses = document.getElementById(id);
    pastGuesses.innerText = '-';
  }
}

// HELPER FUNCTIONS
function generateWinningNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkPlayerInput() {
  let guess = document.getElementById('playersGuess').value;

  playersGuess = parseInt(guess);

  if (
    !Number.isInteger(playersGuess) ||
    playersGuess < 1 ||
    playersGuess > 100
  ) {
    message.innerText = `Not a valid guess. Please try again.`;
    subMessage.innerText = `Enter a number between 1 - 100`;
    return;
  }

  checkGuess();
  setPastGuess();
}

function checkGuess() {
  if (playersGuess === winningNumber) {
    message.innerText = `You Win! Winning Number was ${winningNumber}.`;
    subMessage.innerText = `Press reset to play again!`;
    return gameOver();
  } else if (guessesLeft <= 0) {
    message.innerText = `You Lose. Winning number was ${winningNumber}.`;
    subMessage.innerText = `Press reset to play again!`;
    guessCounter.innerText = 0;
    return gameOver();
  } else if (pastGuesses.includes(playersGuess)) {
    message.innerText = `You already guessed that number.`;
  } else {
    pastGuesses.push(playersGuess);
    guessCounter.innerText = guessesLeft--;
    return heatCheck();
  }

  return;
}

function heatCheck() {
  const difference = Math.abs(playersGuess - winningNumber);
  const isLower = playersGuess < winningNumber ? true : false;

  isLower
    ? (subMessage.innerText = `Guess higher!`)
    : (subMessage.innerText = `Guess lower!`);

  if (difference < 10) {
    message.innerText = `You're burning up!`;
  } else if (difference < 25) {
    message.innerText = `You're lukewarm.`;
  } else if (difference < 50) {
    message.innerText = `You're a bit chilly.`;
  } else if (difference < 100) {
    message.innerText = `You ice cold!`;
  }
}

function setPastGuess() {
  for (let i = 0; i < pastGuesses.length; i++) {
    let id = 'guess' + i.toString();
    let element = document.getElementById(id);
    element.innerText = pastGuesses[i].toString();
  }
}

function shuffleHints(array) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function provideHint() {
  let hintArray = [winningNumber];

  while (hintArray.length < 3) {
    let hint = generateWinningNumber(1, 100);

    !hintArray.includes(hint) &&
      !pastGuesses.includes(hint) &&
      hintArray.push(hint);
  }

  shuffleHints(hintArray);
  message.innerText = `The winning number is one of these: ${hintArray}.`;

  document.getElementById('hint').disabled = true;
  hintButton.style.backgroundColor = 'lightgray';
}

function gameOver() {
  document.getElementById('submit').disabled = true;
  document.getElementById('hint').disabled = true;
  document.getElementById('playersGuess').disabled = true;

  submitButton.style.backgroundColor = 'lightgray';
  hintButton.style.backgroundColor = 'lightgray';
}

// DOM ELEMENTS
const message = document.getElementById('message');
const subMessage = document.getElementById('subMessage');
const guessCounter = document.getElementById('guessesLeft');

// EVENT LISTENERS
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', checkPlayerInput);

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', newGame);

const hintButton = document.getElementById('hint');
hintButton.addEventListener('click', provideHint);

const inputField = document.getElementById('playersGuess');
inputField.addEventListener('focus', function () {
  document.getElementById('playersGuess').value = '';
});

inputField.addEventListener('change', function () {
  checkPlayerInput();
  document.getElementById('playersGuess').value = '';
});

// START GAME
newGame();
