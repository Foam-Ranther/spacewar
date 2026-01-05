import { createScreen, drawOnScreen, updateScreen } from "./src/grid.js";
import { readInputFile, writeFile } from "./src/files_op.js";
import { sample } from "@std/collections/sample";

const screenConfig = createScreen({ height: 30, width: 40 }, "  ");
const { width, height } = screenConfig;

const INTERVAL_TIME = 200; 
const SPACESHIP_PIXEL = "⬜️";
const BULLET_PIXEL = "💣";
const BG_PIXEL = "  ";

const shipCoor1 = [
  { x: Math.floor(width / 2), y: height - 5 },
  { x: Math.floor(width / 2), y: height - 4 },
  { x: Math.floor(width / 2), y: height - 3 },
  { x: Math.floor((width / 2) - 1), y: height - 4 },
  { x: Math.floor((width / 2) + 1), y: height - 4 },
];

const manualTypedCoor = [
  { x: 5, y: 7 },
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 6, y: 6 },
]

const shipCoor2 = [
  { x: Math.floor((width + 5) / 2), y: height - 5 },
  { x: Math.floor((width + 5) / 2), y: height - 4 },
  { x: Math.floor((width + 5) / 2), y: height - 3 },
  { x: Math.floor((width + 5) / 2) - 1, y: height - 4 },
  { x: Math.floor((width + 5) / 2) + 1, y: height - 4 },
];

const getInput = () => {
  const move = readInputFile();
  return move;
};

const randomChoice = () => 
  sample(["a", "d", "h"]); 

const spaceshipModes = {
  "manual" : getInput, 
  "automatic": randomChoice
}

export class Spaceship {
  constructor(
    spaceshipPos, 
    isAlive = true, 
    speed = 1, 
    bulletDir = "w",
    spaceshipMode = "automatic",
    hitCount = 0
  ) {
    this.spaceshipPos = spaceshipPos; 
    this.isAlive = isAlive; 
    this.speed = speed; 
    this.bullets = []; 
    this.bulletDir = bulletDir;
    this.spaceshipMode = spaceshipMode;
    this.hitCount = hitCount; 
  }

  addBullet (bullet) {
    this.bullets.push(bullet); 
  }

  removeBullet () {
    this.bullets.shift(); 
  }

}


export const isItOnLeft = (block, leftEdge) => 
  block.x <= leftEdge;   


const isBlockOnLeftEdge = (spaceship, leftEdge) => 
  spaceship.spaceshipPos.find(block => isItOnLeft(block, leftEdge)); 

export const isItOnRight = (block, rightEdge) => 
  block.x >=rightEdge

const isBlockOnRightEdge = (spaceship, rightEdge) => 
  spaceship.spaceshipPos.find(block => isItOnRight(block, rightEdge)); 

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
  if (isBlockOnLeftEdge(spaceship, 0) && move === "a") return ; 
  if (isBlockOnRightEdge(spaceship, width) && move === "d") return ; 

  for (const block of spaceship.spaceshipPos) {
    const moveFn = moveFns[move];
    moveFn(block, spaceship.speed);
    // keepBlockWithinHeight(block, 0, height);
    // keepBlockWithinWidth(block, 0, width);
  }
};

const moveBullets = ({screen}, spaceship, move) => {
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

const filterBullets = ({height}, spaceship) => {
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

const animateSpaceship = (screenConfig, spaceship) => {
  // console.log({spaceship});
  const inputMove = spaceshipModes[spaceship.spaceshipMode](); 
  updateScreen(screenConfig, spaceship.spaceshipPos, BG_PIXEL);
  movePlane(screenConfig, spaceship, inputMove);
  updateScreen(screenConfig, spaceship.spaceshipPos, SPACESHIP_PIXEL); 
};

const animate = (screenConfig, spaceship) => {
  animateSpaceship(screenConfig, spaceship); 
  animateBullets(screenConfig, spaceship); 
}

const animateSpaceships = (screenConfig, spaceships) => {
  for (const spaceship of spaceships) {
    // console.log(spaceship);
    animateSpaceship(screenConfig, spaceship)
  }
}

const checkIfLost = (spaceship, intervalId) => {
  if (spaceship.bulletCount >= 5) clearInterval(intervalId); 
}

const test = (screenConfig) => {
  const playerSpaceShip = new Spaceship(shipCoor1, true, 1, "w", "manual");
  const spaceship2 = new Spaceship(manualTypedCoor, true, 1, "s", "automatic"); 
  // const spaceships = [spaceship1, spaceship2];
  // updateScreen(screenConfig, spaceship1.spaceShipPos, PLANE_PIXEL);
  updateScreen(screenConfig, playerSpaceShip.spaceshipPos,SPACESHIP_PIXEL ); 
  drawOnScreen(screenConfig);
  const intervalId = setInterval( () => {
    animate(screenConfig, playerSpaceShip); 
    animate(screenConfig, spaceship2); 
    checkIfLost(playerSpaceShip, intervalId); 
    drawOnScreen(screenConfig); 
  }, INTERVAL_TIME); 
};

test(screenConfig); 



