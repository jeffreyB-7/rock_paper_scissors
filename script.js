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

// The emoji for each hand. Rock is also what a fist looks like.
const handEmoji = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

// How long each countdown step lasts, in milliseconds
const stepTime = 500;

// Remembers the running countdown timer so Reset can stop it
let countdownTimer = null;

// ---------- Sounds (made with code, so there are no sound files) ----------

// The browser's audio system. It is created the first time a sound plays.
let audioContext = null;

function getAudioContext() {
  if (audioContext === null) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;  // This browser can't make sounds, so the game stays silent
    }
    audioContext = new AudioContextClass();
  }
  // Browsers start audio "suspended" until the player has clicked something
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

// Play one beep.
//   frequency  - the pitch (higher number = higher sound)
//   startDelay - seconds to wait before it starts
//   duration   - how many seconds it lasts
//   type       - the sound's shape: "sine", "square", "triangle", or "sawtooth"
function playTone(frequency, startDelay, duration, type) {
  const context = getAudioContext();
  if (context === null) {
    return;
  }

  const oscillator = context.createOscillator();  // makes the tone
  const volume = context.createGain();            // controls how loud it is

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  // Start fairly quiet, then fade out so the beep doesn't end with a click
  const startTime = context.currentTime + startDelay;
  volume.gain.setValueAtTime(0.15, startTime);
  volume.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.connect(volume);
  volume.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// A short tick for each of "3", "2", "1"
function playTick() {
  playTone(600, 0, 0.08, "square");
}

// A higher, longer beep at the moment of the reveal
function playShoot() {
  playTone(900, 0, 0.25, "square");
}

// Three rising notes (they start a moment after the reveal beep)
function playWinSound() {
  playTone(523, 0.3, 0.15, "triangle");
  playTone(659, 0.45, 0.15, "triangle");
  playTone(784, 0.6, 0.3, "triangle");
}

// Three falling, buzzy notes
function playLoseSound() {
  playTone(330, 0.3, 0.2, "sawtooth");
  playTone(262, 0.5, 0.2, "sawtooth");
  playTone(196, 0.7, 0.4, "sawtooth");
}

// ---------- Hands, countdown, and rounds ----------

// Show a hand emoji on each side (pass "rock", "paper", or "scissors")
function showHands(playerKey, computerKey) {
  document.getElementById("player-hand").textContent = handEmoji[playerKey];
  document.getElementById("computer-hand").textContent = handEmoji[computerKey];
}

// Turn the up-and-down bobbing on or off for both hands
function setShaking(isShaking) {
  document.querySelectorAll(".hand").forEach(function (hand) {
    hand.classList.toggle("shaking", isShaking);
  });
}

// Disable or enable the Rock, Paper, and Scissors buttons
function setChoiceButtonsDisabled(disabled) {
  buttons.forEach(function (button) {
    button.disabled = disabled;
  });
}

// The reveal: the computer picks, then show both hands and the result
function revealRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  recordResult(result);
  updateScoreboard();

  setShaking(false);
  showHands(playerChoice, computerChoice);

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

  // A win or lose sound (a tie stays quiet)
  if (result === "win") {
    playWinSound();
  } else if (result === "lose") {
    playLoseSound();
  }

  setChoiceButtonsDisabled(false);
}

// Play one round: count down "3, 2, 1", then reveal
function playRound(playerChoice) {
  // No clicking while the countdown runs
  setChoiceButtonsDisabled(true);

  // Both sides start as shaking fists, and the last round's text is cleared
  showHands("rock", "rock");
  setShaking(true);
  document.getElementById("player-pick").textContent = "-";
  document.getElementById("computer-pick").textContent = "-";
  document.getElementById("result").textContent = "";
  document.getElementById("result").className = "";

  const steps = ["3", "2", "1"];
  let stepNumber = 0;

  function showNextStep() {
    if (stepNumber < steps.length) {
      // Show the next number and tick, then come back after a short wait
      document.getElementById("countdown").textContent = steps[stepNumber];
      playTick();
      stepNumber = stepNumber + 1;
      countdownTimer = setTimeout(showNextStep, stepTime);
    } else {
      // The countdown is over: clear the text, beep, and reveal the hands
      document.getElementById("countdown").textContent = "";
      playShoot();
      countdownTimer = null;
      revealRound(playerChoice);
    }
  }

  showNextStep();
}

// Put the game back to how it looked when the page first loaded
function resetGame() {
  stats.decided = 0;
  stats.wins = 0;
  stats.streak = 0;
  stats.bestStreak = 0;
  updateScoreboard();

  // Stop a countdown that is in progress and let the buttons be clicked again
  clearTimeout(countdownTimer);
  countdownTimer = null;
  setChoiceButtonsDisabled(false);
  setShaking(false);
  showHands("rock", "rock");
  document.getElementById("countdown").textContent = "";

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
