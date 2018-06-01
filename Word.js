var Letter = require('./Letter');
var letter = new Letter();

function Word(word) {
    this.word = word;
    this.splittedLetters = [];
    this.status = false;
}

Word.prototype.splitLetters = function () {
    var arr = this.word.split("");
    arr.forEach(value => {
        letter = new Letter(value);
        this.splittedLetters.push(letter);
    });
    return this;
};

Word.prototype.displayWord = function () {
    var displayWord = '';
    this.splittedLetters.forEach(obj => {
        return displayWord += " " + obj.checkGuess();
    });
    console.log(`\x1b[37m ${displayWord} \n`);
    if (!displayWord.match('_')) {
        this.status = true;
        console.log('You guessed it right!');
    }
};

Word.prototype.takeChar = function (guess) {
    this.splittedLetters.forEach(obj => {
        obj.takeGuess(guess);
    });
};

module.exports = Word;