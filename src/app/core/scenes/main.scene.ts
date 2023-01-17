export class MainScene extends Phaser.Scene {
  sky: Phaser.GameObjects.Sprite;
  map: Phaser.Tilemaps.Tilemap;
  tileset: Phaser.Tilemaps.Tileset;
  layer: Phaser.Tilemaps.TilemapLayer;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  leftZone = new Phaser.Geom.Rectangle(-32, 0, 32, 480);
  rightZone = new Phaser.Geom.Rectangle(640, 0, 32, 480);
  flipTween: Phaser.Tweens.Tween;

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tiles', 'assets/tiles.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('wizard', 'assets/wizard.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.sky = this.add.sprite(0, 0, 'sky').setOrigin(0, 0);
    this.map = this.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('fantasy_tiles_by_surt', 'tiles');
    this.layer = this.map.createLayer('Tile Layer 1', this.tileset);
    this.physics.world.setBounds(0, 0, this.layer.width, this.layer.height);
    this.map.setCollision([
      217, 218, 511, 512, 247, 248, 251, 360, 171, 141, 328, 354, 355, 443, 413,
      383, 353, 138, 168, 224, 225, 514, 515, 516, 226, 227, 181,
    ]);

    this.player = this.physics.add.sprite(0, 384, 'wizard', 0);
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('wizard', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('wizard', {
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
      frameRate: 8,
    });
    this.player.setSize(28, 32);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.layer);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  override update() {
    this.player.body.velocity.x = 0;

    // if (this.flipTween && this.flipTween.isRunning) {
    //   return;
    // }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.play('right', true);
    } else {
      this.player.anims.stop();
    }

    // if (this.cursors.up.isDown && this.onLadder()) {
    //   this.player.body.velocity.y = -100;
    // } else if (this.cursors.down.isDown && this.onLadder()) {
    //   this.player.body.velocity.y = 100;
    // } else if (!this.onLadder()) {
    //   this.player.body.velocity.y = 0;
    // }

    if (this.player.body.velocity.x > 0 && this.player.x >= this.rightZone.x) {
      this.flipRight();
    } else if (
      this.player.body.velocity.x < 0 &&
      this.player.x <= this.leftZone.right
    ) {
      this.flipLeft();
    }
  }

  flipRight() {
    // if (this.cameras.main.x > this.physics.world.bounds.width - 640) {
    this.leftZone.x += 640;
    this.rightZone.x += 640;
    this.flipTween = this.add.tween({
      targets: this.cameras.main,
      duration: 500,
      ease: 'Linear',
      x: -640,
    });
    // }
  }

  flipLeft() {
    if (this.cameras.main.x < 0) {
      this.leftZone.x -= 640;
      this.rightZone.x -= 640;
      this.flipTween = this.add.tween({
        targets: this.cameras.main,
        duration: 500,
        ease: 'Linear',
        x: 0,
      });
    }
  }
}
