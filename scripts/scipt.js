const button = document.getElementById('playButton');

button.addEventListener("click", function() {
    alert(getComputerChoice());
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