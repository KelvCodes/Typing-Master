document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      document.body.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    });
  });
  
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;