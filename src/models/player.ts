import type { TColumnPosition } from "../common/types";
import type { TwoMoveControl } from "../input/keyboard";
import GameConfig from "../settings";

export interface IPlayer extends TwoMoveControl {
	positionX: number;
	positionY: number;
	width: number;
	height: number;
	positionColumnIndex: TColumnPosition;
}

export default class Player implements IPlayer {
	public constructor(
		public positionX: number,
		public positionY: number,
		public width: number,
		public height: number,
		public positionColumnIndex: TColumnPosition,
	) {}

	public moveLeft(): void {
		const nextPosition = Math.max(this.positionColumnIndex - 1, 0);

		this.positionColumnIndex = nextPosition as TColumnPosition;
	}

	public moveRight(): void {
		const nextPosition = Math.min(
			this.positionColumnIndex + 1,
			GameConfig.COLUMN - 1,
		);

		this.positionColumnIndex = nextPosition as TColumnPosition;
	}
}
