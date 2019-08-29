class Letter {
    constructor(letter) {
        this.letter = letter;
        this.placeHolder = '_';
        this.isLetterGuessed = false;
    }

    getLetter() {
        if (this.isLetterGuessed) {
            return this.letter;
        }else {
            return this.placeHolder;
        }
    }

    checkGuess(guess) {
        if (this.letter === guess) {
            this.isLetterGuessed = true;
        }
    }
}




module.exports = Letter;