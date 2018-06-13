var Word = require('./Word');
var wordsBank = require('./wordsbank');
var inquirer = require("inquirer");
var newWord;

//generate randon word from wordsBank.js
var generateWord = function () {
    randomWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    console.log('YOU GOT A NEW WORD!');
    //console.log(randomWord); //for testing only
    newWord = new Word(randomWord);
    //split the letters of the object word and display placeholders to user
    newWord.splitLetters().displayWord();
    takeUserGuess();
};

generateWord();

//Checks the word's status, prompts and takes the user guess and validate
function takeUserGuess() {
    if (newWord.status) {
        generateWord();
    } else {
        inquirer.prompt([{
            name: "guess",
            message: "Guess a letter?"
        }]).then(letter => {
            //Check user guess, track word status and display word to user
            newWord
            .takeChar(letter.guess)
            .trackStatus()
            .displayWord();
            takeUserGuess();
        });
    }
}