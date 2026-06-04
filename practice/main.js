import { Spaceship } from "./moving_block.js";
import { createScreen, drawOnScreen, updateScreen } from "./grid.js";

const screenConfig = createScreen({ height: 30, width: 40 }, "  ");

const moveFns = {
  "a": (block, speed) => block.x = block.x - speed,
  "s": (block, speed) => block.y = block.y + speed,
  "d": (block, speed) => block.x = block.x + speed,
  "w": (block, speed) => block.y = block.y - speed,
  "h": () => {},
};

const movePlane = (spaceship, move) => {
  for (const block of spaceship.spaceshipPos) {
    const moveFn = moveFns[move];
    moveFn(block, spaceship.speed);
  }
};

const moveBullets = (spaceship, move) => {
  for (const bullet of spaceship.bullets) {
    const moveFn = moveFns[move];
    moveFn(bullet, spaceship.speed);
  }
};

const updateBullets = (screenConfig, spaceship) => {
  const newHead = { ...spaceship.spaceshipPos[0] };
  spaceship.addBullet(newHead);
  moveBullets(screenConfig, spaceship, spaceship.bulletDir);
};

const filterBullets = ({ height }, spaceship) => {
  const firstBullet = spaceship.bullets[0];
  if (firstBullet.y <= 0 || firstBullet.y >= height) {
    spaceship.removeBullet();
  }
};

const animateBullets = (screenConfig, spaceship) => {
  updateScreen(screenConfig, spaceship.bullets, BG_PIXEL);
  updateBullets(screenConfig, spaceship);
  filterBullets(screenConfig, spaceship);
  updateScreen(screenConfig, spaceship.bullets, BULLET_PIXEL);
};

const animateSpaceship = (screenConfig, spaceship, inputMove) => {
  updateScreen(screenConfig, spaceship.spaceshipPos, BG_PIXEL);
  movePlane(screenConfig, spaceship, inputMove);
  updateScreen(screenConfig, spaceship.spaceshipPos, SPACESHIP_PIXEL);
};

const animate = (screenConfig, spaceship, input) => {
  animateSpaceship(screenConfig, spaceship, input);
  animateBullets(screenConfig, spaceship);
};

const decoder = new TextDecoder(); 

const play = (screenConfig) => {
  const playerSpaceShip = new Spaceship(playerCoor, true, 1, "w", "manual");
  const eShip1 = new Spaceship(enemyShip1, true, 1, "s", "automatic");

  updateScreen(screenConfig, playerSpaceShip.spaceshipPos, SPACESHIP_PIXEL);
  drawOnScreen(screenConfig);
  Deno.stdin.setRaw(true, {cbreak : true}); 
  const readable = Deno.stdin.readable.getReader();
  let input = "a"; 
  setInterval( () => {
    readable.read().then((val) => {
      input = decoder.decode(val.value); 
    })

    animate(screenConfig, playerSpaceShip, input);
    animate(screenConfig, eShip1, input);
    drawOnScreen(screenConfig);

  }, INTERVAL_TIME);
};

play(screenConfig);
