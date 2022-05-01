// VARIABLES
let winningNumber = generateWinningNumber(1, 100);
let playersGuess = null;
let pastGuesses = [];
let guessesLeft = 4;

let message = document.getElementById('message');
let subMessage = document.getElementById('subMessage');
let guessCounter = document.getElementById('guessesLeft');


// HELPER FUNCTIONS
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
        
  for (let i = 0; i < 5; i++) {
    let idName = 'guess' + i.toString();  
    let element = document.getElementById(idName);
    element.innerText = '-';
  }
}


function generateWinningNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
    
  return Math.floor(Math.random() * (max-min + 1) + min);
}


function shuffle(array) {
  let m = array.length, t, i;

  while (m) {
      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }

  return array;
}


let difference = () => Math.abs(playersGuess - winningNumber);
let isLower = () => playersGuess < winningNumber ? true:false;


function getGuess() {
  let playersGuessRaw = document.getElementById('playersGuess').value;
 
  return parseInt(playersGuessRaw);
}


function playersGuessSubmission() {
  playersGuess = getGuess();

  if (!Number.isInteger(playersGuess) || playersGuess < 1 || playersGuess > 100) {
      message.innerText = `This is an invalid guess.`;
      subMessage.innerText = `Enter a number between 1 - 100`;
      throw (`This is an invalid guess.`);
  }

  checkGuess();
  setPreviousGuesses();
}


function checkGuess () {
  if (playersGuess === winningNumber) {
      message.innerText = `You Win! Winning Number was ${winningNumber}.`;
      subMessage.innerText = `Press reset to play again!`;
      gameOver();
      return;
    }
  else if (pastGuesses.length >= 4) {
      message.innerText = `You Lose. Winning number was ${winningNumber}.`;
      subMessage.innerText = `Press reset to play again!`;
      guessCounter.innerText = 0;  
      gameOver();
      return;
  }
  else if (pastGuesses.includes(playersGuess)) {
      message.innerText = `You already guessed that number.`;
  }
  else {
      pastGuesses.push(playersGuess);
        if(isLower()) {
           subMessage.innerText = `Guess higher!`;
        }
        else if (!isLower()) {
           subMessage.innerText = `Guess lower!`;
        }
        if (difference() < 10) {
           message.innerText = `You're burning up!`;
        }
        else if (difference() < 25) {
           message.innerText = `You're lukewarm.`;
        }
        else if (difference() < 50) {
           message.innerText = `You're a bit chilly.`;
        }
        else if (difference() < 100) {
           message.innerText = `You ice cold!`;
        }
      guessCounter.innerText = guessesLeft--;  
  }

  return;
}

 
function setPreviousGuesses() {
  for (let i = 0; i < pastGuesses.length; i++) {
      let idName = 'guess' + i.toString();  
      let element = document.getElementById(idName);
      element.innerText = pastGuesses[i].toString();
    }
}


function getHint() {    
  let hintArray = [winningNumber];

  while (hintArray.length < 3) {
      let hint = generateWinningNumber(1, 100);

      !hintArray.includes(hint) && !pastGuesses.includes(hint) && hintArray.push(hint);
  }
    
  shuffle(hintArray);
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


// EVENT LISTENERS
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', playersGuessSubmission);

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', newGame)

let hintButton = document.getElementById('hint');
hintButton.addEventListener('click', getHint);

let inputField = document.getElementById('playersGuess');
inputField.addEventListener('focus', function(){
    document.getElementById('playersGuess').value = '';
})

inputField.addEventListener('change', function(){
  playersGuessSubmission();
  document.getElementById('playersGuess').value = '';
})