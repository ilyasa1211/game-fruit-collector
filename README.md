# Fruit Collector Game

Fruit is spawn from above, catch it, you only have 3 chance to fail!

![fruit](https://github.com/SiapaLupa/fruit-collector-game/assets/110075636/0f61601f-9329-45a4-b876-064e0cbce49d)

### Installation

1. Install node dependencies
```shell
npm install
```

2. Build
```shell
npm run build:prod
```

3. Copy html file
```shell
cp src/index.html dist/index.html
```

4. Open the dist/index.html

### Docker Build

1. Build image
```sh
docker build -t game-fruit-collector .
```

2. Run
```sh
docker run --rm --mount type=bind,source=$(PWD)/dist,target=/home/dist game-fruit-collector
```

3. On your directory, open the ./dist/index.html

### Todo

- Feat: Refresh when over
- Feat: Choose difficulty
- Feat: Custom configuration
- Add: Different types of fruit
- Add: Different types of basket (player)
- Feat: Multiplayer duel
