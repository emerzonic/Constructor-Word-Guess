const Letter = require('./Letter');

//Word constructor
class Word {
    constructor(word) {
        this.word = word;
        this.splittedLetters = [];
        this.status = false;
        this.feedback = 0;
        this.attempts = 0;
    }

    //This method takes a word and splits the letters into objects
    splitLetters() {
        let arr = this.word.split("");
        arr.forEach(value => {
            let letter = new Letter(value);
            this.splittedLetters.push(letter);
        });
        return this;
    }

    //This method generates the number of attempts base on the length of the random word
    generateAttempts(){
        this.attempts = this.word.length * 3;
        console.log("\x1b[37m",`You have ${this.attempts} fail attempts to make on this word.`);
        return this;
    }


    //This method takes each letter object and calls the Letter checkGuess method and returns a word and status of user guesses left.
    displayWord() {
        var displayWord = '';
        this.splittedLetters.forEach(obj => {
            return displayWord += " " + obj.checkGuess();
        });
        console.log(`\x1b[37m ${displayWord} \n`);
        if (!displayWord.match('_')) {
            this.status = true;
            console.log('You guessed it right!');
        }
        return this;
    }

    //This method takes the user's guess(letter) and calls the Letter takeGuess method on it.
    takeChar(guess) {
        this.splittedLetters.forEach(obj => {
            obj.takeGuess(guess);
        });
        return this;
    }

    //This method tracks the status of the guesses remaining and updates if guess is wrong or correct
    trackStatus() {
        let track = 0;
        this.splittedLetters.forEach(obj => {
            if (obj.checkGuess() !== '_') {
                track++;
            }
        });
        if (this.feedback !== track) {
            console.log('\x1b[32m', 'CORRECT!');
            this.feedback = track;
        } else {
            this.attempts--;
            console.log('\x1b[31m', 'INCORRECT!');
            console.log('\x1b[31m',`You have ${this.attempts} ${this.attempts <= 1?'attempt':'attempts'} remaining.`);
        }
        let remaining = this.word.length - track;
        console.log('\x1b[32m',`...${Number(remaining)} more ${remaining <= 1?'letter':'letters'} to guess it right.`);
        return this;
    }
}


module.exports = Word;