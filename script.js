// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
const timer = document.getElementById("time");
let timeValue = timer.textContent;
const scoreLabel = document.getElementById("score");
let scoreVal = 0;
const messageLabel = document.getElementById("message");
const winThreshold = 20;

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning || timeValue <= 0) return;

  gameRunning = true;
  messageLabel.hidden = true;
  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(() => {
    timeValue--;
    timer.textContent = timeValue;
    if (timeValue <= 0) {
      finishGame();
      return;
    }
    createDrop();
  }, 1000);
}

function createDrop() {
  if (!gameRunning) return;

  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  let guh = Math.round(Math.random() + 1) % 2;
  if (guh == 0){
    drop.className = "water-drop";
  } else {
    drop.className = "bad-drop";
  }
  

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "3s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // clicking the drops
  drop.addEventListener("click", clickDrop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

function finishGame() {
  clearInterval(dropMaker);
  gameRunning = false;
  document.querySelectorAll(".water-drop").forEach((drop) => drop.remove());

  const result = scoreVal >= winThreshold ? "You win!" : "You lose!";
  messageLabel.textContent = `Game over! ${result} Your score: ${scoreVal}.`;
  messageLabel.hidden = false;
}

function clickDrop(event) {
  if (!gameRunning) return;

  let scot = parseInt(event.currentTarget.style.width,10);
  if (event.currentTarget.className == "bad-drop") {
    scot *= -1;
  }
  scoreVal += Math.round(scot * 0.1);
  scoreLabel.textContent = scoreVal;
  event.currentTarget.remove();
}

function resetGame() {
  scoreVal = 0;
  scoreLabel.textContent = scoreVal;
  timeValue = 30;
  timer.textContent = timeValue;
  gameRunning = false;
  startGame();
}