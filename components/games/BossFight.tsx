'use client';

import { useState, useEffect } from 'react';

interface BossFightProps {
  bossName: string;
  message: string;
  onWin: () => void;
}

export default function BossFight({ bossName, message, onWin }: BossFightProps) {
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [log, setLog] = useState<string[]>(['戰鬥開始！對抗 ' + bossName]);

  const attack = () => {
    if (gameStatus !== 'playing') return;

    const damage = 10;
    setBossHP((prev) => Math.max(0, prev - damage));
    setLog((prev) => [...prev.slice(-4), `你發動攻擊，${bossName} 受到 ${damage} 點傷害！`]);

    if (bossHP - damage <= 0) {
      setGameStatus('won');
      onWin();
    } else {
      // Boss counter-attack
      setTimeout(() => {
        const bossDamage = Math.floor(Math.random() * 15);
        setPlayerHP((prev) => Math.max(0, prev - bossDamage));
        setLog((prev) => [...prev.slice(-4), `${bossName} 發動反擊，你受到 ${bossDamage} 點傷害！`]);
        
        if (playerHP - bossDamage <= 0) {
          setGameStatus('lost');
        }
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4 bg-secondary rounded-lg border-4 border-accent">
      <div className="w-full flex justify-between mb-8">
        {/* Player */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center border-4 border-blue-500 mb-2">
            <span className="text-4xl">👨‍⚕️</span>
          </div>
          <div className="w-32 bg-gray-200 h-4 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all" style={{ width: `${playerHP}%` }}></div>
          </div>
          <p className="font-bold text-accent">人類 DRI</p>
        </div>

        {/* VS */}
        <div className="flex items-center">
          <span className="text-4xl font-black text-red-600">VS</span>
        </div>

        {/* Boss */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center border-4 border-red-500 mb-2">
            <span className="text-4xl">🐲</span>
          </div>
          <div className="w-32 bg-gray-200 h-4 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full transition-all" style={{ width: `${bossHP}%` }}></div>
          </div>
          <p className="font-bold text-accent">{bossName}</p>
        </div>
      </div>

      <div className="flex-1 w-full bg-white bg-opacity-50 p-4 rounded border border-accent mb-4 overflow-y-auto">
        {log.map((line, i) => (
          <p key={i} className="text-sm text-accent mb-1">{line}</p>
        ))}
      </div>

      {gameStatus === 'playing' ? (
        <button 
          onClick={attack}
          className="px-8 py-4 bg-primary text-white font-bold text-2xl rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          發動 AXL 串流攻擊！
        </button>
      ) : gameStatus === 'won' ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2">勝利！</h2>
          <p className="text-accent italic">"{message}"</p>
        </div>
      ) : (
        <button 
          onClick={() => { setPlayerHP(100); setBossHP(100); setGameStatus('playing'); setLog(['重新戰鬥！']); }}
          className="px-8 py-4 bg-gray-500 text-white font-bold text-xl rounded-full"
        >
          重新嘗試
        </button>
      )}
    </div>
  );
}
