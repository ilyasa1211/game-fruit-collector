import GameConfig from "./game-config";
import { IFruit } from "./models/fruit";

export default class GameState {
  public spawner: NodeJS.Timeout;
  public startId: number;
  public constructor(
    private fruits: IFruit[],
    private canvas: HTMLCanvasElement
  ) {}
  public isWin(): boolean {
    return (
      this.fruits.length === GameConfig.MAX_FRUIT_SPAWN &&
      (this.fruits[this.fruits.length - 1].positionY > this.canvas.height ||
        this.fruits[this.fruits.length - 1].isCollected)
    );
  }

  public isPerfectWin(): boolean {
    return this.isWin() && this.fruits.every((fruit) => fruit.isCollected);
  }
}
