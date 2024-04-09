import { IFruit } from "../models/fruit";
import { IDrawer } from "../types";

export default class FruitDrawer implements IDrawer {
  public constructor(
    private models: IFruit[],
    private context: CanvasRenderingContext2D,
    private image: HTMLImageElement
  ) {}

  public draw(): void {
    this.models.forEach((fruit: IFruit, index: number) => {
      // TODO: separate the logic

      // let xFruitPos = fruit.positionX + PLAYER.width / 2 - PLAYER.height / 2;
      // let inAreaPosXCart =
      //   xFruitPos >
      //     playerColumnPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) &&
      //   xFruitPos <
      //     playerColumnPosition * (PLAYER.xPos - PLAYER.width / (COLUMN - 1)) +
      //       PLAYER.width;
      // let inAreaPosYCart =
      //   fruit.positionY + PLAYER.height / 2 >= PLAYER.yPos &&
      //   fruit.positionY < PLAYER.yPos + PLAYER.height / 2;
      // let insideCart = inAreaPosXCart && inAreaPosYCart;
      // let insideVoid = fruit.positionY >= canvas.height;

      // if (insideCart && !fruit.isCollected) {
      //   fruit.isCollected = true;
      //   SCORES += 10;
      // }
      // if (insideVoid && !fruit.hasCountAsLose && !fruit.isCollected) {
      //   fruit.hasCountAsLose = true;
      //   LIVES--;
      // }
      !fruit.isCollected &&
        this.context.drawImage(
          this.image,
          fruit.positionX,
          fruit.positionY,
          fruit.height,
          fruit.height
        );

      // fruit.positionY += FRUIT_DROP_SPEED;
    });
  }
}
