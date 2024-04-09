export type TReady = {
  player: boolean;
  fruit: boolean;
};

export type TTextOptions = {
  color: string | undefined;
  size: number | undefined;
  x: number | undefined;
  y: number | undefined;
};

// TODO: make this dynamic somehow, related to game column count
export type TColumnPosition = 0 | 1 | 2;

export interface IDrawer {
    draw(context: CanvasRenderingContext2D): void
}
