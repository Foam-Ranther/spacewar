1. build a space craft on the screen.
2. make that space craft move left and right. 
3. create a stream of block getting released from head of the plane. 
  - move that block upwards.
  - When it hits the edge it vanishes
# approch : 
1. create a async function that release a block (bullet).

# Ideas : 
1. Implement a class for starship so that you can build them with that class
  - class can take coordinate as argument to build a different size space ship. 
  - class can also take head direction as an argument, Whereever the head is it will emiit bullets. 
  - Class can also take nozzel as an argument, to specify the amount of bullets and angle to towards which they should be released. 
  - Functions Contains by spaceship class. 
  1. move : update the coordinates of the starship according to the move provided through input. 
  2. updateOnScreen : update the coordinates of the spaceship into screen. Will this be a good idea ? because for this to work we need to pass the screen reference to the space ship instance. is it the responsibility of the spaceship to handle the udpation part ? 
  3. updateBulletsPostion : this function will update the bullets position. 
  4. the ship will also contain the argument called hitCount, which keep the track of how many bullets have been hit. 
  5. Also have alive status, if alive status is false then ship dies. 