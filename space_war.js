import {
  createScreen,
  drawOnScreen,
  updateCell,
  updateScreen,
} from "./src/grid.js";

import { clearInputFile, readInputFile, writeFile } from "./src/files_op.js";

const PLANE_PIXEL = "⬜️";
const BULLET_PIXEL = "💣";
const BG_PIXEL = "  ";
const screenConfig = createScreen({ height: 30, width: 70 }, BG_PIXEL);
const { width, height } = screenConfig;

const dbg = (x, msg) => {
  console.log(x);
  if (msg) {
    prompt(`${msg} (press enter)>>`);
  }
  return x;
};

const PLANE = [
  { x: width / 2, y: height - 5 },
  { x: width / 2, y: height - 4 },
  { x: width / 2, y: height - 3 },
  { x: (width / 2) - 1, y: height - 4 },
  { x: (width / 2) + 1, y: height - 4 },
  // {x : 4, y : 8},
  // {x : 6, y : 8}
];

const isMoveValid = (move) => ["w", "a", "s", "d", " "].includes(move);

const getInput = () => {
  const move = readInputFile();
  return move;
};

const moveFns = {
  "a": (block) => block.x = block.x - 1,
  "s": (block) => block.y = block.y + 1,
  "d": (block) => block.x = block.x + 1,
  "w": (block) => block.y = block.y - 1,
  "h": () => {},
};

export const keepBlockWithinHeight = (block, start, end) => {
  if (block.y < start) {
    writeFile("h");
  }
  if (block.y >= end) {
    writeFile("h");
  }
};

export const keepBlockWithinWidth = (block, start, end) => {
  if (block.x <= start) {
    writeFile("h");
  }
  if (block.x >= end - 1) {
    writeFile("h");
  }
};

const move = (plane, move) => {
  for (const ele of plane) {
    const moveFn = moveFns[move];
    moveFn(ele);
  }
};

const movePlane = (plane, move, { height, width }) => {
  for (const block of plane) {
    const moveFn = moveFns[move];
    moveFn(block);
    keepBlockWithinHeight(block, 0, height);
    keepBlockWithinWidth(block, 0, width);
  }
};

const updateBullets = (plane, bullets) => {
  move(bullets, "w");

  const newHead = { ...plane[0] };
  const moveUpward = moveFns["w"];
  moveUpward(newHead);
  bullets.push(newHead);
};

const filterBullets = (bullets) => {
  const firstBullet = bullets[0];
  if (firstBullet.y <= 0) {
    bullets.shift();
  }
};

const animateBullets = (plane, bullets, screenConfig) => {
  updateScreen(screenConfig, bullets, BG_PIXEL);
  updateBullets(plane, bullets);
  filterBullets(bullets);
  updateScreen(screenConfig, bullets, BULLET_PIXEL);
};

const animateSpaceShip = (screenConfig, plane) => {
  const inputMove = getInput();
  updateScreen(screenConfig, plane, BG_PIXEL);
  movePlane(plane, inputMove, screenConfig);

  updateScreen(screenConfig, plane, PLANE_PIXEL);
};

const start = (screenConfig, plane) => {
  const bullets = [];
  updateScreen(screenConfig, plane, PLANE_PIXEL);
  updateScreen(screenConfig, bullets, BULLET_PIXEL);
  drawOnScreen(screenConfig);

  setInterval(() => {
    animateSpaceShip(screenConfig, plane);
    animateBullets(plane, bullets, screenConfig);
    drawOnScreen(screenConfig);
  }, 200);
};

const test = () => {
  animateSpaceShip(screenConfig, PLANE);
  drawOnScreen(screenConfig);
  // console.log(PLANE);
};
start(screenConfig, PLANE);
// test();
