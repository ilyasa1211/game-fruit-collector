import Canvas from "../canvas";
import FruitDrawer from "../drawers/fruit-drawer";
import Game from "../game";
import GameConfig from "../game-config";
import Utilities from "../utilities";
import { IPlayer } from "./player";

export interface IFruit {
  positionX: number;
  positionY: number;
  //   width: number;
  height: number;
  isCollected: boolean;
  hasCountAsLoose: boolean;
  move: (game: Game, player: IPlayer) => void;
}

export default class Fruit implements IFruit {
  public constructor(
    public positionX: number,
    public positionY: number = 0,
    // public width: number,
    public height: number = 60,
    public isCollected: boolean = false,
    public hasCountAsLoose: boolean = false
  ) {}

  public move(game: Game, player: IPlayer): void {
    const xFruitPos = this.positionX + player.width / 2 - this.height / 2;

    let inAreaPosXCart =
      xFruitPos >
        player.positionColumnIndex *
          (player.positionX - player.width / (GameConfig.COLUMN - 1)) &&
      xFruitPos <
        player.positionColumnIndex *
          (player.positionX - player.width / (GameConfig.COLUMN - 1)) +
          player.width;

    let inAreaPosYCart =
      this.positionY + this.height / 2 >= player.positionY &&
      this.positionY < player.positionY + this.height / 2;

    let insideCart = inAreaPosXCart && inAreaPosYCart;
    let insideVoid = this.positionY >= game.canvas.height;

    if (insideCart && !this.isCollected) {
      this.isCollected = true;
      game.score += GameConfig.SCORE_INCREMENT;
    }

    if (insideVoid && !this.hasCountAsLoose && !this.isCollected) {
      this.hasCountAsLoose = true;
      game.lives--;
    }

    this.positionY += GameConfig.FRUIT_DROP_SPEED;
  }

  public static spawn(
    fruits: IFruit[],
    game: Game,
    fruitDrawers: FruitDrawer[],
    image: HTMLImageElement
  ): void {
    if (fruits.length >= GameConfig.MAX_FRUIT_SPAWN) {
      return window.clearInterval(game.state.spawner);
    }

    const fruit = new Fruit(
      Utilities.getIntegerRandomNumber(0, GameConfig.COLUMN) *
        (game.player.positionX - game.player.width / (GameConfig.COLUMN - 1))
        
    );

    fruit.positionX = fruit.positionX + game.player.width / 2 - fruit.height / 2;

    const drawer = new FruitDrawer(fruit, game.canvas.context, image);

    fruits.push(fruit);
    fruitDrawers.push(drawer);
  }
}
