const cards = document.querySelectorAll('.memory-card');
let scoreNum = document.getElementById('scoreNum');
let time = document.getElementById('time');

let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let seconds = 0;
let firstCard, secondCard;

setInterval(timer, 1000);

function timer() {
  if (score < 6) {
    seconds++;
    time.innerHTML = seconds;
  }
}

function flipCard() {
  //lockboard to prevent bugs when speed clicking
  if (lockBoard) return;
  //no double click
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  // Condition ? true : false
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  updateScore();

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function updateScore() {
  score++;
  scoreNum.innerHTML = score;
}

//IIFE(Immediately Invoked Function Expression)
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
