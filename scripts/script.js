// Select input field
const input = document.querySelector("#roundsInput");

// Select play button
const playButton = document.getElementById("playButton");

// Select elements for displaying computer and game result
const compChoiceTitle = document.querySelector("#computer-choice");
const updaterTitle = document.querySelector("#updater");
const roundDiv = document.querySelector(".round-div");
const roundTitle = document.querySelector(".round-title");

// Available options for the game
const options = ["rock", "paper", "scissors"];

// Array of points containers for each option
const pointsContainers = Array.from(document.querySelectorAll(".second-div .points-container"));

// Array of buttons for each option
const optionButtons = Array.from(document.getElementsByClassName("choice-button"));

// Select element for displaying the current round
const roundsTitle = document.querySelector("h2.round-title");

// Initialize variables for tracking the current round
var currentPlayerOption = "";
var currentComputerOption = "";
var pointsCount = 0;
var currentRound = 0;
var numberOfRounds = 0;

// Initialize colors for indicating winning, losing, or tie
const losingColor = "red";
const winningColor = "green";
const tieColor = "white";

// Add click event listener to play button
playButton.addEventListener("click", function() {
    // Check if the input is valid
    if (!isValidInput()) return;
    // Start the game if input is valid
    startGame();
});

// Function to check if the input is valid
function isValidInput() {
    switch (true) {
        case input.value.trim() === "": 
            // Input is empty
            alert("Input value is empty");
            return;

        case input.value == 0: 
            // Input is zero
            alert("Input value cannot be zero");
            return;

        case Number(input.value) !== parseFloat(input.value): 
            // Input is decimal
            alert("Input value is a decimal number");
            return;

        case input.value.indexOf("-") === 0:
            // Input is negative
            alert("Input value is a negative number");
            return;

        default: 
            return true;
    }
  }

// Function to start the game
function startGame() {
    // Disable play button to prevent clicking during the game
    playButton.disabled = true;
    // Reset elements for displaying the computer's choice and game result
    resetUpdaters();
    // Clear points trackers
    clearPointsTrackers();
    // Enable option buttons
    toggleOptionsButtons(true);

    // Initialize point count
    pointsCount = 0;

    // Set number of rounds from input
    numberOfRounds = input.value;

    // Update text for choosing an option
    declareChooseTitle();
    // Update label for current round
    updateRoundsLabel();
}

// Function to update label for current round
function updateRoundsLabel() {
    roundsTitle.innerHTML = `Round: ${currentRound}/${numberOfRounds}`;
}


// Function to clear points trackers
function clearPointsTrackers() {
    // Iterate over each points container
    pointsContainers.forEach(pointsContainer => {
        // Remove all child elements while the container has a first child
        while (pointsContainer.firstChild) {
            pointsContainer.removeChild(pointsContainer.firstChild);
        }
    });
}

// Function to reset elements for displaying the computer's choice and game result
function resetUpdaters() {
    // Clear the text content of computer choice and game result elements
    compChoiceTitle.textContent = "";
    updaterTitle.textContent = "";
    // Set the color of computer choice and game result elements back to black
    compChoiceTitle.style.color = "black";
    updaterTitle.style.color = "black";
}

// Function to play a round of the game
function playRound() {
    // Get computer choice
    const computerChoice = getComputerChoice();
    // Get player choice
    const playerChoice = currentPlayerOption;
    
    // Display computer choice
    declareComputerChoice(computerChoice);

    // Determine the winner option
    const winnerOption = determineWinnerOption(computerChoice, playerChoice);

    // Update game result and points tracker based on winner option
    switch (winnerOption) {
        case computerChoice: 
            // Player lost
            declareLosingText(computerChoice, playerChoice);
            updatePointsTracker(1, computerChoice, playerChoice, false);
            pointsCount--;
            break;
        case playerChoice: 
            // Player won
            declareWinningText(computerChoice, playerChoice);
            updatePointsTracker(0, playerChoice, computerChoice, false);
            pointsCount++;
            break;
        default: 
            // Tie
            declareTieText();
            updatePointsTracker(null, playerChoice, computerChoice, true);
            break;
    }

    // Increment current round
    currentRound++;
    // Update label for current round
    updateRoundsLabel();

    // Check if the player or computer has won
    checkIfWon();
}

//Checks if game is over
//If so, related elements are updated accordingly
function checkIfWon() {
    if (currentRound == numberOfRounds) {
        updaterTitle.textContent = determineWinner(pointsCount);
        currentRound = 0;
        playButton.disabled = false;
        playButton.textContent = "Play again";
        toggleOptionsButtons(false);
    } 
}

//Creates new labels to indicate the current points
//Depends on what happened
function updatePointsTracker(who, winnerOption, loserOption, tie) {
    const pointLabel = document.createElement("p");

    const boldText = document.createElement("b");
    boldText.textContent = tie ? "Tie" : "I";
    if (!tie) boldText.style.color = who == 0 ? winningColor : losingColor;
    pointLabel.appendChild(boldText);

    const italicText = document.createElement("i");
    italicText.textContent = ` (${winnerOption} -> ${loserOption})`;
    italicText.style.fontSize = "smaller";
    pointLabel.appendChild(italicText);

    if (tie) {
        const pointLabel2 = pointLabel.cloneNode(true);
        pointsContainers[0].appendChild(pointLabel);
        pointsContainers[1].appendChild(pointLabel2);
    } else {
        pointsContainers[who].appendChild(pointLabel);
    }
}

//Gets a randomly generated playing option
function getComputerChoice() {
    return options[getRandomNumber()];
}

//Returns a random number from 0 to 2
function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

//Adds functionality to each playing option button
//The player's choice is assigned to the text of the button
//If the game isn't over, it plays a round
buildOptionsButtons();
function buildOptionsButtons() {
    toggleOptionsButtons(false);
    optionButtons.map(button => button.addEventListener("click", function(e) {
        currentPlayerOption = this.textContent.toLowerCase();
        if (currentRound != numberOfRounds) playRound();
    }));
}

//Sets winning logic
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

//Sets logic for winning and losing
function determineWinner(count) {
    switch (true) {
        case count > 0: 
        updaterTitle.style.color = winningColor;
        return "You win!"; 
        case count < 0: 
        updaterTitle.style.color = losingColor;
        return "You lose!";
        default: 
        updaterTitle.style.color = tieColor;
        return "It's a tie!";
    }
}

//Activates or deactivates playing options buttons
function toggleOptionsButtons(toggle) {
    optionButtons.map(button => button.disabled = !toggle);
}

//Updates label that indicates the computer's choice in the current round
function declareComputerChoice(choice) {
    compChoiceTitle.textContent = `Computer Choice is: ${choice}`;
    compChoiceTitle.style.width = "180px";
} 

//Label that prompts the user to press one of the playing options buttons
function declareChooseTitle() {
    updaterTitle.textContent = "Choose an option:";
    updaterTitle.style.width = "150px";
  }

//Label state for losing a round
function declareLosingText(computerChoice, playerChoice) {
    updaterTitle.textContent = `You lose! ${computerChoice} beats ${playerChoice}. Continue:`;
    updaterTitle.style.color = losingColor;
    updaterTitle.style.width = "200px";
}

//Label state for winning a round
function declareWinningText(computerChoice, playerChoice) {
    updaterTitle.textContent = `You win! ${playerChoice} beats ${computerChoice}. Continue:`;
    updaterTitle.style.color = winningColor;
    updaterTitle.style.width = "200px";
}

//Label state for a tied round
function declareTieText() {
    updaterTitle.textContent = "It's a tie. Continue: ";
    updaterTitle.style.color = tieColor;
}

  