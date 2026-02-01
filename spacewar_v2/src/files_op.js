export const writeFile = (op) => {
  Deno.writeTextFileSync("./input.txt", op);
};

export const clearInputFile = () => Deno.writeTextFileSync("./input.txt", "");
// const readable = Deno.stdin.readable.getReader()
export const readInputFile = () => readable.read;
