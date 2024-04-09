export interface IFruit {
  positionX: number;
  positionY: number;
//   width: number;
  height: number;
  isCollected: boolean;
  hasCountAsLose: boolean;
}

export default class Fruit implements IFruit {
  public constructor(
    public positionX: number,
    public positionY: number,
    // public width: number,
    public height: number,
    public isCollected: boolean,
    public hasCountAsLose: boolean
  ) {}
}
