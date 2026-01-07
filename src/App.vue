<script setup lang="ts">
import { onMounted, ref } from "vue";
import Canvas from "./canvas";
import type { TColumnPosition } from "./common/types";
import type FruitDrawer from "./drawers/fruit-drawer";
import PlayerDrawer from "./drawers/player-drawer";
import Game from "./game";
import GameState from "./game-state";
import KeyboardInput from "./input/keyboard";
import Fruit, { type IFruit } from "./models/fruit";
import Player from "./models/player";
import Settings from "./settings";
import playerImg from "./assets/images/cart.png";
import fruitImg from "./assets/images/fruit.png";

const canvasElement = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
	const canvasElem = canvasElement.value;
	if (!canvasElem) throw new Error("failed to get canvas element");

	const context = canvasElem.getContext("2d");
	if (!context) throw new Error("failed to retrieve rendering context");

	const playerImage = new Image();
	const fruitImage = new Image();

	playerImage.src = playerImg;
	fruitImage.src = fruitImg;

	const canvas = new Canvas(
		canvasElem,
		Settings.CANVAS_WIDTH,
		Settings.CANVAS_HEIGHT,
	);

	const player = new Player(
		canvas.width / (Settings.COLUMN - 1),
		canvas.height - canvas.height / 10,
		canvas.width / Settings.COLUMN,
		60,
		Math.floor(Settings.COLUMN / 2) as TColumnPosition,
	);

	const fruits: Array<IFruit> = [];
	const fruitDrawers: Array<FruitDrawer> = [];

	const playerDrawer = new PlayerDrawer(player, canvas.context, playerImage);
	const gameState = new GameState(fruits, canvas.canvasElement);

	const game = new Game(
		gameState,
		canvas,
		fruitDrawers,
		playerDrawer,
		player,
		fruits,
	);

	new KeyboardInput(player);

	// start only when the image was loaded
	const start = () => {
		let i = 0;
		return () => {
			++i;
			if (i === 2) {
				// spawn a fruit every specific time
				game.state.spawner = setInterval(
					() => Fruit.spawn(fruits, game, fruitDrawers, fruitImage),
					Settings.FRUIT_SPAWN_TIME,
				);

				// game start
				game.state.startId = requestAnimationFrame(() => game.play());
			}
		};
	};

	const ready = start();

	playerImage.addEventListener("load", ready);
	fruitImage.addEventListener("load",  ready);
});
</script>

<template>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped>
</style>
