const errorMsg = document.getElementById('error-msg')
const inputEl = document.querySelector('.input-guess');
const guessButton = document.querySelector('.guessBtn')
const wrongLettersEl = document.querySelector('#wrong-letters')

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wrongLetters = [];
let wordStatus = null;

const phrases = [
  'a hot potato',
  'a penny for your thoughts',
  'actions speak louder than words',
  'add insult to injury',
  'at the drop of a hat',
  'back to the drawing board',
  'ball is in your court',
  'barking up the wrong tree',
  'be glad to see the back of',
  'blessing in disguise'
];

const messages = {
  win: "You won!!!",
  lost: "You lost!!!",
  used: "This is already used",
  isNumber: "This is not alphabet",
  notPresent: "Letter is not present"
}

inputEl.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleGuess(inputEl.value)
    inputEl.value = "";
  }

  if (event.keyCode >= 48 && event.keyCode <= 57) {
    showError(messages.isNumber)
    inputEl.value = ""
  }
});

function randomWord() {
  answer = phrases[Math.floor(Math.random() * phrases.length)];
  console.log('answer: ', answer)
}

function handleGuess(chosenLetter) {
  console.log("Letter chosen: ", chosenLetter);

  if (guessed.includes(chosenLetter)) {
    showError(messages.used)
  }

  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  if (answer.indexOf(chosenLetter) >= 0) {
    console.log('here')
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    console.log('there')
    if (!wrongLetters.includes(chosenLetter)) {
      console.log("THEEREE")
      wrongLetters.push(chosenLetter)
    }
    showError(messages.notPresent)
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
    displayWrongGuesses()
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function displayWrongGuesses() {
  console.log('wrong letters: ', wrongLetters)
  wrongLettersEl.innerHTML = `
  <span>${wrongLetters.join()}</span>
  `;
}

function checkIfGameWon() {
  if (wordStatus.split('_').join('').split(' ').join('') === answer.split(' ').join('')) {
    document.getElementById('keyboard').innerHTML = messages.win;
    inputEl.readOnly = true;
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = messages.lost;
    inputEl.readOnly = true;
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  inputEl.readOnly = false;
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  document.getElementById('keyboard').innerHTML = '';

}

function showError(msg) {
  errorMsg.classList.add('show')
  errorMsg.classList.add('error')
  errorMsg.innerHTML = `${msg}`;

  setTimeout(() => {
    errorMsg.classList.remove('error');
    errorMsg.classList.add('hide')
    errorMsg.innerHTML = ''
  }, 3000);
}


document.getElementById('maxWrong').innerHTML = maxWrong;

function letStart() {
  console.log('new start game')
  reset();
}

// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
}