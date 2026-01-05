export const writeFile = (op) => {
  Deno.writeTextFileSync("./input.txt", op);
};

export const clearInputFile = () => Deno.writeTextFileSync("./input.txt", "");

export const readInputFile = () => Deno.readTextFileSync("./input.txt");
