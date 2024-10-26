// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

// Game elements
let score = 0;
let gameInterval;
let meteors = [];
let stars = [];

// Spaceship object
const spaceship = {
  x: 225,
  y: 600,
  width: 50,
  height: 50,
  speed: 5,
  moveLeft() {
    if (this.x > 0) this.x -= this.speed;
  },
  moveRight() {
    if (this.x + this.width < canvas.width) this.x += this.speed;
  },
};

// Create a meteor
function createMeteor() {
  const size = Math.random() * 50 + 20;
  meteors.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: Math.random() * 2 + 2,
  });
}

// Create a star
function createStar() {
  stars.push({
    x: Math.random() * (canvas.width - 20),
    y: -20,
    width: 20,
    height: 20,
    speed: 2,
  });
}

// Update elements
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw spaceship
  ctx.fillStyle = "white";
  ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);

  // Draw and update meteors
  meteors.forEach((meteor, index) => {
    meteor.y += meteor.speed;
    ctx.fillStyle = "gray";
    ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height);

    // Check for collision with spaceship
    if (isColliding(spaceship, meteor)) {
      endGame();
    }

    // Remove off-screen meteors
    if (meteor.y > canvas.height) meteors.splice(index, 1);
  });

  // Draw and update stars
  stars.forEach((star, index) => {
    star.y += star.speed;
    ctx.fillStyle = "yellow";
    ctx.fillRect(star.x, star.y, star.width, star.height);

    // Check for star collection
    if (isColliding(spaceship, star)) {
      score++;
      document.getElementById("score").textContent = score;
      stars.splice(index, 1); // Remove collected star
    }

    // Remove off-screen stars
    if (star.y > canvas.height) stars.splice(index, 1);
  });
}

// Collision detection function
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Game loop
function gameLoop() {
  update();
  if (Math.random() < 0.05) createMeteor();
  if (Math.random() < 0.02) createStar();
}

// Start the game
function startGame() {
  score = 0;
  meteors = [];
  stars = [];
  document.getElementById("score").textContent = score;
  gameInterval = setInterval(gameLoop, 30);
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  alert(`Game Over! Your final score is ${score}`);
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") spaceship.moveLeft();
  if (e.key === "ArrowRight") spaceship.moveRight();
});

// Start button event
document.getElementById("startButton").addEventListener("click", startGame);
