const cards = document.querySelectorAll(".memory-card");
const scoreDisplay = document.querySelector(".score");
const turnsDisplay = document.querySelector(".turns");
const totalScoreDisplay = document.querySelector(".totalScore");
const numOfCards = document.querySelector(".numOfCards");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const again = document.querySelector(".again");

shuffle(); //initiallize board

let hasFlippedCard = false;
let lockBoard = false; //lock the board so we can not reveal 3rd card if not a match
let firstCard, secondCard;
let score = 0; //initiallize score and display score = 0;
scoreDisplay.innerHTML = score;
let turns = 0; //how many times player clicks
turnsDisplay.innerHTML = turns;
let totalScore = 0;

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

// trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// let cardsdNum = cards.length;
// numOfCards.innerHTML = cardsdNum;

function reload() {
  location.reload();
}

function changeNumOfCards(par) {
  //

  if (par === "+") {
    cardsdNum += 2;
  } else if (par === "-") {
    cardsdNum -= 2;
  }
  numOfCards.innerHTML = cardsdNum;
}

function flipCard() {
  if (!lockBoard) {
    //if the board isnt locked -> unflip

    this.classList.add("flip"); //adds class flip when clicked

    if (!hasFlippedCard) {
      //first time clicking a card
      hasFlippedCard = true;
      firstCard = this;
    } else {
      //the second click
      hasFlippedCard = false;
      // secondCard = this.childNodes[1].alt; this is how we get the alt of each backphoto
      secondCard = this;

      checkMatch();
    }
  }
}

function checkMatch() {
  //check if cards match
  turns++;
  turnsDisplay.innerHTML = turns;
  if (firstCard.childNodes[1].alt === secondCard.childNodes[1].alt) {
    disableCards();
    checkWin();
  } else {
    //not a match
    unflipCards();
  }
}

function checkWin() {
  if (score === 6) {
    setTimeout(() => {
      // alert("You won")
      toggleModal();
      setTimeout(() => {
        again.style.opacity = "1";
      }, 400);
    }, 400);
  }
}

function disableCards() {
  //remove clicking again if they match
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  scoreDisplay.innerHTML = score;
  console.log("MATCH !!!!!!");
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    //timeout to see the back
    //if not a match flip the cards back
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 300);
}

function shuffle() {
  //they are flex items, using order property we give a random number to each card and then they get ordered again in a different way
  cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
}

function scoreCount() {
  totalScore = (100 * score) / turns;
  totalScoreDisplay.innerHTML = totalScore;
  alert("CONGRATULATION Your Score is ");
}

cards.forEach((card) => card.addEventListener("click", flipCard));
