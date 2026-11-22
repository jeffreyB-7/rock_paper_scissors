# Rock Paper Scissors: Roadmap

Each milestone ends with something you can open in a browser (`index.html`) and test.

## Milestone 1: Play one round (smallest working version)
- [x] Create `index.html`, `style.css`, and `script.js` and link them together
- [x] Add Rock, Paper, and Scissors buttons
- [x] Have the computer pick at random when a button is clicked
- [x] Show your pick, the computer's pick, and the result (win, lose, or tie)
- [x] **Test:** click each button several times. Both picks always show, and the result is correct for every combination.

## Milestone 2: Win percentage, streaks, and reset
- [x] Add a scoreboard showing win %, current win streak, and best win streak
- [x] Update the stats after every round (a tie changes nothing: win % stays the same and the streak is paused; only a loss resets the streak)
- [x] Add a Reset button that sets all stats back to 0 and clears the last round without reloading
- [x] **Test:** play 10 or more rounds and check that win %, win streak, and best streak match the results shown. Click Reset and check that everything reads 0%, 0, 0.

## Milestone 3: Clean layout and styling
- [x] Center the layout and make the buttons large and easy to click
- [x] Color-code the result (for example green for a win, red for a loss, gray for a tie)
- [x] Make sure the page works on a phone-sized window
- [x] **Test:** play in a full window and in a narrow one. Everything is readable and nothing overlaps.

## Milestone 4: Inspirational quote ticker (first nice-to-have)
- [x] Add the quote data you provide
- [x] Add a bar along the bottom of the page with quotes sliding from right to left
- [x] Make sure the ticker doesn't cover the game buttons or the score
- [ ] **Test:** open the page and watch the quotes scroll smoothly and loop. The game still works while they scroll.

## Later (not scheduled)
- [ ] Sounds and animations
- [ ] Smarter computer
