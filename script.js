'use strict';

const dice = document.querySelector(".dice");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const btnReset = document.querySelector(".reset");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const currentScore1 = document.getElementById("currentScore1");
const currentScore2 = document.getElementById("currentScore2");
const winner = document.querySelector(".winner");
const playerLabel = document.querySelector(".playerLabel");

let player1Score = 0;
let player2Score = 0;
let currentScore = 0;

function change() {
    if (player1.classList.contains("active")) {
        player2.classList.add("active");
        player1.classList.remove("active");
    }
    else if (player2.classList.contains("active")) {
        player1.classList.add("active");
        player2.classList.remove("active");
    }
}

function displayCurrentScore() {
    if (player1.classList.contains("active")) {
        currentScore1.textContent = currentScore;
    }
    else if (player2.classList.contains("active")) {
        currentScore2.textContent = currentScore;
    }
}

dice.classList.add("hidden");

btnRoll.addEventListener("click", function () {
    // Generate a random dice roll
    const rolled = Math.trunc(Math.random() * 6) + 1;
    // Display the dice roll
    dice.classList.remove("hidden");
    dice.src = `dice-${rolled}.png`;
    // Check if the rolled dice is 1, If true, switch the player. If not add the dice number to the current score
    if (rolled === 1) {
        currentScore = 0;
        displayCurrentScore();
        change();
    }
    else if (rolled !== 1) {
        currentScore += rolled;
        displayCurrentScore();
    }
})

btnHold.addEventListener("click", function () {
    // Add current Score to the total score
    if (player1.classList.contains("active")) {
        player1Score += currentScore
        score1.textContent = player1Score;
    }
    else {
        player2Score += currentScore
        score2.textContent = player2Score;
    }
    currentScore = 0;
    displayCurrentScore();
    
    // If score >= 50, current player wins. If not, switch the player
    if (player1Score >= 50 || player2Score >= 50) {
        if (player1.classList.contains("active")) {
            playerLabel.textContent = "1";
        }
        else if (player2.classList.contains("active")){
            playerLabel.textContent = "2";
        }
        winner.classList.remove("hidden");
        dice.classList.add("hidden");
        player1.classList.remove("active");
        player2.classList.remove("active");
        document.querySelector(".roll").disabled = true;
        document.querySelector(".hold").disabled = true;
    }
    else {
        change();
    }
})

btnReset.addEventListener("click", function () {
    document.querySelector(".roll").disabled = false;
    document.querySelector(".hold").disabled = false;
    player1Score = 0;
    player2Score = 0;
    currentScore = 0;
    score1.textContent = player1Score;
    score2.textContent = player2Score;
    currentScore1.textContent = currentScore;
    currentScore2.textContent = currentScore;
    player1.classList.add("active");
    player2.classList.remove("active");
    winner.classList.add("hidden");
    dice.classList.add("hidden");
})
