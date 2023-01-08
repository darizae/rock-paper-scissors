// This script is a simple implementation of the game rock, paper, scissors. 
// The user can play against the computer by clicking a button and inputting their choice. 
// The script plays a number of rounds (specified by the numberOfRounds constant) and keeps track of the scores. 
// At the end of the game, the script declares the winner or if it is a tie.


// Get the button element and the two label elements for tracking game score
const button = document.getElementById('playButton');
const computerCountLabel = document.getElementById('computerPoints');
const playerCountLabel = document.getElementById('playerPoints');

// Add an event listener to the button element to execute the playGame function when clicked
button.addEventListener("click", function() {
    alert(playGame());
});

// An array of choice options for the game
const options = ["rock", "paper", "scissors"];

// The number of rounds in a game
const numberOfRounds = 5;

/**
 * Returns a random option from the options array
 * @return {string} A string representing a choice option
 */
function getComputerChoice() {
    return options[getRandomNumber()];
}

/**
 * Generates a random number between 0 and 2
 * @return {number} A random integer between 0 and 2
 */
function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

/**
 * Prompts the user to input a choice option
 * Makes the input lowercase
 * @return {string} A string representing a valid choice option
 */
function getPlayerChoice() {

    let input = "";

    // Continuously prompt the user for input until a valid choice is entered
    while (!checkInputValidity(input)) {
        input = prompt("Please enter an option: rock, paper or scissors").toLowerCase();
    }

    return input;
}   

/**
 * Check if the passed in string is a valid choice option
 * @param {string} str The string to check
 * @return {boolean} True if the string is a valid choice option, false otherwise
 */
function checkInputValidity(str) {
    return (options.includes(str)) ? true : false;
}

/**
 * Plays a single round of the game
 * @return {string} A string representing the result of the round: "computer" if the computer wins, 
 * "player" if the player wins, "tie" if it is a tie
 */
function playRound() {
    // Get the computer's and player's choice options
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice();

    // Alert the user of the computer's choice
    alert("Computer choice is: " + computerChoice);
    // Determine the winning choice option
    const winnerOption = determineWinnerOption(computerChoice, playerChoice);

    // Return the result of the round based on the winning choice option
    switch (winnerOption) {
        case computerChoice: 
            // The computer wins, alert the user and return "computer"
            alert(getLosingText(computerChoice, playerChoice));
            return "computer";
        case playerChoice: 
            // The player wins, alert the user and return "player"
            alert(getWinningText(computerChoice, playerChoice));
            return "player";
        default: 
            // It is a tie, alert the user and return "tie"
            alert("It's a tie!");
            return "tie";
    }
}

/**
 * Determines the winning choice option based on the two passed in choice options
 * @param {string} choice1 The first choice option
 * @param {string} choice2 The second choice option
 * @return {string} A string representing the winning choice option: "rock" if rock wins, "paper" if paper wins,
 * "scissors" if scissors wins, "tie" if it is a tie
 */
function determineWinnerOption(choice1, choice2) {
    switch (choice1 + "-" + choice2) {
        case "rock-scissors": return "rock";
        case "scissors-rock": return "rock";
        case "scissors-paper": return "scissors";
        case "paper-scissors": return "scissors";
        case "paper-rock": return "paper";
        case "rock-paper": return "paper";
        default: return "tie"; 
    }
}

/**
 * Returns a string representing the losing text for a round of the game
 * @param {string} computerChoice The choice option selected by the computer
 * @param {string} playerChoice The choice option selected by the player
 * @return {string} A string representing the losing text for the round
 */
function getLosingText(computerChoice, playerChoice) {
    return `You lose! ${computerChoice} beats ${playerChoice}`;
}

/**
 * Returns a string representing the winning text for a round of the game
 * @param {string} computerChoice The choice option selected by the computer
 * @param {string} playerChoice The choice option selected by the player
 * @return {string} A string representing the winning text for the round
 */
function getWinningText(computerChoice, playerChoice) {
    return `You win! ${playerChoice} beats ${computerChoice}`;
}

/**
 * Plays a game of rock, paper, scissors
 * @return {string} A string representing the result of the game: "You win!", "You lose!", or "It's a tie!"
 */
function playGame() {
    // Initialize the game score tracker
    let count = 0;
    // Reset the label text for the computer and player's scores
    computerCountLabel.textContent = "Computer Points: ";
    playerCountLabel.textContent = "Player Points: ";

    // Play a number of rounds equal to the numberOfRounds constant
    for (let i = 0; i < numberOfRounds; i++) {
        // Play a single round and get the result
        switch (playRound()) {
            case "computer": 
                // The computer wins, decrease the game score tracker and update the computer's score label
                count--; 
                computerCountLabel.textContent += "I";
                break;
            case "player": 
                // The player wins, increase the game score tracker and update the player's score label
                count++; 
                playerCountLabel.textContent += "I";
                break;
            default: break;
        }
    }

    // Determine the result of the game based on the final game score and return the appropriate string
    return determineWinner(count);
}

/**
 * Determines the result of the game based on the passed in game score
 * @param {number} count The game score
 * @return {string} A string representing the result of the game: "You win!", "You lose!", or "It's a tie!"
 */
function determineWinner(count) {
    switch (true) {
        case count > 0: return "You win!"; 
        case count < 0: return "You lose!";
        default: return "It's a tie!";
    }
}

