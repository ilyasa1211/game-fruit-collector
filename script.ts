type Player = {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
};

type Fruit = {
  positionX: number;
  positionY: number;
  isCollected: boolean;
  hasCountAsLose: boolean;
};

type Ready = {
  player: boolean;
  fruit: boolean;
};

type Position = 1 | 2 | 3;

var canvas = document.querySelector("canvas") as HTMLCanvasElement;
var context = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = window.innerHeight;
canvas.width = 300;

var COLUMN: number = 3;
var FRAME_PER_SECOND: number = 60;
var FRUIT_SPAWN_TIME: number = 500;
var MAX_FRUIT_SPAWN: number = 100;
var LIVES: number = 3;
var SCORES: number = 0;
var playerPosition = Math.floor(COLUMN / 2) as Position;
var PLAYER: Player = {
  xPos: canvas.width / (COLUMN - 1),
  yPos: canvas.height - canvas.height / 10,
  width: canvas.width / COLUMN,
  height: 60,
};
const FRUITS: Array<Fruit> = [];

const playerImage = new Image();
const fruitImage = new Image();
playerImage.src = "./cart.png";
fruitImage.src = "./fruit.png";

const imageReady: Ready = {
  player: false,
  fruit: false,
};

let start: number | null = null;

playerImage.onload = () => {
  imageReady.player = true;
  checkReady(imageReady) && Start(context);
};
fruitImage.onload = () => {
  imageReady.fruit = true;
  checkReady(imageReady) && Start(context);
};
function checkReady({ fruit, player }: Ready): boolean {
  return fruit && player;
}
function Start(context: CanvasRenderingContext2D): void {
  if (typeof start !== "number") {
    start = window.requestAnimationFrame(() => game(context));
  }
}

function game(context: CanvasRenderingContext2D): void {
  clearCanvas(context);
  if (LIVES <= 0) {
    insertText(context, "Game Over", 50);
    return;
  }

  // scores
  insertText(context, "Scores : " + SCORES);
  insertText(context, "Lives : " + LIVES);

  // fruit
  FRUITS.forEach(
    (fruit: Fruit, index: number) => {
      let { positionX, positionY, isCollected, hasCountAsLose } = fruit;
      let xFruitPos = positionX + PLAYER.width / 2 - PLAYER.height / 2;
      let inAreaPosXCart = xFruitPos >
          playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
        xFruitPos <
          playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
            PLAYER.width;
      let inAreaPosYCart = positionY >= PLAYER.yPos &&
        positionY < PLAYER.yPos + PLAYER.height;
      let insideCart = inAreaPosXCart && inAreaPosYCart;
      let insideVoid = positionY >= canvas.height;
      if (insideCart && !isCollected) {
        SCORES += 10;
        FRUITS[index].isCollected = true;
      }
      if (insideVoid && !hasCountAsLose && !isCollected) {
        LIVES--;
        FRUITS[index].hasCountAsLose = true;
      }
      !isCollected && context.drawImage(
        fruitImage,
        xFruitPos,
        fruit.positionY += 5,
        PLAYER.height,
        PLAYER.height,
      );
    },
  );

  // player
  context.drawImage(
    playerImage,
    playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
    PLAYER.yPos,
    PLAYER.width,
    PLAYER.height,
  );
  start = window.requestAnimationFrame(() => game(context));
}

setInterval(() => {
  if (FRUITS.length >= MAX_FRUIT_SPAWN) return;
  let fruit: Fruit = {
    positionX: getIntegerRandomNumber(0, COLUMN) *
      (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
    positionY: 0,
    isCollected: false,
    hasCountAsLose: false,
  };
  FRUITS.push(fruit);
}, FRUIT_SPAWN_TIME);

window.onkeydown = (e: KeyboardEvent) => {
  let nextPosition = {
    ArrowLeft: Math.max(playerPosition - 1, 0),
    ArrowRight: Math.min(playerPosition + 1, COLUMN - 1),
  };
  let nextPos = nextPosition[e.key];
  typeof nextPos === "number" && (playerPosition = nextPos as Position);
};

function clearCanvas(context: CanvasRenderingContext2D): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function insertText(
  context: CanvasRenderingContext2D,
  text: string,
  textSize: number = 20,
): TextMetrics {
  context.font = textSize + "px Arial";
  context.fillStyle = "white";
  let textMeasure = context.measureText(text);
  context.fillText(
    text,
    canvas.width / 2 - textMeasure.width / 2,
    canvas.height / 2 - textMeasure.actualBoundingBoxAscent / 2,
    textMeasure.width,
  );
  return textMeasure;
}

function getIntegerRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
