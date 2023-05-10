var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 300;
var COLUMN = 3;
var FRUIT_SPAWN_TIME = 500;
var MAX_FRUIT_SPAWN = 20;
var FRUIT_DROP_SPEED = 5;
var LIVES = 3;
var SCORES = 0;
var playerPosition = Math.floor(COLUMN / 2);
var PLAYER = {
    xPos: canvas.width / (COLUMN - 1),
    yPos: canvas.height - canvas.height / 10,
    width: canvas.width / COLUMN,
    height: 60,
};
var FRUITS = [];
var imageReady = {
    player: false,
    fruit: false,
};
var start = null;
var playerImage = new Image();
var fruitImage = new Image();
playerImage.onload = function () {
    imageReady.player = true;
    AllImageReady(imageReady) && Start(game, context);
};
fruitImage.onload = function () {
    imageReady.fruit = true;
    AllImageReady(imageReady) && Start(game, context);
};
playerImage.src = "./cart.png";
fruitImage.src = "./fruit.png";
window.onkeydown = function (e) {
    var nextPosition = {
        ArrowLeft: Math.max(playerPosition - 1, 0),
        ArrowRight: Math.min(playerPosition + 1, COLUMN - 1),
    };
    var nextPos = nextPosition[e.key];
    typeof nextPos === "number" && (playerPosition = nextPos);
};
function AllImageReady(_a) {
    var fruit = _a.fruit, player = _a.player;
    return fruit && player;
}
function Start(game, context) {
    typeof start !== "number" &&
        (start = window.requestAnimationFrame(function () { return game(context); }));
}
function game(context) {
    clearCanvas(context);
    insertText(context, "Scores : " + SCORES, { y: 0 });
    var isLose = LIVES <= 0;
    var isWin = checkWin();
    var isPerfect = isPerfectWin();
    var isGameOver = isLose || isWin;
    if (isGameOver) {
        var message = isWin
            ? isPerfect ? "Amazing Win!" : "You Win!"
            : "Game Over!";
        insertText(context, message);
        clearInterval(spawner);
        return window.cancelAnimationFrame(start);
    }
    insertText(context, "Lives : " + LIVES);
    drawFruit(context);
    drawPlayer(context);
    start = window.requestAnimationFrame(function () { return game(context); });
}
var spawner = setInterval(function spawnFruit() {
    if (FRUITS.length >= MAX_FRUIT_SPAWN)
        return clearInterval(spawner);
    var fruit = {
        positionX: getIntegerRandomNumber(0, COLUMN) *
            (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
        positionY: 0,
        isCollected: false,
        hasCountAsLose: false,
    };
    FRUITS.push(fruit);
}, FRUIT_SPAWN_TIME);
function clearCanvas(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function insertText(context, text, options) {
    if (options === void 0) { options = null; }
    !options && (options = {});
    typeof options.color === "undefined" && (options.color = "white");
    typeof options.size === "undefined" && (options.size = 20);
    context.font = options.size + "px Arial";
    var textMeasure = context.measureText(text);
    var horizontalCenter = canvas.width / 2 - textMeasure.width / 2;
    var verticalCenter = canvas.height / 2 -
        textMeasure.actualBoundingBoxAscent / 2;
    typeof options.x === "undefined" &&
        (options.x = horizontalCenter - textMeasure.actualBoundingBoxAscent);
    typeof options.y === "undefined" &&
        (options.y = verticalCenter - textMeasure.actualBoundingBoxAscent);
    context.fillStyle = options.color;
    context.fillText(text, options.x + textMeasure.actualBoundingBoxAscent, options.y + textMeasure.actualBoundingBoxAscent, textMeasure.width);
    return textMeasure;
}
function checkWin() {
    return (FRUITS.length === MAX_FRUIT_SPAWN) &&
        FRUITS[FRUITS.length - 1].positionY >= PLAYER.yPos + PLAYER.height / 2;
}
function isPerfectWin() {
    return checkWin() &&
        FRUITS.every(function (fruit) { return fruit.isCollected; });
}
function drawPlayer(context) {
    context.drawImage(playerImage, playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)), PLAYER.yPos, PLAYER.width, PLAYER.height / 2);
}
function drawFruit(context) {
    FRUITS.forEach(function (fruit, index) {
        var xFruitPos = fruit.positionX + PLAYER.width / 2 - PLAYER.height / 2;
        var inAreaPosXCart = xFruitPos >
            playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
            xFruitPos <
                playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
                    PLAYER.width;
        var inAreaPosYCart = fruit.positionY + PLAYER.height / 2 >= PLAYER.yPos &&
            fruit.positionY < PLAYER.yPos + PLAYER.height / 2;
        var insideCart = inAreaPosXCart && inAreaPosYCart;
        var insideVoid = fruit.positionY >= canvas.height;
        if (insideCart && !fruit.isCollected) {
            fruit.isCollected = true;
            SCORES += 10;
        }
        if (insideVoid && !fruit.hasCountAsLose && !fruit.isCollected) {
            fruit.hasCountAsLose = true;
            LIVES--;
        }
        !fruit.isCollected &&
            context.drawImage(fruitImage, xFruitPos, fruit.positionY, PLAYER.height, PLAYER.height);
        fruit.positionY += FRUIT_DROP_SPEED;
    });
}
function getIntegerRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
