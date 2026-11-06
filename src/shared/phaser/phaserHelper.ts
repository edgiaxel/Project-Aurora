import Phaser from 'phaser';

export interface PhaserCanvasProps {
  sceneConfig: Phaser.Types.Scenes.CreateSceneFromObjectConfig | Phaser.Scene;
  width?: number | string;
  height?: number | string;
  className?: string;
  onSceneReady?: (scene: Phaser.Scene) => void;
}

export const defaultPhaserConfig = (
  parent: HTMLElement,
  scene: Phaser.Types.Scenes.SettingsConfig | Phaser.Scene | Phaser.Types.Scenes.CreateSceneFromObjectConfig
): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: '100%',
  height: '100%',
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene
});
