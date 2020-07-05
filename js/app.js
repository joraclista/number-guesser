/**
 *   Define UI vars
 */


const DEFAULT_MIN_NUMBER = 0;
const DEFAULT_MAX_NUMBER = 9;
const DEFAULT_ATTEMPTS = 3;

const RANDOM = Math.floor(Math.random() * DEFAULT_MAX_NUMBER) + 1;


let minNumber = DEFAULT_MIN_NUMBER;
let maxNumber = DEFAULT_MAX_NUMBER;
let attempts = DEFAULT_ATTEMPTS;
let gameOver = false;
let randomValue = RANDOM;

init();

function init() {
    document.addEventListener("DOMContentLoaded", loadGame());
}

function setValues() {
    document.getElementById("minNumber").innerHTML = minNumber;
    document.getElementById("maxNumber").innerHTML = maxNumber;
    document.getElementById("message").innerHTML = `Guess Number. You have ${attempts} attempts left.`;
}

function loadGame() {
    setValues();

    document.getElementById("submit").addEventListener("click", checkGuess);

    // Settings management
    document.getElementById("save").addEventListener("click", saveSettings);

    document.getElementById("settingsMinNumber").value = minNumber;
    document.getElementById("settingsMaxNumber").value = maxNumber;
    document.getElementById("settingsAttempts").value = attempts;
}


function checkGuess() {
    if (gameOver) {
        return;
    }
    let guess = document.getElementById("guess");
    document.getElementById("guess").value = '';
    console.log(`checkGuess: guess=${guess.value}`);
    const win = Number(guess.value) === randomValue;
    attempts--;
    document.getElementById("message").innerHTML = win ? `Correct. You won` : `Your Guess is Wrong. Try Again. ${attempts} attempts left.`;
    if (attempts === 0 || win) {
        gameOver = true;
        guess.disabled = true;
    }

}


function saveSettings() {
    console.log(`saveSettings: guess=${1}`);
    let settingsMinNumber = document.getElementById("settingsMinNumber");
    let settingsMaxNumber = document.getElementById("settingsMaxNumber");
    let settingsAttempts = document.getElementById("settingsAttempts");

    _minNum = Number(settingsMinNumber.value);
    _maxNum = Number(settingsMaxNumber.value);
    _attemptsNum = Number(settingsAttempts.value);
    if (isNaN(_minNum)) {
        document.getElementById("settingsErrorMessage").innerHTML = 'Incorrect min number';
        return;
    }
    if (isNaN(_maxNum)) {
        document.getElementById("settingsErrorMessage").innerHTML = 'Incorrect max number';
        return;
    }
    if (isNaN(_attemptsNum)) {
        document.getElementById("settingsErrorMessage").innerHTML = 'Incorrect attempts number';
        return;
    }
    if (_maxNum <=_minNum) {
        document.getElementById("settingsErrorMessage").innerHTML = 'Max number should exceed min number';
        return;
    }

    minNumber = _minNum;
    maxNumber = _maxNum;
    attempts = _attemptsNum;
    randomValue = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    setValues();


}