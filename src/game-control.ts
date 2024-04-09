import { IPlayer } from "./models/player";

export interface TwoMoveControl {
  moveLeft(): void;
  moveRight(): void;
}

export interface FourMoveControl extends TwoMoveControl {
  moveUp(): void;
  moveDown(): void;
}

export default class GameControl {
  public constructor(player: IPlayer) {
    window.onkeydown = (evt: KeyboardEvent) => {
      const action = {
        ArrowLeft: player.moveLeft,
        ArrowRight: player.moveRight,
      };

      return action[evt.key as keyof typeof action]();
    };
  }
}
