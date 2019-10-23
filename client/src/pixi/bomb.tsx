const bombTime = 1000;

class Bomb extends PIXI.Container {
  app: PIXI.Application;
  sprite: PIXI.AnimatedSprite | undefined;
  explosion: PIXI.AnimatedSprite | undefined;
  constructor(app: PIXI.Application) {
    super();
    this.app = app;
    const bombRes = app.loader.resources["bomb"];
    if (bombRes && bombRes.textures) {
      this.sprite = new PIXI.AnimatedSprite([
        bombRes.textures[`image01.png`],
        bombRes.textures[`image02.png`],
        bombRes.textures[`image03.png`]
      ]);
      this.sprite.animationSpeed = 0.05;
      this.sprite.play();
      this.addChild(this.sprite);
      setTimeout(() => {
        this.explode();
      }, bombTime);
    }
  }
  explode() {
    if (this.sprite) this.removeChild(this.sprite);
    if (this.explosion) this.removeChild(this.explosion);
  }
}

export default Bomb;
