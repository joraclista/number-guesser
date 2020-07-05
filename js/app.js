/**
 *   Define UI vars
 */


const DEFAULT_MIN_NUMBER = 0;
const DEFAULT_MAX_NUMBER = 9;
const DEFAULT_ATTEMPTS = 3;

let guessField;


const GAME_SETUP = {
    minNumber : DEFAULT_MIN_NUMBER,
    maxNumber : DEFAULT_MAX_NUMBER,
    attempts : DEFAULT_ATTEMPTS,
    gameOver : false,
    randomValue : 0,
    setGuess : function () {
        this.randomValue = Math.floor(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber;
    }
};

const GAME_MESSAGES = {
    win : () =>`You won. Correct is ${GAME_SETUP.randomValue}`,
    loose : () => `Game Over. Correct number is ${GAME_SETUP.randomValue}. Good luck next time!`,
    tryAgain : () => `Your Guess is Wrong. Try Again. ${GAME_SETUP.attempts} attempts left.`,
    start: () => `Guess Number. You have ${GAME_SETUP.attempts} attempts left.`
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
    startGame();
}

function startGame() {

    document.getElementById("settingsMinNumber").value = GAME_SETUP.minNumber;
    document.getElementById("settingsMaxNumber").value = GAME_SETUP.maxNumber;
    document.getElementById("settingsAttempts").value = GAME_SETUP.attempts;

    document.getElementById("minNumber").innerHTML = GAME_SETUP.minNumber;
    document.getElementById("maxNumber").innerHTML = GAME_SETUP.maxNumber;
    document.getElementById("message").innerHTML = GAME_MESSAGES.start();

    switchStartOverAndCheckButtons("REPLAY");
   // GAME_SETUP.set TODO fix attempts
    GAME_SETUP.setGuess();
    GAME_SETUP.gameOver = false;
    guessField.disabled = false;
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
    if (GAME_SETUP.gameOver) {
        return;
    }
    console.log(`checkGuess: guess=${guessField.value}`);
    const win = Number(guessField.value) === GAME_SETUP.randomValue;
    guessField.value = '';
    GAME_SETUP.attempts--;
    document.getElementById("message").innerHTML = win ?
        GAME_MESSAGES.win() :
        (GAME_SETUP.attempts === 0 ? GAME_MESSAGES.loose() : GAME_MESSAGES.tryAgain());

    if (GAME_SETUP.attempts === 0 || win) {
        GAME_SETUP.gameOver = true;
        guessField.disabled = true;
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