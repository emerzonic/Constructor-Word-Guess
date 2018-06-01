//Letter constructor
function Letter(letter) {
    this.letter = letter;
    this.placeholder = '_';
    this.status = false;
}


//This method checks every letter in the word and return a letter or underscore
Letter.prototype.checkGuess = function () {
    if (this.status) {
        return this.letter;
    } else {
        return this.placeholder;
    }
};

//This method takes a letter as guess and checks it against each letter of the word
Letter.prototype.takeGuess = function (guess) {
    if (this.letter === guess) {
        console.log('\x1b[32m', 'CORRECT!');
        this.status = true;
    }
};

module.exports = Letter;