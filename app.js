// define basics variables for canvas
const { body } = document;
const canvas = document.createElement('canvas');
const canvasCtx = canvas.getContext('2d');

const width = 400;
const height = 530;
const fieldColor = '#08a332';
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;
const gameOverEl = document.createElement('div');

// define variables for paddles
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 175;
let paddleTopX = 175;
let playerMoved = false;
let paddleContact = false;

// define variables for ball
let ballX = 200;
let ballY = 260;
const ballRadius = 7;

// define speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// define scores
let playerScore = 0;
let computerScore = 0;
const winningScore = 5;

// render all required pieces on canvas
function renderCanvas() {
  // Canvas Background
  canvasCtx.fillStyle = fieldColor;
  canvasCtx.fillRect(0, 0, width, height);

  // Paddle Color
  canvasCtx.fillStyle = 'white';

  // create players paddle on bottom
  canvasCtx.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

  // create computers paddle on top
  canvasCtx.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // create center line
  canvasCtx.beginPath();
  canvasCtx.setLineDash([5]);
  canvasCtx.moveTo(0, 260);
  canvasCtx.lineTo(400, 260);
  canvasCtx.strokeStyle = 'white';
  canvasCtx.stroke();

  // create ping-pongs ball
  canvasCtx.beginPath();
  canvasCtx.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fill();

  // create scores area
  canvasCtx.font = '28px Courier New';
  canvasCtx.fillText(playerScore, 10, canvas.height / 2 + 40);
  canvasCtx.fillText(computerScore, 10, canvas.height / 2 - 30);
}

// create canvas element
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.appendChild(canvas);
  renderCanvas();
}
createCanvas();
