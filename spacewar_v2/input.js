import { writeFile } from "./src/input.js";

const isMoveValid = (move) => ["a", "d", "h"].includes(move);

const input = () => {
  while (true) {
    const op = prompt("> ");
    // console.log(op);
    if (isMoveValid(op[0])) writeFile(op[0]);
  }
};

input();
