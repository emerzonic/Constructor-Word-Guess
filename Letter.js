function Letter(letter) {
    this.letter = letter;
    this.placeholder = '_';
    this.status = false;
}

Letter.prototype.checkGuess = function () {
    if (this.status) {
        return this.letter;
    } else {
        return this.placeholder;
    }
};

Letter.prototype.takeGuess = function (guess) {
    if (this.letter === guess) {
        console.log('\x1b[32m', 'CORRECT!');
        this.status = true;
    }
};

module.exports = Letter;