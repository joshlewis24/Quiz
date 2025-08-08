import { current, getScore, reset, submit } from "./state/quiz.js";
import { maybeSetBestScore, getBestScore } from "./state/highscore.js"; 

let quizCard = document.createElement("div");
quizCard.id = "quizCard";
document.body.append(quizCard);

let timeoutId; // For tracking the timer

export function showQuestion() {
  clearTimeout(timeoutId); // Clear any previous timers

  const q = current();
  quizCard.innerHTML = `
    <h2>${q.text}</h2>
    <div id="choices"></div>
    <p id="progress"></p>
    <p id="timer">Time left: 10s</p>
  `;

  const choiceBox = document.querySelector("#choices");

  q.choices.forEach((el, i) => {
    const button = document.createElement("button");
    button.innerHTML = el;
    button.onclick = () => {
      clearTimeout(timeoutId); // Cancel auto-skip if answered
      const more = submit(i);
      more ? showQuestion() : showResult();
    };
    choiceBox.appendChild(button);
  });

  updateProgress();
  startCountdown(); // Start timer
}

function startCountdown() {
  let timeLeft = 10;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  const intervalId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
  }, 1000);

  timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    const more = submit(-1); // Skip if no answer (pass -1)
    more ? showQuestion() : showResult();
  }, 10000);
}

function updateProgress() {
  const { score, total } = getScore();

}

export function showResult() {
  clearTimeout(timeoutId);

  const { score, total } = getScore();
  const isNewHighScore = maybeSetBestScore(score, total);
  const best = getBestScore();

  quizCard.innerHTML = `
    <h2>Quiz is Finished</h2>
    <p>Your score: ${score} / ${total}</p>
    ${isNewHighScore ? `<p>🏆 <strong>New High Score!</strong></p>` : ""}
    <p>Best: ${best.score} / ${best.total}</p>
    <button id="retry">Try Again</button>
  `;

  quizCard.querySelector("#retry").onclick = () => {
    reset();
    showQuestion();
  };
}


