// The three possible choices
const choices = ["rock", "paper", "scissors"];

// Which choice each choice beats
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

// Pick a random choice for the computer
function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Decide the result of one round: "win", "lose", or "tie"
function getResult(player, computer) {
  if (player === computer) {
    return "tie";
  }
  if (beats[player] === computer) {
    return "win";
  }
  return "lose";
}

// Turn "rock" into "Rock" for display
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Play one round and show both picks and the result
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  document.getElementById("player-pick").textContent = capitalize(playerChoice);
  document.getElementById("computer-pick").textContent = capitalize(computerChoice);

  const messages = {
    win: "You win!",
    lose: "You lose!",
    tie: "It's a tie!"
  };
  document.getElementById("result").textContent = messages[result];
}

// Connect each button to playRound
const buttons = document.querySelectorAll(".choice");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    playRound(button.dataset.choice);
  });
});
