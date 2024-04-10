import { TTextOptions } from "./types";

export default class Canvas {
  public context: CanvasRenderingContext2D;

  public constructor(
    public canvasElement: HTMLCanvasElement,
    public width: number,
    public height: number
  ) {
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    this.context = canvasElement.getContext("2d") as CanvasRenderingContext2D;
  }

  public clear(): void {
    this.context.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  public insertText(
    text: string,
    options: Partial<TTextOptions> = {}
  ): TextMetrics {
    if (typeof options.color === "undefined") {
      options.color = "white";
    }
    if (typeof options.size === "undefined") {
      options.size = 20;
    }

    this.context.font = options.size + "px Arial";

    let textMeasure = this.context.measureText(text);
    let horizontalCenter = this.canvasElement.width / 2 - textMeasure.width / 2;
    let verticalCenter =
      this.canvasElement.height / 2 - textMeasure.actualBoundingBoxAscent / 2;

    if (typeof options.x === "undefined") {
      options.x = horizontalCenter - textMeasure.actualBoundingBoxAscent;
    }
    if (typeof options.y === "undefined") {
      options.y = verticalCenter - textMeasure.actualBoundingBoxAscent;
    }

    this.context.fillStyle = options.color;
    this.context.fillText(
      text,
      options.x + textMeasure.actualBoundingBoxAscent,
      options.y + textMeasure.actualBoundingBoxAscent,
      textMeasure.width
    );

    return textMeasure;
  }
}
