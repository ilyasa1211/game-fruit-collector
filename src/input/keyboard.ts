import type { IPlayer } from "../models/player";

export interface TwoMoveControl {
	moveLeft(): void;
	moveRight(): void;
}

export default class KeyboardInput {
	public constructor(player: IPlayer) {
		addEventListener("keydown", (evt: KeyboardEvent): void => {
			const actions = {
				ArrowLeft: player.moveLeft,
				ArrowRight: player.moveRight,
			};

			actions[evt.key as keyof typeof actions]?.call(player);
		});
	}
}
