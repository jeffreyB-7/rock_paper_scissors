// Quote data for the ticker at the bottom of the page.
//
// Each quote has:
//   text    - the exact words
//   speaker - who said it (optional: leave it out or use "" to show no name)
//
// HOW TO EDIT: copy one line, change the text and speaker, and keep a comma
// between quotes (but no comma after the last one).
//
// Example:
//   { text: "Your quote goes here.", speaker: "Character Name" },
const quotes = [
  // Strawberry Shortcake
  { text: "Grow with challenges; they help us become our best selves!", speaker: "Strawberry Shortcake" },
  { text: "With a bit of courage, even the biggest dreams can come true!", speaker: "Strawberry Shortcake" },
  { text: "With determination, you can turn dreams into sweet realities!", speaker: "Strawberry Shortcake" },
  { text: "Every setback is an opportunity to find a new way to shine!", speaker: "Strawberry Shortcake" },
  { text: "Like a cake rising in the oven, we too can rise above our challenges!", speaker: "Strawberry Shortcake" },
  { text: "Celebrate life's little moments; they're the ones that matter!", speaker: "Strawberry Shortcake" },

  // Teto Kasane
  { text: "Kick reason to the curb and just follow me.", speaker: "Teto Kasane" },
  { text: "I'm always watching over you. Leave it to me, your backup.", speaker: "Teto Kasane" },
  { text: "Quit with this nonsense already. There is no such thing as being bound by fate.", speaker: "Teto Kasane" },
  { text: "Believe that good things will come to those who wait.", speaker: "Teto Kasane" },
  { text: "Ignore those frustrations and make up your mind already.", speaker: "Teto Kasane" },
  { text: "I'll never forget you, my precious memory.", speaker: "Teto Kasane" },

  // Hatsune Miku
  { text: "Your future self is rooting for you right now.", speaker: "Hatsune Miku" },
  { text: "A dream without action is just a nice idea.", speaker: "Hatsune Miku" },
  { text: "The goal does not have to be huge. It just has to be yours.", speaker: "Hatsune Miku" },
  { text: "Keep going.", speaker: "Hatsune Miku" },
  { text: "Do not shrink your dreams to fit a smaller stage.", speaker: "Hatsune Miku" },
  { text: "There is always a reason to celebrate if you look close enough.", speaker: "Hatsune Miku" },
  { text: "The path to your dream is made one step at a time.", speaker: "Hatsune Miku" }
];

// The color of each speaker's name in the ticker (any CSS color works).
// A speaker who isn't listed here gets white.
const speakerColors = {
  "Hatsune Miku": "#4da6ff",         // blue
  "Strawberry Shortcake": "#ff69b4", // pink
  "Teto Kasane": "#ff4d4d"           // red
};
