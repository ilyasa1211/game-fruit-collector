import Canvas from "./canvas";
import FruitDrawer from "./drawers/fruit-drawer";
import PlayerDrawer from "./drawers/player-drawer";
import Game from "./game";
import GameConfig from "./game-config";
import GameState from "./game-state";
import Fruit, { IFruit } from "./models/fruit";
import Player from "./models/player";
import { TColumnPosition, TReady } from "./types";
import Utilities from "./utilities";

const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;

if (!canvasElement.getContext("2d")) {
  throw new Error("Your browser does not support this action!");
}

export default class Main {
  public static main(): void {
    const playerImage = new Image();
    const fruitImage = new Image();

    playerImage.src = "../public/images/cart.png";
    fruitImage.src = "../public/images/fruit.png";

    const canvas = new Canvas(
      canvasElement,
      GameConfig.CANVAS_WIDTH,
      GameConfig.CANVAS_HEIGHT
    );

    const player = new Player(
      canvas.width / (GameConfig.COLUMN - 1),
      canvas.height - canvas.height / 10,
      canvas.width / GameConfig.COLUMN,
      60,
      Math.floor(GameConfig.COLUMN / 2) as TColumnPosition
    );

    const fruits: Array<IFruit> = [];

    const playerDrawer = new PlayerDrawer(player, canvas.context, playerImage);
    const fruitDrawer = new FruitDrawer(fruits, canvas.context, fruitImage);
    const gameState = new GameState(fruits, canvas.canvasElement);
    const game = new Game(gameState, canvas, fruitDrawer, playerDrawer);

    // spawn a fruit every specific time
    game.state.spawner = setInterval(function spawnFruit(): void {
      if (fruits.length >= GameConfig.MAX_FRUIT_SPAWN) {
        return clearInterval(game.state.spawner);
      }

      const fruit = new Fruit(
        Utilities.getIntegerRandomNumber(0, GameConfig.COLUMN) *
          (player.positionX - player.width / (GameConfig.COLUMN - 1)),
        0,
        60,
        false,
        false
      );

      fruits.push(fruit);
    }, GameConfig.FRUIT_SPAWN_TIME);

    // start only when the image was loaded
    function ok() {
      let i = 0;
      return () => {
        ++i;
        if (i == 2) {
          game.state.startId = window.requestAnimationFrame(() => game.play(canvas.context));
        }
      };
    }

    const o = ok();

    playerImage.onload = o;
    fruitImage.onload = o;
  }
}
