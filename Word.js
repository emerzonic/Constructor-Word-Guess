var Letter = require('./Letter');
var letter = new Letter();

//Word constructor
function Word(word) {
    this.word = word;
    this.splittedLetters = [];
    this.status = false;
}


//This method takes a word and splits the letters into objects
Word.prototype.splitLetters = function () {
    var arr = this.word.split("");
    arr.forEach(value => {
        letter = new Letter(value);
        this.splittedLetters.push(letter);
    });
    return this;
};

//This method takes each letter objects and calls the Letter checkGuess method and returns a word.
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


//This method takes the user's guess(letter) and calls the Letter takeGuess method on it.
Word.prototype.takeChar = function (guess) {
    this.splittedLetters.forEach(obj => {
        obj.takeGuess(guess);
    });
};

module.exports = Word;