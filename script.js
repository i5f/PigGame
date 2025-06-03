// "use strict";

// const player0El = document.querySelector(".player--0");
// const player1El = document.querySelector(".player--1");
// const score0El = document.getElementById("score--0");
// const score1El = document.getElementById("score--1");
// const diceEl = document.querySelector(".dice");
// const btnNew = document.querySelector(".btn--new");
// const btnRoll = document.querySelector(".btn--roll");
// const btnHold = document.querySelector(".btn--hold");
// const current0El = document.getElementById("current--0");
// const current1El = document.getElementById("current--1");

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// function switchPlayer() {
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   player0El.classList.toggle("player--active");
//   player1El.classList.toggle("player--active");
// }

// btnRoll.addEventListener("click", function () {
//   let diceRoll = Math.trunc(Math.random() * 6) + 1;

//   diceEl.classList.remove("hidden");
//   diceEl.src = `dice-${diceRoll}.png`;

//   if (diceRoll !== 1) {
//     currentScore += diceRoll;
//     document.getElementById(`current--${activePlayer}`).textContent =
//       currentScore;
//   } else {
//     currentScore = 0;
//     document.getElementById(`current--${activePlayer}`).textContent = 0;
//     switchPlayer();
//   }
// });

// btnHold.addEventListener("click", function () {
//   activePlayer === 0
//   ? score0El.textContent = Number(score0El.textContent) += scores[0]
//   : score1El.textContent = Number(score1El.textContent) += scores[1];
//   switchPlayer();
// });

"use strict";

// related player's ui half
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// score of the related player
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
// TO-DO: delete if unused later
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
// dice element
const diceEl = document.querySelector(".dice");
// buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  isPlaying = true;

function gameInitializer() {
  scores = [0, 0];
  currentScore = 0;
  isPlaying = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add("hidden");
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains("player--winner")
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }
  activePlayer = 0;
  if (!player0El.classList.contains("player--active")) {
    player0El.classList.add("player--active");
  }
  if (player1El.classList.contains("player--active")) {
    player1El.classList.remove("player--active");
  }
}

gameInitializer();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer ? 0 : 1;
}

function winningGame() {
  isPlaying = false;
  diceEl.classList.remove("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
}

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll === 1) {
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      winningGame();
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", gameInitializer);
