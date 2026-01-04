import { createScreen, drawOnScreen, updateScreen } from "./src/grid.js";
import { keepBlockWithinWidth, keepBlockWithinHeight } from "./space_war.js";
const screenConfig = createScreen({ height: 20, width: 20 }, "  ");
const { width, height } = screenConfig;

const PLANE_PIXEL = "⬜️";
const BULLET_PIXEL = "💣";
const BG_PIXEL = "  ";
const shipCoor1 = [
  { x: Math.floor(width / 2), y: height - 5 },
  { x: Math.floor(width / 2), y: height - 4 },
  { x: Math.floor(width / 2), y: height - 3 },
  { x: Math.floor((width / 2) - 1), y: height - 4 },
  { x: Math.floor((width / 2) + 1), y: height - 4 },
];

const shipCoor2 = [
  { x: Math.floor((width + 5) / 2), y: height - 5 },
  { x: Math.floor((width + 5) / 2), y: height - 4 },
  { x: Math.floor((width + 5) / 2), y: height - 3 },
  { x: Math.floor((width + 5) / 2) - 1, y: height - 4 },
  { x: Math.floor((width + 5) / 2) + 1, y: height - 4 },
];

const moveFns = {
  "a": (block, speed) => block.x = block.x - speed,
  "s": (block, speed) => block.y = block.y + speed,
  "d": (block, speed) => block.x = block.x + speed,
  "w": (block, speed) => block.y = block.y - speed,
  "h": () => {},
};

const movePlane = ({ height, width }, spaceship, move) => {
  for (const block of spaceship.spaceShipPos) {
    const moveFn = moveFns[move];
    moveFn(block, spaceship.speed);
    keepBlockWithinHeight(block, 0, height);
    keepBlockWithinWidth(block, 0, width);
  }
};

class Spaceship {
  constructor(spaceshipPos, isAlive = true, speed = 1) {
    this.spaceShipPos = spaceshipPos; 
    this.isAlive = isAlive; 
    this.speed = speed; 
    this.bullets = []; 
  }

  addBullet (bullet) {
    this.bullets.push(bullet); 
  }

  removeBullet () {
    this.bullets.shift(); 
  }

}

const animateSpaceship = (screenConfig, spaceship) => {
  const inputMove = prompt(">> "); 
  console.log({spaceship});
  updateScreen(screenConfig, spaceship.spaceShipPos, BG_PIXEL);
  movePlane(screenConfig, spaceship, inputMove);
  updateScreen(screenConfig, spaceship.spaceShipPos, PLANE_PIXEL);
};

const animateSpaceships = (screenConfig, spaceships) => {
  for (const spaceship of spaceships) {
    console.log(spaceship);
    animateSpaceship(screenConfig, spaceship)
  }
}

const test = (screenConfig) => {
  const spaceship1 = new Spaceship(shipCoor1, true); 
  const spaceship2 = new Spaceship(shipCoor2, true); 
  const spaceships = [spaceship1, spaceship2]; 
  // updateScreen(screenConfig, spaceship1.spaceShipPos, PLANE_PIXEL);
  animateSpaceship(screenConfig, spaceships); 
  drawOnScreen(screenConfig);
  while(true) {
    animateSpaceships(screenConfig, spaceships); 
    drawOnScreen(screenConfig); 
  } 
};

test(screenConfig); 



