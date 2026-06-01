// Boss Fight Game Logic (Vanilla JS version for public/games)
class BossFight {
  constructor(canvasId, config) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.playerHP = 100;
    this.bossHP = 100;
    this.bossName = config.bossName || 'Monster';
    this.message = config.message || 'Victory!';
    this.onWin = config.onWin;
  }

  attack() {
    this.bossHP -= 10;
    if (this.bossHP <= 0) {
      this.onWin();
    }
  }

  // Draw loop and other logic...
}

console.log('Boss Fight framework loaded');
