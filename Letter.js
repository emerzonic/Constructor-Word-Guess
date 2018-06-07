//Letter constructor
class Letter {
    constructor(letter) {
        this.letter = letter;
        this.placeholder = '_';
        this.status = false;
    }

    //This method checks every letter in the word and returns a letter or underscore
    checkGuess() {
        if (this.status) {
            return this.letter;
        }
        else {
            return this.placeholder;
        }
    }

    //This method takes a letter as guess and checks it against each letter of the word
    takeGuess(guess) {
        if (this.letter === guess) {
            this.status = true;
            this.tracker = 1;  
        }
    }
}




module.exports = Letter;