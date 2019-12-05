
class Powerup extends PIXI.Container {
  app: PIXI.Application;
  sprite: PIXI.AnimatedSprite | undefined;
  isGrabbed: boolean;
  constructor(app: PIXI.Application) {
    super();
    this.app = app;
    this.isGrabbed = false;
    const bombRes = app.loader.resources["powerup"];
    if (bombRes && bombRes.textures) {
      this.sprite = new PIXI.AnimatedSprite([
        bombRes.textures[`power.png`]
      ]);
      this.sprite.animationSpeed = 0.05;
      this.sprite.play();
      this.addChild(this.sprite);
    }
  }
  removePower() {
    console.log("Asdas")
    if (this.sprite) {

      this.removeChild(this.sprite);
      this.isGrabbed = false;
    }
  }
}

export default Powerup;
