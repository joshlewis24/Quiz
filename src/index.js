import { showQuestion } from "./dom.js";

showQuestion();

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  // Keys 1 to 5 trigger choices (index 0 to 4)
  if (key >= "1" && key <= "5") {
    const index = Number(key) - 1;
    const choices = document.querySelectorAll("#choices button");
    if (choices[index]) choices[index].click();
  }

  // R triggers retry
  if (key === "r") {
    const retryBtn = document.querySelector("#retry");
    if (retryBtn) retryBtn.click();
  }
});