 Stop the timer
    gameOver(); // End the game
  }
}

// Function to display the end game message
function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time's up! ⏰</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameElement.style.display = "flex"; // Show the end game container
}

// Event listener for the input field
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;// Get the text entered by the user
  if (insertedText === randomWord) {
    e.target.value = ""; // Clear the input field
    addWordToDom();// Display a new random word
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
