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

type TextOptions = {
  color: string | undefined;
  size: number | undefined;
  x: number | undefined;
  y: number | undefined;
};

type Position = 0 | 1 | 2;

var canvas = document.querySelector("canvas") as HTMLCanvasElement;
var context = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = window.innerHeight;
canvas.width = 300;

const COLUMN: number = 3;
const FRUIT_SPAWN_TIME: number = 500;
const MAX_FRUIT_SPAWN: number = 2;
var FRUIT_DROP_SPEED: number = 5;
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
const imageReady: Ready = {
  player: false,
  fruit: false,
};
var start: number | null = null;
const playerImage = new Image();
const fruitImage = new Image();

playerImage.onload = () => {
  imageReady.player = true;
  AllImageReady(imageReady) && Start(game, context);
};
fruitImage.onload = () => {
  imageReady.fruit = true;
  AllImageReady(imageReady) && Start(game, context);
};

playerImage.src = "./cart.png";
fruitImage.src = "./fruit.png";

window.onkeydown = (e: KeyboardEvent) => {
  let nextPosition = {
    ArrowLeft: Math.max(playerPosition - 1, 0),
    ArrowRight: Math.min(playerPosition + 1, COLUMN - 1),
  };
  let nextPos = nextPosition[e.key];
  typeof nextPos === "number" && (playerPosition = nextPos as Position);
};

function AllImageReady({ fruit, player }: Ready): boolean {
  return fruit && player;
}
function Start(
  game: (context: CanvasRenderingContext2D) => void,
  context: CanvasRenderingContext2D,
): void {
  typeof start !== "number" &&
    (start = window.requestAnimationFrame(() => game(context)));
}

function game(context: CanvasRenderingContext2D): void {
  clearCanvas(context);
  insertText(context, "Scores : " + SCORES, { y: 0 });
  const isLose: boolean = LIVES <= 0;
  const isWin: boolean = checkWin();
  const isPerfect: boolean = isPerfectWin();
  const isGameOver: boolean = isLose || isWin;
  if (isGameOver) {
    const message = isWin
      ? isPerfect ? "Amazing Win!" : "You Win!"
      : "Game Over!";
    insertText(context, message);
    clearInterval(spawner);
    return window.cancelAnimationFrame(start!);
  }
  insertText(context, "Lives : " + LIVES);
  drawFruit(context);
  drawPlayer(context);

  start = window.requestAnimationFrame(() => game(context));
}

let spawner: number = setInterval(function spawnFruit(): void {
  if (FRUITS.length >= MAX_FRUIT_SPAWN) return clearInterval(spawner);
  let fruit: Fruit = {
    positionX: getIntegerRandomNumber(0, COLUMN) *
      (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
    positionY: 0,
    isCollected: false,
    hasCountAsLose: false,
  };
  FRUITS.push(fruit);
}, FRUIT_SPAWN_TIME);

function clearCanvas(context: CanvasRenderingContext2D): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function insertText(
  context: CanvasRenderingContext2D,
  text: string,
  options: Partial<TextOptions> | null = null,
): TextMetrics {
  !options && (options = {});
  typeof options.color === "undefined" && (options.color = "white");
  typeof options.size === "undefined" && (options.size = 20);
  context.font = options.size + "px Arial";
  let textMeasure = context.measureText(text);
  let horizontalCenter = canvas.width / 2 - textMeasure.width / 2;
  let verticalCenter = canvas.height / 2 -
    textMeasure.actualBoundingBoxAscent / 2;
  typeof options.x === "undefined" &&
    (options.x = horizontalCenter - textMeasure.actualBoundingBoxAscent);
  typeof options.y === "undefined" &&
    (options.y = verticalCenter - textMeasure.actualBoundingBoxAscent);

  context.fillStyle = options.color;
  context.fillText(
    text,
    options.x + textMeasure.actualBoundingBoxAscent,
    options.y + textMeasure.actualBoundingBoxAscent,
    textMeasure.width,
  );
  return textMeasure;
}

function checkWin(): boolean {
  return (FRUITS.length === MAX_FRUIT_SPAWN) &&
    (FRUITS[FRUITS.length - 1].positionY > canvas.height ||
      FRUITS[FRUITS.length - 1].isCollected);
}
function isPerfectWin(): boolean {
  return checkWin() &&
    FRUITS.every((fruit) => fruit.isCollected);
}

function drawPlayer(context: CanvasRenderingContext2D): void {
  context.drawImage(
    playerImage,
    playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
    PLAYER.yPos,
    PLAYER.width,
    PLAYER.height / 2,
  );
}

function drawFruit(context: CanvasRenderingContext2D): void {
  FRUITS.forEach((fruit: Fruit, index: number) => {
    let xFruitPos = fruit.positionX + PLAYER.width / 2 - PLAYER.height / 2;
    let inAreaPosXCart = xFruitPos >
        playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
      xFruitPos <
        playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
          PLAYER.width;
    let inAreaPosYCart = fruit.positionY + PLAYER.height / 2 >= PLAYER.yPos &&
      fruit.positionY < PLAYER.yPos + PLAYER.height / 2;
    let insideCart = inAreaPosXCart && inAreaPosYCart;
    let insideVoid = fruit.positionY >= canvas.height;

    if (insideCart && !fruit.isCollected) {
      fruit.isCollected = true;
      SCORES += 10;
    }
    if (insideVoid && !fruit.hasCountAsLose && !fruit.isCollected) {
      fruit.hasCountAsLose = true;
      LIVES--;
    }
    !fruit.isCollected &&
      context.drawImage(
        fruitImage,
        xFruitPos,
        fruit.positionY,
        PLAYER.height,
        PLAYER.height,
      );
    fruit.positionY += FRUIT_DROP_SPEED;
  });
}

function getIntegerRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
