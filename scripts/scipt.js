const button = document.getElementById('playButton');

button.addEventListener("click", function() {
    alert(playRound());
});

//Choice options
const options = ["rock", "paper", "scissors"];

//Returns a random option from the options array
function getComputerChoice() {
    return options[getRandomNumber()];
}

//Generates random number between 0 and 2
function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

//Prompts user to type in a playing option
//Makes input lowercase
//Checks if input is valid
function getPlayerChoice() {

    let input = "";

    while (!checkInputValidity(input)) {
        input = prompt("Please enter an option: rock, paper or scissors").toLowerCase();
    }

    return input;
}   

//Checks if passed in playing option is within the valid ones
function checkInputValidity(str) {
    return (options.includes(str)) ? true : false;
}

function playRound() {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice();

    alert("Computer choice is: " + computerChoice);
    const winnerOption = determineWinner(computerChoice, playerChoice);
    return winnerOption;
}

function determineWinner(choice1, choice2) {
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