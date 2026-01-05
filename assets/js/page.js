document.addEventListener("DOMContentLoaded", function () {
  const difficultyText = document.body.dataset.difficulty || "Medium";
  const importanceValue = parseInt(document.body.dataset.importance || 2);

  const levelMap = {
    "very easy": "very-easy",
    easy: "easy",
    medium: "medium",
    hard: "hard",
  };

  const levelClass = levelMap[difficultyText.toLowerCase()] || "medium";

  const diffEl = document.getElementById("difficulty-level");
  if (diffEl) {
    diffEl.textContent = difficultyText;
    diffEl.className = "level " + levelClass;
  }

  const impEl = document.getElementById("importance-stars");
  if (impEl) {
    let stars = "";
    for (let i = 0; i < 3; i++) {
      stars += i < importanceValue ? "★" : "☆";
    }
    impEl.textContent = stars;
  }
});

function copySample(button) {
  const sampleBlock = button.closest(".sample-block");
  if (!sampleBlock) return;

  const pre = sampleBlock.querySelector("pre.sample-io");
  if (!pre) return;

  navigator.clipboard
    .writeText(pre.innerText.trim())
    .then(() => {
      button.innerText = "Copied!";
      setTimeout(() => (button.innerText = "Copy"), 1000);
    })
    .catch(() => {
      button.innerText = "Failed";
      setTimeout(() => (button.innerText = "Copy"), 1000);
    });
}
