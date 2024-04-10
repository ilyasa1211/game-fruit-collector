import Canvas from "./canvas";
import FruitDrawer from "./drawers/fruit-drawer";
import PlayerDrawer from "./drawers/player-drawer";
import Game from "./game";
import GameConfig from "./game-config";
import GameControl from "./game-control";
import GameState from "./game-state";
import Fruit, { IFruit } from "./models/fruit";
import Player from "./models/player";
import { TColumnPosition } from "./types";

const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;

if (!canvasElement.getContext("2d")) {
  throw new Error("Your browser does not support this action!");
}

export default class Main {
  public static main(): void {
    const playerImage = new Image();
    const fruitImage = new Image();

    playerImage.src =  "public/images/cart.png";
    fruitImage.src = "public/images/fruit.png";

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
    const fruitDrawers: Array<FruitDrawer> = [];

    const playerDrawer = new PlayerDrawer(player, canvas.context, playerImage);
    const gameState = new GameState(fruits, canvas.canvasElement);
    
    const game = new Game(
      gameState,
      canvas,
      fruitDrawers,
      playerDrawer,
      player,
      fruits
    );
    
    new GameControl(player);
    
    // start only when the image was loaded
    const start = () => {
      let i = 0;
      return () => {
        ++i;
        if (i == 2) {
          // spawn a fruit every specific time
          game.state.spawner = window.setInterval(
            () => Fruit.spawn(fruits, game, fruitDrawers, fruitImage),
            GameConfig.FRUIT_SPAWN_TIME
          );

          // game start
          game.state.startId = window.requestAnimationFrame(() => game.play());
        }
      };
    };

    const ready = start();

    playerImage.onload = ready;
    fruitImage.onload = ready;
  }
}
