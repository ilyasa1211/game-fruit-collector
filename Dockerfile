ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

WORKDIR /home/game

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci

COPY . .

CMD [ "npm", "run", "build" ]