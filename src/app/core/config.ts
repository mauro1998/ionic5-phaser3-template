export interface GameOptions {
  parent: HTMLElement;
  width: number;
  height: number;
  backgroundColor?: string;
}

export function getGameConfig(
  options: GameOptions
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent: options.parent,
    backgroundColor: options.backgroundColor || '#fff',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {
          y: 300
        }
      },
    },
    scale: {
      width: options.width,
      height: options.height,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };
}
