type Direction = "up" | "down" | "left" | "right";
type SpritePack = { [dir in Direction]: PIXI.AnimatedSprite };

class Player extends PIXI.Container {
  sprites: SpritePack;

  constructor(sprites: SpritePack) {
    super();
    this.sprites = sprites;
    this.addChild(this.sprites["down"]);
  }
  removeSprites() {
    for (var s in this.sprites) {
      this.removeChild(this.sprites[s as Direction]);
    }
  }
  set(direction: Direction) {
    this.removeSprites();
    this.addChild(this.sprites[direction]);
  }
  playAnimation(direction: Direction) {
    this.removeSprites();
    this.addChild(this.sprites[direction]);
    this.sprites[direction].animationSpeed = 0.1;
    this.sprites[direction].play();
  }
  pauseAnimation() {
    for (var s in this.sprites) {
      this.sprites[s as Direction].stop();
    }
  }
}

export default Player;
