var body = document.body;
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
body.style.margin = 0;
body.style.overflow = "hidden";
canvas.style.backgroundColor = "rgb(46,46,46)";
canvas.height = innerHeight;
canvas.width = Math.min(innerWidth, 700);

body.appendChild(canvas);

var COLUMN = 3;
var FRAME_PER_SECOND = 60;
var FRUIT_SPAWN_TIME = 500;
var MAX_FRUIT_SPAWN = 100;
var LIVES = 3;
var SCORES = 0;

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
const FRUITS = []; // [xPosition, isCollected, hasCountInVoid]

const playerImage = new Image();
const fruitImage = new Image();
playerImage.src = "./cart.png";
fruitImage.src = "./fruit.png";

const imageReady = {
  player: false,
  fruit: false,
};
playerImage.onload = () => (imageReady.player = true);
fruitImage.onload = () => (imageReady.fruit = true);
setInterval(() => {
  if (!(imageReady.player && imageReady.fruit)) return;
  // clear screen
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (LIVES <= 0) {
    let text = "Game Over";
    let textMeasure = context.measureText(text);
    context.fillText(
      text,
      canvas.width / 2 - textMeasure.width / 2,
      canvas.height / 2 - textMeasure.actualBoundingBoxAscent / 2,
      textMeasure.width
    );
    return;
  }

  // scores
  context.fillStyle = "white";
  context.font = "20px Arial";
  let textScore = "Scores : " + SCORES;
  let textLife = "Lives : " + LIVES;
  let textScoreMeasure = context.measureText(textScore);
  context.fillText(
    textScore,
    0,
    textScoreMeasure.actualBoundingBoxAscent,
    textScoreMeasure.width
  );
  let textLifeMeasure = context.measureText(textLife);
  context.fillText(
    textLife,
    0,
    textScoreMeasure.actualBoundingBoxAscent +
      textLifeMeasure.actualBoundingBoxAscent,
    textLifeMeasure.width
  );

  // fruit
  FRUITS.forEach(([xPos, isCollected, hasCountInVoid], index) => {
    let xFruitPos = xPos + PLAYER.width / 2 - PLAYER.height / 2;
    let yFruitPos = PLAYER.height * (FRUITS.length - index);
    let inAreaPosXCart =
      xFruitPos >
        playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
      xFruitPos <
        playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
          PLAYER.width;
    let inAreaPosYCart =
      yFruitPos >= PLAYER.yPos && yFruitPos < PLAYER.yPos + PLAYER.height;
    let insideCart = inAreaPosXCart && inAreaPosYCart;
    let insideVoid = yFruitPos >= canvas.height;
    if (insideCart && !isCollected) {
      SCORES += 10;
      FRUITS[index][1] = true; // Set isCollected to true
    }
    if (insideVoid && !hasCountInVoid && !isCollected) {
      LIVES--;
      FRUITS[index][2] = true;
    }
    context.drawImage(
      fruitImage,
      xFruitPos,
      yFruitPos,
      PLAYER.height,
      PLAYER.height
    );
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
    false,
    false,
  ]);
}, FRUIT_SPAWN_TIME);

window.onkeydown = (e) => {
  if (e.keyCode === ARROW.left)
    playerPosition = Math.max(playerPosition - 1, 0);
  if (e.keyCode === ARROW.right)
    playerPosition = Math.min(playerPosition + 1, COLUMN - 1);
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
