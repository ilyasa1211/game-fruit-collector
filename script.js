var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 300;
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
var FRUITS = [];
var playerImage = new Image();
var fruitImage = new Image();
playerImage.src = "./cart.png";
fruitImage.src = "./fruit.png";
var imageReady = {
    player: false,
    fruit: false,
};
var start = null;
playerImage.onload = function () {
    imageReady.player = true;
    checkReady(imageReady) && Start(context);
};
fruitImage.onload = function () {
    imageReady.fruit = true;
    checkReady(imageReady) && Start(context);
};
function checkReady(_a) {
    var fruit = _a.fruit, player = _a.player;
    return fruit && player;
}
function Start(context) {
    if (typeof start !== "number") {
        start = window.requestAnimationFrame(function () { return game(context); });
    }
}
function game(context) {
    clearCanvas(context);
    if (LIVES <= 0) {
        insertText(context, "Game Over", 50);
        return;
    }
    // scores
    insertText(context, "Scores : " + SCORES);
    insertText(context, "Lives : " + LIVES);
    // fruit
    FRUITS.forEach(function (fruit, index) {
        var positionX = fruit.positionX, positionY = fruit.positionY, isCollected = fruit.isCollected, hasCountAsLose = fruit.hasCountAsLose;
        var xFruitPos = positionX + PLAYER.width / 2 - PLAYER.height / 2;
        var inAreaPosXCart = xFruitPos >
            playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
            xFruitPos <
                playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
                    PLAYER.width;
        var inAreaPosYCart = positionY >= PLAYER.yPos &&
            positionY < PLAYER.yPos + PLAYER.height;
        var insideCart = inAreaPosXCart && inAreaPosYCart;
        var insideVoid = positionY >= canvas.height;
        if (insideCart && !isCollected) {
            SCORES += 10;
            FRUITS[index].isCollected = true;
        }
        if (insideVoid && !hasCountAsLose && !isCollected) {
            LIVES--;
            FRUITS[index].hasCountAsLose = true;
        }
        !isCollected && context.drawImage(fruitImage, xFruitPos, fruit.positionY += 5, PLAYER.height, PLAYER.height);
    });
    // player
    context.drawImage(playerImage, playerPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)), PLAYER.yPos, PLAYER.width, PLAYER.height);
    start = window.requestAnimationFrame(function () { return game(context); });
}
setInterval(function () {
    if (FRUITS.length >= MAX_FRUIT_SPAWN)
        return;
    var fruit = {
        positionX: getIntegerRandomNumber(0, COLUMN) *
            (PLAYER.xPos - PLAYER.width / (COLUMN - 1)),
        positionY: 0,
        isCollected: false,
        hasCountAsLose: false,
    };
    FRUITS.push(fruit);
}, FRUIT_SPAWN_TIME);
window.onkeydown = function (e) {
    var nextPosition = {
        ArrowLeft: Math.max(playerPosition - 1, 0),
        ArrowRight: Math.min(playerPosition + 1, COLUMN - 1),
    };
    var nextPos = nextPosition[e.key];
    typeof nextPos === "number" && (playerPosition = nextPos);
};
function clearCanvas(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function insertText(context, text, textSize) {
    if (textSize === void 0) { textSize = 20; }
    context.font = textSize + "px Arial";
    context.fillStyle = "white";
    var textMeasure = context.measureText(text);
    context.fillText(text, canvas.width / 2 - textMeasure.width / 2, canvas.height / 2 - textMeasure.actualBoundingBoxAscent / 2, textMeasure.width);
    return textMeasure;
}
function getIntegerRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
