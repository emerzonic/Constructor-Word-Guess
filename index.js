//TThis class controls the game by calling methods on the word and letter classes
class GameController {
    constructor() {
        this.newWord = '';
        this.score = 0;
    }

    // generate random word from wordsBank.js
    generateWord() {
        const wordsBank = require('./wordsbank');
        const Word = require('./Word');
        const randomWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
        console.log('YOU GOT A NEW WORD!');
        // console.log(randomWord); //for testing only
        this.newWord = new Word(randomWord);
        this.newWord
            .splitLetters()
            .displayWord();
        this.takeUserGuess();
    }

    //Checks the word's status, prompts and takes the user guess and validate
    takeUserGuess() {
        if (this.newWord.status) {
            this.score++;
            console.log(`Your score is: ${this.score}`);
            this.resetGame();
        } else {
            const inquirer = require("inquirer");
            inquirer.prompt([{
                name: "guess",
                message: "Guess a letter."
            }]).then(letter => {
                let guess = letter.guess.toLowerCase();
                //Check user guess, track word status and display word to user
                this.newWord
                    .takeChar(guess)
                    .trackStatus()
                    .displayWord();
                this.takeUserGuess();
            });
        }
    }

    //Ask the user to continue playing or not
    resetGame() {
        const confirm = require('inquirer-confirm');
        confirm('WOULD YOU LIKE TO PLAY AGAIN?')
            .then(() => {
                //if yes, generate new word
                this.generateWord();
            }, function cancelled() {
                console.log('THANKS FOR PLAYING!');
                return;
            });
    }
}



//start a new game
const game = new GameController();
game.generateWord();