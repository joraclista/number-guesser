/**
 *   Define UI vars
 */


const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const RANDOM = Math.floor(Math.random() * MAX_NUMBER) + 1;
let attempts = 3;
let gameOver = false;

init();

function init() {
    document.addEventListener("DOMContentLoaded", loadGame());

}


function loadGame() {
    document.getElementById("minNumber").innerHTML = MIN_NUMBER;
    document.getElementById("maxNumber").innerHTML = MAX_NUMBER;
    document.getElementById("submit").addEventListener("click", checkGuess);
    message = `Guess Number. You have ${attempts} attempts left.`;
    document.getElementById("message").innerHTML = message;
}


function checkGuess() {
    if (gameOver) {
        return;
    }
    let guess = document.getElementById("guess");
    console.log(`checkGuess: guess=${guess.value}`);
    const win = guess.value == RANDOM;
    attempts--;
    document.getElementById("message").innerHTML = win ? `Correct. You won` : `Your Guess is Wrong. Try Again. ${attempts} attempts left.`;
    if (attempts === 0 || win) {
        gameOver = true;
        guess.disabled = true;
    }

}
