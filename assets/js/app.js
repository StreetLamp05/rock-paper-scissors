document.addEventListener("DOMContentLoaded", () => {

let playerScore = 0;
let computerScore = 0;


/**
 * Generates a random move for the Computer.
 * @returns The computer's choice of "rock", "paper", or "scissors".
 */
function getComputerMove() {    
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "rock";
        case 1: 
            return "paper";
        case 2: 
            return "scissors";
    } // switch
} // getComputerMove


/**
 * Calculates the winner between the player and the computer.
 * 
 * @param {string} playerMove the player's move.
 * @param {string} computerMove the computer's move.
 * @returns The calculated result: "win", "lose", or "draw".
 */
function calculateWinner(playerMove, computerMove) {
    if (playerMove == computerMove) {
        return "draw";
    } // if 

    if (
        (playerMove == "rock" && computerMove == "scissors") ||
        (playerMove == "paper" && computerMove == "rock") ||
        (playerMove == "scissors" && computerMove == "paper")
    ) {
        return "win";
    } else {
        return "lose";
    } // if
} // calculateWinner


function triggerPlayAnimation() {
    const playerMoveImg = document.getElementById("player-move");
    const computerMoveImg = document.getElementById("computer-move");

    playerMoveImg.src = `./rock-paper-scissors/assets/images/left/rock-left.svg`;
    computerMoveImg.src = `./rock-paper-scissors/assets/images/right/rock-right.svg`;
    

    playerMoveImg.classList.add("bounce");
    computerMoveImg.classList.add("bounceR");

    setTimeout(() => {
        playerMoveImg.classList.remove("bounce");
        computerMoveImg.classList.remove("bounceR");
    }, 900);
} // triggerPlayAnimation


/**
 * Updates the game's score, changes the move images for the player and computer, and updates the result message label.
 * 
 * @param {string} result the result of the round.
 * @param {string} playerMove the player's move.
 * @param {string} computerMove the computer's move.
 */
function updateGameScore(result, playerMove, computerMove) {
    const resultMessageLabel = document.getElementById("result-message");
    const playerScoreLabel = document.getElementById("player-score");
    const computerScoreLabel = document.getElementById("computer-score");
    const playerMoveImg = document.getElementById("player-move");
    const computerMoveImg = document.getElementById("computer-move");

    if (result == "win") {
        playerScore++;
        resultMessageLabel.textContent = "You win!";
    } else if (result == "lose") {
        computerScore++;
        resultMessageLabel.textContent = "You lose!";
    } else {
        playerScore++;
        computerScore++;
        resultMessageLabel.textContent = "You draw!";
    } // if

    playerScoreLabel.textContent = playerScore;
    computerScoreLabel.textContent = computerScore;

    playerMoveImg.src = `./rock-paper-scissors/assets/images/left/${playerMove}-left.svg`;
    computerMoveImg.src = `./rock-paper-scissors/assets/images/right/${computerMove}-right.svg`;
} // updateGame


const buttons = document.querySelectorAll(".choice");
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("Button clicked:", button);
        const playerMove = button.getAttribute("data-choice");
        console.log("playerMove: ", playerMove);

        let computerMove = getComputerMove();
        console.log("computerMove: ", computerMove);
        let result = calculateWinner(playerMove, computerMove);
        console.log("result: ", result);

        console.log("Starting game animation");

        
        triggerPlayAnimation();


        console.log("updating game state");

        setTimeout(() => {
            updateGameScore(result, playerMove, computerMove);
        }, 900);
    });
});

})