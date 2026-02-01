import { createScreen, drawOnScreen, updateScreen } from "./src/grid.js";
import { readInputFile, writeFile } from "./src/files_op.js";
import { sample } from "@std/collections/sample";
import { Spaceship } from "./spaceship_class.js";
import { enemyShip1, playerCoor } from "./spaceships_positions.js";
let INPUT = "d"
const screenConfig = createScreen({ height: 30, width: 40 }, "  ");

const INTERVAL_TIME = 200;
const SPACESHIP_PIXEL = "✈️";
const BULLET_PIXEL = "💣";
const BG_PIXEL = "  ";

const getInput = () => {
  const move = readInputFile();
  return move;
};

const randomChoice = () => sample(["a", "d", "h"]);

const spaceshipModes = {
  "manual": getInput,
  "automatic": randomChoice,
};

export const isItOnLeft = (block, leftEdge) => block.x <= leftEdge;

const isBlockOnLeftEdge = (spaceship, leftEdge) =>
  spaceship.spaceshipPos.find((block) => isItOnLeft(block, leftEdge));

export const isItOnRight = (block, rightEdge) => block.x >= rightEdge;

const isBlockOnRightEdge = (spaceship, rightEdge) =>
  spaceship.spaceshipPos.find((block) => isItOnRight(block, rightEdge));

export const keepBlockWithinWidth = (block, start, end) => {
  console.log("inside width limit : ", block);
  if (block.x <= start) {
    // block.x = start;
    writeFile("h");
  }
  if (block.x >= end) {
    block.x = end;
    writeFile("h");
  }
};

const moveFns = {
  "a": (block, speed) => block.x = block.x - speed,
  "s": (block, speed) => block.y = block.y + speed,
  "d": (block, speed) => block.x = block.x + speed,
  "w": (block, speed) => block.y = block.y - speed,
  "h": () => {},
};

const movePlane = ({ height, width }, spaceship, move) => {
  if (isBlockOnLeftEdge(spaceship, 0) && move === "a") return;
  if (isBlockOnRightEdge(spaceship, width) && move === "d") return;

  for (const block of spaceship.spaceshipPos) {
    const moveFn = moveFns[move];
    moveFn(block, spaceship.speed);
    // keepBlockWithinHeight(block, 0, height);
    // keepBlockWithinWidth(block, 0, width);
  }
};

const moveBullets = ({ screen }, spaceship, move) => {
  for (const bullet of spaceship.bullets) {
    const moveFn = moveFns[move];
    moveFn(bullet, spaceship.speed);
    // if (screen[bullet.y][bullet.x] === SPACESHIP_PIXEL) {
    //   spaceship.hitCount++;
    // }
  }
};

const updateBullets = (screenConfig, spaceship) => {
  const newHead = { ...spaceship.spaceshipPos[0] };
  // console.log("new head", newHead);
  spaceship.addBullet(newHead);
  moveBullets(screenConfig, spaceship, spaceship.bulletDir);
};

const filterBullets = ({ height }, spaceship) => {
  const firstBullet = spaceship.bullets[0];
  // console.log({firstBullet});
  if (firstBullet.y <= 0 || firstBullet.y >= height) {
    spaceship.removeBullet();
  }
};

const animateBullets = (screenConfig, spaceship) => {
  // console.log("inside animate Bullets -> ", {spaceship : spaceship.bullets});
  updateScreen(screenConfig, spaceship.bullets, BG_PIXEL);
  updateBullets(screenConfig, spaceship);
  filterBullets(screenConfig, spaceship);
  updateScreen(screenConfig, spaceship.bullets, BULLET_PIXEL);
};

const animateSpaceship = (screenConfig, spaceship, inputMove) => {
  // console.log({spaceship});

  updateScreen(screenConfig, spaceship.spaceshipPos, BG_PIXEL);
  movePlane(screenConfig, spaceship, inputMove);
  updateScreen(screenConfig, spaceship.spaceshipPos, SPACESHIP_PIXEL);
};

const animate = (screenConfig, spaceship, input) => {
  animateSpaceship(screenConfig, spaceship, input);
  animateBullets(screenConfig, spaceship);
};

const animateSpaceships = (screenConfig, spaceships) => {
  for (const spaceship of spaceships) {
    // console.log(spaceship);
    animateSpaceship(screenConfig, spaceship);
  }
};

const checkIfLost = (spaceship, intervalId) => {
  if (spaceship.bulletCount >= 5) clearInterval(intervalId);
};

const decoder = new TextDecoder(); 



const play = async (screenConfig) => {
  const playerSpaceShip = new Spaceship(playerCoor, true, 1, "w", "manual");
  const eShip1 = new Spaceship(enemyShip1, true, 1, "s", "automatic");

  updateScreen(screenConfig, playerSpaceShip.spaceshipPos, SPACESHIP_PIXEL);
  drawOnScreen(screenConfig);
  Deno.stdin.setRaw(true, {cbreak : true}); 
  const readable = Deno.stdin.readable.getReader();
  let input = "a"; 
  const intervalId = setInterval( () => {
    readable.read().then((val) => {
      input = decoder.decode(val.value); 
    })

    animate(screenConfig, playerSpaceShip, input);
    animate(screenConfig, eShip1, input);
    checkIfLost(playerSpaceShip, intervalId);
    drawOnScreen(screenConfig);

  }, INTERVAL_TIME);
};

play(screenConfig);
