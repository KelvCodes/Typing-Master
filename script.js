const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const progress = document.getElementById("progress");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const soundCheckbox = document.getElementById("sound");
const leaderboardList = document.getElementById("leaderboard-list");

// Updated word list (first 7 sentences changed)
const words = [
  "Luna dances under moonlight",
  "Rex chases his own tail",
  "Mira paints the sky blue",
  "Juno sings to the stars",
  "Kael builds towers of sand",
  "Tara weaves dreams in silence",
  "Zane runs through endless fields",
  "javascript", "developer", "programming", "algorithm",
  "function", "variable", "react", "angular", "database", "framework", "syntax",
  "iteration", "debugging", "responsive", "component", "interface",
  "optimization", "asynchronous", "repository", "deployment", "encapsulation",
  "inheritance", "polymorphism", "abstraction", "authentication",
  "authorization", "middleware", "prototype", "callback", "promise", "async",
  "await", "closure", "recursion", "expression", "statement", "declaration",
  "immutable", "mutable", "typescript", "nodejs", "python", "blockchain",
  "machine learning", "artificial intelligence", "quantum computing",
  "virtual reality", "augmented reality", "cybersecurity", "encryption",
  "decryption", "networking", "protocol", "serverless", "microservices",
  "graphql", "restful", "api", "endpoint", "frontend", "backend", "fullstack",
  "devops", "agile", "scrum", "kanban", "testing", "unit test", "integration",
  "performance", "scalability", "cloud computing", "docker", "kubernetes",
  "terraform", "ansible", "git", "version control", "merge", "commit", "push",
  "pull request", "branch", "repository", "open source", "proprietary",
  "binary", "hexadecimal", "octal", "unicode", "regex", "parsing", "tokenize",
  "compiler", "interpreter", "virtual machine", "runtime", "dependency",
  "package", "library", "module", "namespace", "thread", "multithreading",
  "concurrency", "parallelism", "deadlock", "race condition", "semaphore",
  "mutex", "cache", "memory", "stack", "heap", "pointer", "reference",
  "garbage collection", "overflow", "underflow", "buffer", "stream",
  "serialization", "deserialization", "json", "xml", "yaml", "csv", "sql",
  "nosql", "mongodb", "postgresql", "mysql", "sqlite", "redis", "elasticsearch",
  "big data", "hadoop", "spark", "kafka", "rabbitmq", "message queue",
  "websocket", "http", "https", "tcp", "udp", "dns", "ip address", "subnet",
  "firewall", "load balancer", "proxy", "reverse proxy", "cdn", "ssl", "tls",
  "oauth", "jwt", "session", "cookie", "csrf", "xss", "sql injection",
  "phishing", "malware", "ransomware", "trojan", "virus", "worm", "exploit",
  "vulnerability", "patch", "update", "release", "beta", "alpha", "stable",
  "deprecated", "legacy", "refactor", "code review", "pair programming",
  "debug", "breakpoint", "log", "trace", "exception", "error handling",
  "try catch", "throw", "stack trace", "performance tuning", "benchmark",
  "profiling", "optimization", "lazy loading", "eager loading", "pagination",
  "infinite scroll", "throttle", "debounce", "event loop", "callback hell",
  "promise chain", "async await", "generator", "iterator", "symbol", "proxy",
  "reflect", "metaprogramming", "design pattern", "singleton", "factory",
  "observer", "strategy", "decorator", "adapter", "facade", "bridge",
  "composite", "command", "mediator", "memento", "state", "template",
  "visitor", "chain of responsibility", "behavioral", "structural", "creational"
];

let randomWord;
let score = 0;
let time = 10;
let initialTime = 10;
let difficulty = localStorage.getItem("difficulty") || "medium";
let soundEnabled = localStorage.getItem("sound") === "false" ? false : true;
let typedCharacters = 0;
let startTime = Date.now();
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const typeSound = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
const correctSound = new Audio("https://www.soundjay.com/buttons/beep-07.mp3");
const gameOverSound = new Audio("https://www.soundjay.com/misc/sounds/game-over-1.mp3");

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
  word.classList.remove("animate-word");
  void word.offsetWidth;
  word.classList.add("animate-word");
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
  scoreElement.style.color = "#FF6F61";
  setTimeout(() => (scoreElement.style.color = "inherit"), 300);
  if (soundEnabled) correctSound.play();
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  progress.style.width = `${(time / initialTime) * 100}%`;
  if (time <= 3) timeElement.style.color = "#FF6F61";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function calculateWPM() {
  const elapsedMinutes = (Date.now() - startTime) / 60000;
  const wordsTyped = typedCharacters / 5;
  const wpm = Math.round(wordsTyped / elapsedMinutes);
  wpmElement.innerText = isFinite(wpm) ? wpm : 0;
}

function updateLeaderboard() {
  leaderboard.push({ score, wpm: parseInt(wpmElement.innerText), date: new Date().toLocaleString() });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  leaderboardList.innerHTML = leaderboard.map(entry => 
    `<li>${entry.score} (WPM: ${entry.wpm}) - ${entry.date}</li>`
  ).join("");
}

function gameOver() {
  if (soundEnabled) gameOverSound.play();
  calculateWPM();
  updateLeaderboard();
  endgameElement.innerHTML = `
    <h1>Time's Up!</h1>
    <p>Score: <strong>${score}</strong> | WPM: <strong>${wpmElement.innerText}</strong></p>
    <button onclick="location.reload()">Play Again</button>
    <button onclick="window.location.href='index.html'">Back to Home</button>
  `;
  endgameElement.style.display = "flex";
  endgameElement.classList.add("animate-container");
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  typedCharacters += insertedText.length;
  if (soundEnabled) typeSound.play();
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    time += difficulty === "hard" ? 2 : difficulty === "medium" ? 3 : 5;
    updateTime();
    calculateWPM();
    text.style.borderColor = "#FF6F61";
    setTimeout(() => (text.style.borderColor = "#1A1314"), 300);
  }
});

settingsButton.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", (e) => {
  if (e.target.id === "difficulty") {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
  } else if (e.target.id === "sound") {
    soundEnabled = e.target.checked;
    localStorage.setItem("sound", soundEnabled);
  }
});

const savedTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = savedTheme;

difficultySelect.value = difficulty;
soundCheckbox.checked = soundEnabled;
initialTime = difficulty === "hard" ? 5 : difficulty === "medium" ? 10 : 15;
time = initialTime;
addWordToDom();
updateLeaderboard();
text.focus();
