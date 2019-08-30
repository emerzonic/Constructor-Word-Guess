const Letter = require('./Letter');
const Logger = require('./Logger');

class Word {
    constructor(word) {
        this.word = word;
        this.letters = [];
        this.attempts = 0;
        this.displayWord = '';
    }

    getLettersFromWord() {
        [...this.word].reduce((letters, letter) => {
            letters.push(new Letter(letter));
            return letters;
        }, this.letters);
        return this;
    }

    setNumberOfAttempts() {
        this.attempts = this.word.length * 3;
        Logger.logMessage("\x1b[37m", `You have ${this.attempts} fail attempts to make on this word.`);
        return this;
    }

    outputWord() {
        this.setDisplayWord();
        Logger.logMessage(`\x1b[37m ${this.displayWord} \n`);
        return this;
    }

    setDisplayWord() {
        this.letters.reduce((letters, letter) => {
            letters.push(letter.getLetter());
            this.displayWord = letters.join(" ");
            return letters;
        }, []);
    }

    isAlreadyGuessed() {
        return !this.displayWord.match('_');
    }

    validateGuess(guess) {
        this.letters.forEach(letter => {
            letter.checkGuess(guess);
        });
        return this;
    }

    trackWordStatus() {
        if (this.isGuessCorrect()) {
            Logger.logMessage('\x1b[32m', 'CORRECT!');
        } else {
            Logger.logMessage('\x1b[31m', 'INCORRECT!');
            this.attempts--;
            this.displayNumberOfAttempsRemaining()
        }
        this.displayNumberOfLettersRemaining();
        return this;
    }

    isGuessCorrect() {
        const currentWordOutput = this.letters.reduce((letters, letter) => {
            letters.push(letter.getLetter());
            return letters;
        }, []);

        return this.displayWord !== currentWordOutput.join(" ");
    }

    displayNumberOfAttempsRemaining() {
        const displayText = this.getSingularOrPluralText('attempt', this.attempts);
        Logger.logMessage('\x1b[31m', `You have ${this.attempts} ${displayText} remaining.`);
    }

    displayNumberOfLettersRemaining() {
        const remainingLetters = [...this.displayWord].filter(letter => letter === "_");
        const remainingLettersToGuess = remainingLetters.length;
        const displayText = this.getSingularOrPluralText('letter', remainingLettersToGuess);
        Logger.logMessage('\x1b[32m', `...${remainingLettersToGuess} more ${displayText} remaining to guess it right.`);
    }

    getSingularOrPluralText(text, count){
        return count >= 2 ? `${text}s`: text;
    }
}


module.exports = Word;