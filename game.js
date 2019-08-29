const words = require('./assets');
const Logger = require('./Logger');
const Word = require('./Word');
const confirm = require('inquirer-confirm');
const inquirer = require("inquirer");

class Game {
    constructor() {
        this.newWord = null;
        this.score = 0;
        this.guessedLetters = [];
    }

    start() {
        this.generateWord();
        this.newWord
            .getLettersFromWord()
            .setNumberOfAttempts()
            .outputWord();
        this.takeUserGuess();
    }

    generateWord() {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        Logger.logMessage('YOU GOT A NEW WORD!');
        // Logger.logMessage(randomWord); //for testing only
        this.newWord = new Word('ch');
    }

    takeUserGuess() {
        const params = this.getParams();
        inquirer.prompt(params).then(input => {
            const guess = input.guess;
            this.checkIfInputHasAlreadyBeenGuess(guess)
            this.addGuessToAlreadyGuessLetters(guess);
            this.playGame(guess);
        });
    }

    playGame(guess) {
        this.newWord
            .validateGuess(guess)
            .trackWordStatus()
            .outputWord();
        this.checKGameStatus();
    }

    getParams() {
        return [{
            name: "guess",
            message: "Guess a letter.",
            validate: this.validateUserInput
        }];
    }

    validateUserInput(userInput) {
        return /^[a-zA-Z]*$/g.test(userInput);
    }

    checkIfInputHasAlreadyBeenGuess(guess) {
        if (this.guessIsAlreayInGuessedLetters(guess)) {
            Logger.logMessage(`You have already guessed ${guess}. Try again`);
            Logger.logMessage(`Letters already guessed: ${this.guessedLetters}`);
            return this.takeUserGuess();
        }
    }

    guessIsAlreayInGuessedLetters(guess) {
        return this.guessedLetters.includes(guess.toLowerCase())
    }

    addGuessToAlreadyGuessLetters(guess) {
        this.guessedLetters.push(guess);
    }

    checKGameStatus() {
        if (this.newWord.isAlreadyGuessed()) {
            this.increaseScore();
            this.resetGuessLetters();
            this.start();
        } else {
            if (this.newWord.attempts <= 0) {
                this.displayGameOver();
                return this.resetGame();
            }
            this.takeUserGuess();
        }
    }

    resetGuessLetters() {
        this.guessedLetters = [];
    }

    displayGameOver() {
        Logger.logMessage('\x1b[31m', 'G A M E  O V E R !');
        Logger.logMessage("\x1b[37m", `The word was ${this.newWord.word}` + '\n');
    }

    increaseScore() {
        this.score++;
        Logger.logMessage(`Your guessed it right!`);
        Logger.logMessage(`Your score is: ${this.score}`);
    }

    resetGame() {
        confirm('WOULD YOU LIKE TO PLAY AGAIN?')
            .then(() => {
                this.resetGuessLetters()
                this.start();
            }, function cancelled() {
                Logger.logMessage('THANKS FOR PLAYING!');
                return;
            });
    }
}

module.exports = Game;