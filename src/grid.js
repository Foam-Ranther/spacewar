export const createScreen = ({height, width}, char) => {
  const screen = Array.from({length : height}, 
    () => Array.from({length : width}, () => char));
  return {screen, height, width}; 
}

export const renderScreen = (screen) => {
  return screen.map(row => row.join("")).join("\n");
}

export const drawOnScreen = ({screen, width}) => {
  console.clear(); 
  const renderedScreen = renderScreen(screen); 
  
  console.log("\n\n\n\n","-".repeat(width * 2),renderedScreen); 
}

export const updateCell = (screen, block, char) => 
  screen[block.y][block.x] = char

export const updateScreen = ({screen}, blocks, char) => {
  // console.log({blocks}); 
  blocks.map(block => updateCell(screen, block, char));
}

export const clearBlocksPosition = ({screen}, blocks) => {
 for (let i = 0; i < blocks.length; i++) {
  const element = blocks[i];
  console.log({element}); 
  screen[element.y][element.x] = " "; 
 }
}