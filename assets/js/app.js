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
    // Cases where the player draws.
    if (playerMove == computerMove) {
      return "draw";
    } // if

    // Cases where the player wins.
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

  /**
   * Triggers the play animation by adding and removing a "bounce"/ "bounceR" 
   * class ID to the player and computer move images.
   */
  function triggerPlayAnimation() {
    const playerMoveImg = document.getElementById("player-move");
    const computerMoveImg = document.getElementById("computer-move");

    playerMoveImg.src = `./assets/images/left/rock-left.svg`;
    computerMoveImg.src = `./assets/images/right/rock-right.svg`;

    playerMoveImg.classList.add("bounce");      // bounce animation class
    computerMoveImg.classList.add("bounceR");   // reversed bounce animation

    setTimeout(() => {
      playerMoveImg.classList.remove("bounce");
      computerMoveImg.classList.remove("bounceR");
    }, 900);    // removes the bounce/ bounceR after 900ms (3 bounces)
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

    // changes the player and computer move images to the correct move (rock, paper, or scissors).
    playerMoveImg.src = `./assets/images/left/${playerMove}-left.svg`;
    computerMoveImg.src = `./assets/images/right/${computerMove}-right.svg`;
  } // updateGame

  /**
   * Disables move buttons for a specified duration.
   * @param {number} duration The time in ms to keep the buttons disabled.
   */
  function disableButtons(duration) {
    buttons.forEach((button) => (button.disabled = true));
    setTimeout(() => {
      buttons.forEach((button) => (button.disabled = false));
    }, duration);
  }


  /* Add event listeners to the move selector buttons. */
  const buttons = document.querySelectorAll(".choice");
  console.log(buttons);
  buttons.forEach((button) => {
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
      }, 900); // waits for the play animation to play before updating game state.
    }); // add onClick event listener to button.
  }); // for each button.
}); // add event listener to make sure the entire DOM is loaded.
