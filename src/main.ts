import { invoke } from "@tauri-apps/api/tauri";

async function getVocab(url: String) {
  let vocab;
  await invoke("find_words", { url: url }).then((message) => vocab = message);
  return vocab;
}

const body = document.body;

const termDisplay = document.createElement("h1");
const answerInput = document.createElement("input");
answerInput.type = "text";

const answerReport = document.createElement("h2");
const playAgainButton = document.createElement("div");
playAgainButton.classList.add("button");
const playAgainText = document.createElement("h2");
playAgainText.textContent = "Play Again";
playAgainButton.appendChild(playAgainText);

let urlInput: HTMLInputElement | null;
let urlSelectButton: HTMLElement | null;
let terms: String[] = [];
let answers: String[] = [];

window.addEventListener("DOMContentLoaded", () => {
  urlInput = document.querySelector("#url-input");
  urlSelectButton = document.querySelector("#enter-button");
  urlSelectButton?.addEventListener('click', () => initQuiz());
});

async function initQuiz() {
  const vocab = await getVocab(urlInput?.value);
  terms = vocab[0];
  answers = vocab[1];
  body.removeChild(urlInput);
  body.removeChild(urlSelectButton);
  enterQuiz();
}

async function enterQuiz() {
  
  body.appendChild(termDisplay);
  body.appendChild(answerReport);
  termDisplay.textContent = terms[0];
  body.appendChild(answerInput);
}

let counter = 0;
let score = 0;

answerInput.addEventListener("keypress", async function(event) {
  if (event.key === "Enter") {
    if (answerInput.value === answers[counter]) {
      answerReport.style.color = "green";
      answerReport.textContent = "Correct";
      score++;
    } else {
      answerReport.style.color = "red";
      answerReport.textContent = ("Incorrect! Correct answer was: " + answers[counter]);
    }
    await new Promise(r => setTimeout(r, 2000));
    counter++;
    termDisplay.textContent = terms[counter];
    answerInput.value = "";
    answerReport.textContent = "";
    checkDone();
  }
});

async function checkDone() {
  if (counter >= terms.length) {
    termDisplay.textContent = ("You're Done! You got a score of " + score + "/" + terms.length);
    body.appendChild(playAgainButton);
    body.removeChild(answerInput);
  }
}

playAgainButton.addEventListener('click', function() {
  body.removeChild(termDisplay);
  body.removeChild(playAgainButton);
  counter = 0;
  score = 0;
  enterQuiz()
});
