const getInput = () => {
  const move = readInputFile();
  return move;
};

const randomChoice = () => sample(["a", "d", "h"]);

const inputModes = {
  "manual": getInput,
  "automatic": randomChoice,
};
