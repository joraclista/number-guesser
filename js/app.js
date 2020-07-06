/**
 *   Define UI vars
 */


const DEFAULT_MIN_NUMBER = 0;
const DEFAULT_MAX_NUMBER = 9;
const DEFAULT_ATTEMPTS = 3;

let guessField;
let gameHeader;


const GAME_SETUP = {
    minNumber : DEFAULT_MIN_NUMBER,
    maxNumber : DEFAULT_MAX_NUMBER,
    attempts : DEFAULT_ATTEMPTS,
    randomValue : 0,
    setGuess : function () {
        this.randomValue = Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
    }
};

const GAME = {
    attemptsLeft : DEFAULT_ATTEMPTS,
    gameOver : false
};

const GAME_MESSAGES = {
    win : () =>`<h3>Congrats!!!! You won.</h3><h6>Correct is ${GAME_SETUP.randomValue}</h6>`,
    loose : () => `<h3>Game Over. </h3><h6>Correct number is ${GAME_SETUP.randomValue}.</h6><h6>Good luck next time!</h6>`,
    tryAgain : () => `<h6>Your Guess is Wrong. Try Again. </h6><h6>${GAME.attemptsLeft} attempts left.</h6>`,
    start: () => `<h6>Guess Number.</h6><h6>You have ${GAME.attemptsLeft} attempts left.</h6>`
};

init();

function init() {
    document.addEventListener("DOMContentLoaded", loadGame());
}


function loadGame() {

    document.getElementById("submit").addEventListener("click", checkGuess);
    document.getElementById("play").addEventListener("click", startGame);
    // Settings management
    document.getElementById("save").addEventListener("click", saveSettings);
    guessField = document.getElementById("guess");
    gameHeader = document.getElementById("gameHeader");
    startGame();
}

function startGame() {

    switchStartOverAndCheckButtons("REPLAY");
   // GAME_SETUP.set TODO fix attempts
    GAME_SETUP.setGuess();
    GAME.gameOver = false;
    GAME.attemptsLeft = GAME_SETUP.attempts;
    guessField.style.display = "block";
    gameHeader.style.display = "block";

    document.getElementById("settingsMinNumber").value = GAME_SETUP.minNumber;
    document.getElementById("settingsMaxNumber").value = GAME_SETUP.maxNumber;
    document.getElementById("settingsAttempts").value = GAME_SETUP.attempts;

    document.getElementById("minNumber").innerHTML = GAME_SETUP.minNumber;
    document.getElementById("maxNumber").innerHTML = GAME_SETUP.maxNumber;
    document.getElementById("message").innerHTML = GAME_MESSAGES.start();
}

function switchStartOverAndCheckButtons(status) {
    switch (status) {
        case "REPLAY":
            document.getElementById("play").style.display="none";
            document.getElementById("submit").style.display="block";
            break;
        default:
            document.getElementById("play").style.display="block";
            document.getElementById("submit").style.display="none";
    }

}


function checkGuess() {
    if (GAME.gameOver) {
        return;
    }
    console.log(`checkGuess: guess=${guessField.value}`);
    const win = Number(guessField.value) === GAME_SETUP.randomValue;
    guessField.value = '';
    GAME.attemptsLeft--;
    document.getElementById("message").innerHTML = win ?
        GAME_MESSAGES.win() :
        ( GAME.attemptsLeft === 0 ? GAME_MESSAGES.loose() : GAME_MESSAGES.tryAgain());

    if (GAME.attemptsLeft === 0 || win) {
        GAME.gameOver = true;
        gameHeader.style.display = "none";
        switchStartOverAndCheckButtons("START_OVER");
    }

}


function saveSettings() {
    console.log(`saveSettings: guess=${1}`);
    let settingsMinNumber = document.getElementById("settingsMinNumber");
    let settingsMaxNumber = document.getElementById("settingsMaxNumber");
    let settingsAttempts = document.getElementById("settingsAttempts");

    let _minNum = Number(settingsMinNumber.value);
    let _maxNum = Number(settingsMaxNumber.value);
    let _attemptsNum = Number(settingsAttempts.value);
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

    GAME_SETUP.minNumber = _minNum;
    GAME_SETUP.maxNumber = _maxNum;
    GAME_SETUP.attempts = _attemptsNum;

    startGame();


}