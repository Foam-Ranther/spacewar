
export class Spaceship {
  constructor(
    spaceshipPos, 
    isAlive = true, 
    speed = 1, 
    bulletDir = "w",
    inputMode = "automatic",
    hitCount = 0
  ) {
    this.spaceshipPos = spaceshipPos; 
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
