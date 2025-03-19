 = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Init
difficultySelect.value = difficulty;
addWordToDom();
text.focus();
