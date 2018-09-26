const words = require('./assets');

//This class controls the game by calling methods on the word and letter classes
class Game {
    constructor() {
        this.newWord = '';
        this.score = 0;
        this.guessedLetters = [];
    }

    // generate random word from wordsBank.js
    generateWord() {
        const Word = require('./Word');
        const randomWord = words[Math.floor(Math.random() * words.length)];
        console.log('YOU GOT A NEW WORD!');
        // console.log(randomWord); //for testing only
        this.newWord = new Word(randomWord);
        this.newWord
            .splitLetters()
            .generateAttempts()
            .displayWord();
        this.takeUserGuess();
    }

    //validate that the user only enter a letter (A-Z)
    validateUserInput(guess) {
        let input = guess.toLowerCase(guess);
        return /^[a-zA-Z]*$/g.test(input);
    }

    //Checks if all the letters the word have been guess and also the player fail attempts remaining.  
    checKWordStatus() {
        if (this.newWord.status) {
            this.score++;
            console.log(`Your score is: ${this.score}`);
            this.guessedLetters = [];
            this.generateWord();
        } else {
            if (this.newWord.attempts <= 0) {
                console.log('\x1b[31m', 'G A M E  O V E R !');
                console.log("\x1b[37m",`The word was ${this.newWord.word}` + '\n');
                return this.resetGame();
            }
            this.takeUserGuess();
        }
    }

    //This method takes the user guess and validate
    takeUserGuess() {
        const inquirer = require("inquirer");
        inquirer.prompt([{
            name: "guess",
            message: "Guess a letter.",
            validate: this.validateUserInput
        }]).then(letter => {
            let guess = letter.guess.toLowerCase();
            if (this.guessedLetters.includes(guess)) {
                console.log(`You have already guessed ${guess}. Try again`);
                console.log(`Letters already guessed: ${this.guessedLetters}`);
                return this.takeUserGuess();
            }
            this.guessedLetters.push(guess);
            //Check user guess, track word status and display word to user
            this.newWord
                .takeChar(guess)
                .trackStatus()
                .displayWord();
            this.checKWordStatus();
        });
    }


    //Ask the user to continue playing or not after game is over
    resetGame() {
        const confirm = require('inquirer-confirm');
        confirm('WOULD YOU LIKE TO PLAY AGAIN?')
            .then(() => {
                //if yes, empty the letters already guessed on last game generate new word
                this.guessedLetters = [];
                this.generateWord();
            }, function cancelled() {
                console.log('THANKS FOR PLAYING!');
                return;
            });
    }
}



//start a new game
const game = new Game();
game.generateWord();