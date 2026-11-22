// The three possible choices
const choices = ["rock", "paper", "scissors"];

// Which choice each choice beats
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

// Everything we track across rounds
const stats = {
  decided: 0,      // rounds that were a win or a loss (ties don't count)
  wins: 0,         // rounds you won
  streak: 0,       // wins in a row right now
  bestStreak: 0    // the longest streak so far
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

// Change the stats based on the result of one round
function recordResult(result) {
  if (result === "win") {
    stats.decided = stats.decided + 1;
    stats.wins = stats.wins + 1;
    stats.streak = stats.streak + 1;
    if (stats.streak > stats.bestStreak) {
      stats.bestStreak = stats.streak;
    }
  } else if (result === "lose") {
    stats.decided = stats.decided + 1;
    stats.streak = 0;
  }
  // A tie changes nothing: win % stays the same and the streak is paused
}

// Show the current stats on the page
function updateScoreboard() {
  let winPercent = 0;
  if (stats.decided > 0) {
    winPercent = Math.round((stats.wins / stats.decided) * 100);
  }

  document.getElementById("win-percent").textContent = winPercent + "%";
  document.getElementById("streak").textContent = stats.streak;
  document.getElementById("best-streak").textContent = stats.bestStreak;
}

// Play one round and show both picks and the result
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  recordResult(result);
  updateScoreboard();

  document.getElementById("player-pick").textContent = capitalize(playerChoice);
  document.getElementById("computer-pick").textContent = capitalize(computerChoice);

  const messages = {
    win: "You win!",
    lose: "You lose!",
    tie: "It's a tie!"
  };
  const resultElement = document.getElementById("result");
  resultElement.textContent = messages[result];
  // Sets the class to result-win, result-lose, or result-tie (styled in style.css)
  resultElement.className = "result-" + result;
}

// Put the game back to how it looked when the page first loaded
function resetGame() {
  stats.decided = 0;
  stats.wins = 0;
  stats.streak = 0;
  stats.bestStreak = 0;
  updateScoreboard();

  document.getElementById("player-pick").textContent = "-";
  document.getElementById("computer-pick").textContent = "-";
  document.getElementById("result").textContent = "Click a button to play!";
  document.getElementById("result").className = "";
}

document.getElementById("reset").addEventListener("click", resetGame);

// Connect each button to playRound
const buttons = document.querySelectorAll(".choice");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    playRound(button.dataset.choice);
  });
});

// Return a shuffled copy of a list (the original list is not changed)
function shuffle(list) {
  const copy = list.slice();
  // Walk backwards, swapping each item with a random item at or before it
  for (let i = copy.length - 1; i > 0; i = i - 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// Add every quote in the list to the container, with a colored speaker name
function addQuotes(container, list) {
  list.forEach(function (quote) {
    container.appendChild(document.createTextNode("“" + quote.text + "”"));

    if (quote.speaker) {
      container.appendChild(document.createTextNode(" — "));
      const name = document.createElement("span");
      name.textContent = quote.speaker;
      name.style.fontWeight = "bold";
      name.style.color = speakerColors[quote.speaker] || "white";
      container.appendChild(name);
    }

    // Non-breaking spaces so the gap between quotes never collapses
    container.appendChild(document.createTextNode("   •   "));
  });
}

// Fill the ticker at the bottom with the quotes from quotes.js
function buildTicker() {
  if (quotes.length === 0) {
    return;
  }

  const track = document.getElementById("ticker-track");

  // A new random order every time the page loads
  const shuffled = shuffle(quotes);

  // The first half of the track
  const half = document.createElement("span");
  addQuotes(half, shuffled);
  track.appendChild(half);

  // Repeat the quotes until one half is wider than the screen (no empty gaps)
  let tries = 0;
  while (half.offsetWidth < window.innerWidth && tries < 50) {
    addQuotes(half, shuffled);
    tries = tries + 1;
  }

  // The second half is an exact copy, which makes the loop seamless
  track.appendChild(half.cloneNode(true));

  // Same speed on every screen: 80 pixels per second
  track.style.animationDuration = half.offsetWidth / 80 + "s";
}

buildTicker();
