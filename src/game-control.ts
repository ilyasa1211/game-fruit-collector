import { IPlayer } from "./models/player";

export interface TwoMoveControl {
  moveLeft(): void;
  moveRight(): void;
}

export default class GameControl {
  public constructor(player: IPlayer) {
    window.onkeydown = (evt: KeyboardEvent): void => {
      const actions = {
        ArrowLeft: player.moveLeft,
        ArrowRight: player.moveRight,
      };

      return actions[evt.key as keyof typeof actions]?.call(player);
    };
  }
}
