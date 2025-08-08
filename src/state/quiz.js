import { questions } from "../questions.js";

let index = 0;
let score = 0;


let shuffledQuestions = [...questions]; // clone
shuffle(shuffledQuestions); // shuffle once

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function current() {
  return shuffledQuestions[index];
}

export function submit(choiceIndex) {
  if (choiceIndex === current().answer) {
    score++;
  }
  index++;
  return index < shuffledQuestions.length;
}

export function getScore() {
  return { score, total: shuffledQuestions.length };
}

export function reset() {
  index = 0;
  score = 0;
  shuffledQuestions = [...questions];
  shuffle(shuffledQuestions);
}