var Word = require('./Word');
var wordsBank = require('./wordsbank');
var inquirer = require("inquirer");
var newWord;

//generate randon word from wordsBank.js
var generateWord = function () {
    randomWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    console.log(randomWord); //for testing only
    newWord = new Word(randomWord);
    console.log('NEW WORD!');
    //split the letters of the object word and display placeholder to user
    newWord.splitLetters().displayWord();
    takeUserGuess();
};

generateWord();


//This function checks the word's status, prompts and takes the user guess and validate
function takeUserGuess() {
    if (newWord.status) {
        generateWord();
    } else {
        inquirer.prompt([{
            name: "guess",
            message: "Guess a letter?"
        }]).then(function (letter) {
            newWord.takeChar(letter.guess);
            newWord.displayWord();
            takeUserGuess();
        });
    }
}