/**
 * MiniGame Studio - Boss Fight Framework (Vanilla JS)
 * Version: 3.0 (HIS Transformation Edition)
 */

class HISBossFight {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.config = config;

        // Game State
        this.playerHP = 100;
        this.bossHP = 100;
        this.status = 'loading'; // loading, playing, won, lost
        this.logs = ['[系統啟動] AXL 語義層已對齊，準備進入診所掛號戰場...'];

        // Assets
        this.assets = {
            bg: new Image(),
            player: new Image(),
            monster: new Image()
        };

        // Timing
        this.lastBossAttack = Date.now();
        this.nextAttackDelay = this.getRandomDelay();

        this.init();
    }

    getRandomDelay() {
        return Math.random() * 2000 + 2000; // 2-4 seconds
    }

    init() {
        let loadedCount = 0;
        const totalAssets = 3;
        const onAssetLoad = () => {
            loadedCount++;
            if (loadedCount === totalAssets) {
                this.status = 'playing';
                this.render();
                this.startBossAI();
            }
        };

        this.assets.bg.src = 'https://placehold.co/900x650/F5F0E8/6B4423.png?text=HIS+Battle+Field';
        this.assets.player.src = 'https://placehold.co/120x120/4CAF50/FFF.png?text=DRI';
        this.assets.monster.src = 'https://placehold.co/120x120/F44336/FFF.png?text=BOSS';

        [this.assets.bg, this.assets.player, this.assets.monster].forEach(img => {
            img.onload = onAssetLoad;
            img.onerror = () => {
                console.warn('Asset load failed, using fallbacks');
                onAssetLoad();
            };
        });

        // Controls
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') this.playerAttack();
        });
        this.canvas.addEventListener('mousedown', () => this.playerAttack());
    }

    playerAttack() {
        if (this.status !== 'playing') return;

        this.bossHP = Math.max(0, this.bossHP - 10);
        this.addLog(`[攻擊] 您執行了 AXL 串流優化，對 ${this.config.bossName} 造成 10 點傷害！`);
        
        if (this.bossHP <= 0) {
            this.status = 'won';
            this.addLog(`[勝利] ${this.config.bossName} 已被制服。`);
        }
    }

    startBossAI() {
        const loop = () => {
            if (this.status !== 'playing') return;

            const now = Date.now();
            if (now - this.lastBossAttack > this.nextAttackDelay) {
                this.bossAttack();
                this.lastBossAttack = now;
                this.nextAttackDelay = this.getRandomDelay();
            }
            requestAnimationFrame(loop);
        };
        loop();
    }

    bossAttack() {
        const damage = Math.floor(Math.random() * 10) + 5;
        this.playerHP = Math.max(0, this.playerHP - damage);
        this.addLog(`[警報] ${this.config.bossName} 發動「遺留邏輯衝突」，您的認知載荷增加 ${damage}！`);

        if (this.playerHP <= 0) {
            this.status = 'lost';
            this.addLog(`[失敗] 系統崩潰，請重啟 AXL 緩衝層。`);
        }
    }

    addLog(msg) {
        this.logs.push(msg);
        if (this.logs.length > 5) this.logs.shift();
    }

    render() {
        const { ctx, canvas, assets } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Background
        if (assets.bg.complete) {
            ctx.drawImage(assets.bg, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = '#F5F0E8';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Draw Entities (Game Area 60%)
        const gameHeight = canvas.height * 0.6;
        
        // Player (Left)
        ctx.drawImage(assets.player, 50, gameHeight - 150, 120, 120);
        this.drawHPBar(50, gameHeight - 170, this.playerHP, '人類 DRI');

        // Monster (Right)
        ctx.drawImage(assets.monster, canvas.width - 170, gameHeight - 150, 120, 120);
        this.drawHPBar(canvas.width - 170, gameHeight - 170, this.bossHP, this.config.bossName);

        // 3. Draw UI Area (40%)
        ctx.fillStyle = 'rgba(107, 68, 35, 0.1)';
        ctx.fillRect(0, gameHeight, canvas.width, canvas.height * 0.4);
        
        ctx.fillStyle = '#6B4423';
        ctx.font = '14px Arial';
        this.logs.forEach((log, i) => {
            ctx.fillText(log, 20, gameHeight + 30 + (i * 25));
        });

        // 4. Overlays
        if (this.status === 'won') {
            this.drawOverlay('任務成功', this.config.message);
        } else if (this.status === 'lost') {
            this.drawOverlay('系統潰敗', '請按 F5 重新注入 AXL 語義層');
        }

        if (this.status === 'playing' || this.status === 'won' || this.status === 'lost') {
            requestAnimationFrame(() => this.render());
        }
    }

    drawHPBar(x, y, hp, label) {
        const width = 120;
        const height = 10;
        // Background
        this.ctx.fillStyle = '#ddd';
        this.ctx.fillRect(x, y, width, height);
        // Foreground
        this.ctx.fillStyle = hp > 30 ? '#4CAF50' : '#F44336';
        this.ctx.fillRect(x, y, width * (hp / 100), height);
        // Label
        this.ctx.fillStyle = '#6B4423';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillText(label, x, y - 5);
    }

    drawOverlay(title, sub) {
        const { ctx, canvas } = this;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#F4A742';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = '#fff';
        ctx.font = '18px Arial';
        ctx.fillText(sub, canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = 'start';
    }
}

// Global Export
window.HISBossFight = HISBossFight;
