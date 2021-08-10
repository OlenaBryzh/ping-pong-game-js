// define basics variables for canvas
const { body } = document;
const canvas = document.createElement('canvas');
const canvasCtx = canvas.getContext('2d');

const width = 500;
const height = 600;
const fieldColor = '#08a332';
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;
const isMobile = window.matchMedia('(max-width: 600px)');
const gameOverEl = document.createElement('div');

// define variables for paddles
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 225;
let paddleTopX = 225;
let playerMoved = false;
let paddleContact = false;
// define variables for ball
let ballX = 250;
let ballY = 300;
const ballRadius = 7;
// define speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// set mobile settings
if (isMobile.matches) {
  speedY = -2;
  speedX = speedY;
  computerSpeed = 4;
} else {
  speedY = -1;
  speedX = speedY;
  computerSpeed = 3;
}

// define scores
let playerScore = 0;
let computerScore = 0;
const winningScore = 5;

// render all required pieces on canvas
function renderCanvas() {
  // canvas cackground
  canvasCtx.fillStyle = fieldColor;
  canvasCtx.fillRect(0, 0, width, height);
  // paddle color
  canvasCtx.fillStyle = 'white';
  // create players paddle on bottom
  canvasCtx.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);
  // create computers paddle on top
  canvasCtx.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);
  // create center line
  canvasCtx.beginPath();
  canvasCtx.setLineDash([5]);
  canvasCtx.moveTo(0, 300);
  canvasCtx.lineTo(500, 300);
  canvasCtx.strokeStyle = 'white';
  canvasCtx.stroke();
  // create ping-pongs ball
  canvasCtx.beginPath();
  canvasCtx.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fill();
  // create scores area
  canvasCtx.font = '28px Courier New';
  canvasCtx.fillText(playerScore, 10, canvas.height / 2 + 50);
  canvasCtx.fillText(computerScore, 10, canvas.height / 2 - 30);
}
// create canvas element
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.appendChild(canvas);
  renderCanvas();
}

//createCanvas();

// set ball to center
function ballToCenter() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = -3;
  paddleContact = false;
}
// control balls movement
function ballMove() {
  // vertical Speed
  ballY += -speedY;
  // horizontal Speed
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }
}
// determine what ball collid with, set score points
function ballsCollision() {
  // collided with left wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  // collided with right wall
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }
  // collided with payers paddle
  if (ballY > height - paddleDiff) {
    if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
      paddleContact = true;
      // add speed on puddle hit
      if (playerMoved) {
        speedY -= 1;
        // max Speed
        if (speedY < -5) {
          speedY = -5;
          computerSpeed = 6;
        }
      }
      speedY = -speedY;
      trajectoryX = ballX - (paddleBottomX + paddleDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > height) {
      // set ball to center and add score to computer
      ballToCenter();
      computerScore++;
    }
  }
  // collided with computers paddle
  if (ballY < paddleDiff) {
    if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
      // add speed on puddle hit
      if (playerMoved) {
        speedY += 1;
        // max speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      speedY = -speedY;
    } else if (ballY < 0) {
      // set ball to center and add score to player
      ballToCenter();
      playerScore++;
    }
  }
}
// computers movement
function computerPlay() {
  if (playerMoved) {
    if (paddleTopX + paddleDiff < ballX) {
      paddleTopX += computerSpeed;
    } else {
      paddleTopX -= computerSpeed;
    }
  }
}
// call every required function to animate
function animate() {
  renderCanvas();
  ballMove();
  ballsCollision();
  computerPlay();
  
}
// start the game
function startGame() {
 
  playerScore = 0;
  computerScore = 0;
  ballToCenter();
  createCanvas();
  setInterval(animate, 1000/60);
  canvas.addEventListener('mousemove', (e) => {
    console.log(e.clientX);
    playerMoved = true;
    // compensate for canvas being centered
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    if (paddleBottomX < paddleDiff) {
      paddleBottomX = 0;
    }
    if (paddleBottomX > width - paddleWidth) {
      paddleBottomX = width - paddleWidth;
    }
    // make cursor hidden on the field
    canvas.style.cursor = 'none';
  });
}

// Loading
 startGame();
