
export class Spaceship {
  constructor(
    {
    spaceshipPos, 
    spaceshipChar,
    spaceshipLength, 
    spaceshipWidth, 
    isAlive = true, 
    speed = 1, 
    bulletDir = "w",
    inputMode = "automatic",
    hitCount = 0
  }
  ) {
    this.spaceshipWidth = spaceshipWidth; 
    this.spaceshipLength = spaceshipLength; 
    this.spaceshipPos = spaceshipPos; 
    this.spaceshipChar = spaceshipChar;
    this.isAlive = isAlive; 
    this.speed = speed; 
    this.bullets = []; 
    this.bulletDir = bulletDir;
    this.inputMode = inputMode;
    this.hitCount = hitCount; 
  }

  addBullet (bullet) {
    this.bullets.push(bullet); 
  }

  removeBullet () {
    this.bullets.shift(); 
  }

}
