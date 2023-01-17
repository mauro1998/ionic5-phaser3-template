import * as Phaser from 'phaser';
import { GameOptions, getGameConfig } from './config';
import { MainScene } from './scenes/main.scene';

export class Game extends Phaser.Game {
  constructor(options: GameOptions) {
    const config = getGameConfig(options);
    super(
      Object.assign(config, {
        scene: MainScene,
      })
    );
  }
}
