'use strict';

const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")
const btns = document.querySelectorAll(".btn")

// score
let score0 = document.getElementById("score--0");
let score1 = document.getElementById("score--1");

let currentScore0 = document.querySelector("#current--0")
let currentScore1 = document.querySelector("#current--1");

const dice = document.querySelector(".dice");

// starting conditions
let scores, currentScore, activePlayer, playing

// score0.textContent = 0
// score1.textContent = 0

const init = () =>{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.add("hidden");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
}

init()

const switchPlayer = () =>{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}


for(let i=0; i < btns.length; i++){
    btns[i].addEventListener("click", function(){
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
        if (btns[i].classList.contains("btn--roll")) {
            if(playing){
                dice.src = `http://127.0.0.1:5500/dice-${diceNumber}.png`;
                dice.classList.remove("hidden");
                if (diceNumber === 1) {
                // switch players
                switchPlayer();
                } else {
                currentScore += diceNumber;
                document.getElementById(`current--${activePlayer}`).textContent =
                    currentScore;
                }
            }
        }
        
        if (btns[i].classList.contains("btn--hold")) {
            if(playing){
                // add score to player active
                scores[activePlayer] += currentScore;
                document.getElementById(`score--${activePlayer}`).textContent =
                    scores[activePlayer];
                if (scores[activePlayer] >= 100) {
                    // Finish the game
                    playing = false;
                    dice.classList.add("hidden");
                    document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.add("player--winner");
                    document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.remove("player--active");
                } else {
                    // switch players
                    switchPlayer();
                }
            }
        }
        if (btns[i].classList.contains("btn--new")) {
            init();
        }
    })
}