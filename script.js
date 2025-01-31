// DOM Elements
const word = document.getElementById("word");// Element to display the random word
const text = document.getElementById("text");// Input field for typing the word
const scoreElement = document.getElementById("score");// Element to display the score
const timeElement = document.getElementById("time"); // Element to display the remaining time
const endgameElement = document.getElementById("end-game-container"); // End game message container
const settingsButton = document.getElementById("settings-btn"); // Button to toggle settings
const settings = document.getElementById("settings"); // Settings container
const settingsForm = document.getElementById("settings-form");// Settings form
const difficultySelect = document.getElementById("difficulty");// Difficulty select dropdown

// Expanded list of words for the game
const words = [
  "Napo is gay",
  "Frank is not correct",
  "Napo again loves constance",
  "Asante's soul mate is bread",
  "Elijah is yakubu",
  "Arsenal is the best",
  "Yaa bounces Elijah",
  "javascript",
  "developer",
  "programming",
  "algorithm",
  "function",
  "variable",
  "react",
  "angular",
  "database",
  "framework",
  "syntax",
  "iteration",
  "debugging",
  "responsive",
  "component",
  "interface",
  "optimization",
  "asynchronous",
  "repository",
  "deployment",
  "encapsulation",
  "inheritance",
  "polymorphism",
  "abstraction",
  "authentication",
  "authorization",
  "middleware",
  "prototype",
  "callback",
  "promise",
  "async",
  "await",
  "closure",
  "recursion",
  "expression",
  "statement",
  "iteration",
  "declaration",
  "immutable",
  "mutable",
];

// Game variables
let randomWord; // Stores the current random word
let score = 0;// Tracks the player's score
let time = 10;// Initial time for the game
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium"; // Difficulty level (default: medium)

// Timer interval to update time every second
const timeInterval = setInterval(updateTime, 1000);

// Function to get a random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to display a random word in the DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Function to update the score and display it
function updateScore() {
  score++;
  scoreElement.innerText = score;
}

// Function to update the timer and check if time is up
function updateTime() {
  time--;
  timeElement.innerText = time + "s";// Update the time display
  if (time === 0) {
    clearInterval(timeInterval);// Stop the timer
    gameOver();
  }
}

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time's up! ⏰</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameElement.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Init
difficultySelect.value = difficulty;
addWordToDom();
text.focus();
