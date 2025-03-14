const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "Naruto", "Attack on Titan", "One Piece", "Dragon Ball", "Death Note",
  "My Hero Academia", "Fullmetal Alchemist", "Sword Art Online", "Tokyo Ghoul",
  "Demon Slayer", "One Punch Man", "Hunter x Hunter", "Demon Slayer",
  "Evangelion", "Bleach", "Fairy Tail", "Black Clover", "Attack on Titan",
  "Dragon Ball Z"
];

let randomWord;
let score = 0;
let time = 20;
let difficulty = localStorage.getItem("difficulty") || "medium";

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
  timeElement.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
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
    time += (difficulty === "hard" ? 3 : (difficulty === "medium" ? 5 : 10));
    updateTime();
  }
});

difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

addWordToDom();
text.focus();
const timeInterval = setInterval(updateTime, 1000);
