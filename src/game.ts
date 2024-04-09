import Canvas from "./canvas";
import FruitDrawer from "./drawers/fruit-drawer";
import PlayerDrawer from "./drawers/player-drawer";
import GameConfig from "./game-config";
import GameState from "./game-state";

export default class Game {
  private lives: number;
  private score: number;

  public constructor(
    public state: GameState,
    private canvas: Canvas,
    private fruitDrawer: FruitDrawer,
    private playerDrawer: PlayerDrawer
  ) {
    this.lives = GameConfig.START_LIVES_DEFAULT;
    this.score = GameConfig.START_SCORE_DEFAULT;
  }

  public play(context: CanvasRenderingContext2D): void {
    this.canvas.clear();
    this.canvas.insertText("Scores : " + this.score, { y: 0 });

    const isLose: boolean = this.lives <= 0;
    const isWin: boolean = this.state.isWin();
    const isPerfect: boolean = this.state.isPerfectWin();
    const isGameOver: boolean = isLose || isWin;

    if (isGameOver) {
      let message = "Game Over!"; // It mean you lose if you recieve this message
      
      if (isWin) {
        message = isPerfect ? "Amazing Win!" : "You Win!";
      }

      this.canvas.insertText(message);

      window.clearInterval(this.state.spawner);

      return window.cancelAnimationFrame(this.state.startId);
    }

    this.canvas.insertText("Lives : " + this.lives);
    this.fruitDrawer.draw();
    this.playerDrawer.draw();

    this.state.startId = window.requestAnimationFrame(() => this.play(context));
  }
}
