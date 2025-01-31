// DOM Elements
const word = document.getElementById("word");// Element to display the random word
const text = document.getElementById("text");// Input field for typing the word
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

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

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
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
