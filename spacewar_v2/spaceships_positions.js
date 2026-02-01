// import { createScreen } from "../src/grid.js";

const { width, height } = { height: 30, width: 40 };
export const playerCoor = [
  { x: Math.floor(width / 2), y: height - 5 },
  { x: Math.floor(width / 2), y: height - 4 },
  { x: Math.floor(width / 2), y: height - 3 },
  { x: Math.floor((width / 2) - 1), y: height - 4 },
  { x: Math.floor((width / 2) + 1), y: height - 4 },
];

export const enemyShip1 = [
  { x: 5, y: 7 },
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 6, y: 6 },
];

export const enemyShip2 = [
  { x: Math.floor((width + 5) / 2), y: height - 5 },
  { x: Math.floor((width + 5) / 2), y: height - 4 },
  { x: Math.floor((width + 5) / 2), y: height - 3 },
  { x: Math.floor((width + 5) / 2) - 1, y: height - 4 },
  { x: Math.floor((width + 5) / 2) + 1, y: height - 4 },
];
