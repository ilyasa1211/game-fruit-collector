import type { IDrawer } from "../common/types";
import type { IFruit } from "../models/fruit";

export default class FruitDrawer implements IDrawer {
	public constructor(
		private model: IFruit,
		private context: CanvasRenderingContext2D,
		private image: HTMLImageElement,
	) {}

	public draw(): void {
		if (!this.model.isCollected) {
			this.context.drawImage(
				this.image,
				this.model.positionX,
				this.model.positionY,
				this.model.height,
				this.model.height,
			);
		}
	}
}
