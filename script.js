'use strict';

//SELECTING ELEMENTS
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//STARTING CONDITIONS
let scores;
let currentScore;
let activePlayer;
let playing;

function init() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");

}

//ROLLING THE DICE
btnRoll.addEventListener("click", function() {
    if (playing) {
        //Random
        const dice = Math.trunc(Math.random() * 6) + 1;
        //Display
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        //ROLLED 1
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function() {
    //Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    diceEl.classList.add("hidden");

    //Check if score is >= 100
    if (scores[activePlayer] >= 100) {
        //Finish the game
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

    } else {
        //Switch player
        switchPlayer();
    }
});

btnNew.addEventListener("click", init);