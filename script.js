var body = document.body;
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
body.style.margin = 0;
canvas.style.backgroundColor = "rgb(46,46,46)";
canvas.height = innerHeight;
canvas.width = Math.min(innerWidth, 700);

body.appendChild(canvas);

var COLUMN = 3;
var FRAME_PER_SECOND = 60;
var FRUIT_SPAWN_TIME = 1000;
var MAX_FRUIT_SPAWN = 100;

var playerPosition = Math.floor(COLUMN / 2);
var PLAYER = {
  xPos: canvas.width / (COLUMN - 1),
  yPos: canvas.height - canvas.height / 10,
  width: canvas.width / COLUMN,
  height: 60,
};
var ARROW = {
  left: 37,
  right: 39,
};
const FRUITS = [];

const playerImage = new Image();
playerImage.src = "./cart.png";
playerImage.onload = () => {
  setInterval(() => {
    // clear screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    // fruit
    FRUITS.forEach((fruit, index) => {
      const [x, y, width, height] = fruit;
      context.beginPath();
      context.rect(
        x,
        y + PLAYER.height * (FRUITS.length - index),
        width,
        height
      );
      context.fillStyle = "white";
      context.fill();
    });

    // player
    context.drawImage(
      playerImage,
      playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
      PLAYER.yPos,
      PLAYER.width,
      PLAYER.height
    );
  }, 1000 / FRAME_PER_SECOND);

  setInterval(() => {
    if (FRUITS.length >= MAX_FRUIT_SPAWN) return;
    FRUITS.push([
      Math.round(getRandomNumber(0, COLUMN - 1)) *
        (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
      0,
      PLAYER.width,
      PLAYER.height,
    ]);
  }, FRUIT_SPAWN_TIME);
};

window.onkeydown = (e) => {
  if (e.keyCode === ARROW.left)
    playerPosition = Math.max(playerPosition - 1, 0);
  if (e.keyCode === ARROW.right)
    playerPosition = Math.min(playerPosition + 1, COLUMN - 1);
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
