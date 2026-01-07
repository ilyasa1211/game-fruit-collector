import type Canvas from "./canvas";
import type FruitDrawer from "./drawers/fruit-drawer";
import type PlayerDrawer from "./drawers/player-drawer";
import type GameState from "./game-state";
import type { IFruit } from "./models/fruit";
import type { IPlayer } from "./models/player";
import GameConfig from "./settings";

export default class Game {
	public lives: number;
	public score: number;

	public constructor(
		public state: GameState,
		public canvas: Canvas,
		private fruitDrawers: FruitDrawer[],
		private playerDrawer: PlayerDrawer,
		public player: IPlayer,
		private fruits: IFruit[],
	) {
		this.lives = GameConfig.START_LIVES_DEFAULT;
		this.score = GameConfig.START_SCORE_DEFAULT;
	}

	public play(): void {
		this.canvas.clear();
		this.canvas.insertText(`Scores : ${this.score}`, { y: 0 });

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

			clearInterval(this.state.spawner);
			cancelAnimationFrame(this.state.startId);

			return;
		}

		this.canvas.insertText(`Lives : ${this.lives}`);

		this.fruits.forEach((fruit) => {
			fruit.move(this, this.player);
		});

		this.fruitDrawers.forEach((drawer) => {
			drawer.draw();
		});
		this.playerDrawer.draw();

		this.state.startId = requestAnimationFrame(() => this.play());
	}
}
