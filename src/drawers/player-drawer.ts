import GameConfig from "../game-config";
import { IPlayer } from "../models/player";
import { IDrawer } from "../types";

export default class PlayerDrawer implements IDrawer {
  public constructor(
    private model: IPlayer,
    private context: CanvasRenderingContext2D,
    private image: HTMLImageElement
  ) {}

  public draw(): void {
    this.context.drawImage(
      this.image,
      this.model.positionColumnIndex *
        (this.model.positionX - this.model.width / (GameConfig.COLUMN - 1)),
      this.model.positionY,
      this.model.width,
      this.model.height / 2
    );
  }
}
