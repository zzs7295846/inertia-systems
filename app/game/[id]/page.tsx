'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default function GameSessionPage() {
  const params = useParams();
  const id = params.id as string;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [commission, setCommission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gameInitialized, setGameInitialized] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id.startsWith('mock-')) {
          setCommission({
            desiredOutcome: 'icd-10',
            cognitivePainPoint: '感官過載',
            decisionMode: '3s-risk',
            strategyPath: 'ai-embed',
            gameType: 'boss-fight',
            message: '轉型成功！您已實現 3 秒風險辨識。'
          });
        } else {
          const docRef = doc(db, 'commissions', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCommission(docSnap.data());
          }
        }
      } catch (e) {
        console.error("Fetch error:", e);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // 2. Initialize Game when Script and Data are ready
  const initGame = () => {
    if (!commission || !canvasRef.current || typeof window.HISBossFight === 'undefined') return;

    // Map outcome to Boss name (語義對齊)
    const bossMap: any = {
      'icd-10': 'ICD-10 編碼混亂怪',
      'billing': '財務對帳迷宮',
      'prediction': '掛號變動風暴',
      'defensive-record': '法規合規審計魔'
    };

    const config = {
      bossName: bossMap[commission.desiredOutcome] || '遺留系統幽靈',
      message: commission.message || "我們都這樣過來的，放手做！",
      onWin: () => {
        console.log("Victory achieved!");
        // 可以在這裡觸發額外的 UI 反饋
      }
    };

    new window.HISBossFight(canvasRef.current.id, config);
    setGameInitialized(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-secondary">載入中...</div>;
  if (!commission) return <div className="min-h-screen flex items-center justify-center bg-secondary">找不到委託資料</div>;

  return (
    <main className="min-h-screen bg-secondary p-4 flex flex-col items-center">
      <Script 
        src="/games/boss-fight.js" 
        onLoad={initGame}
      />

      {/* 控制艙標頭 */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-accent tracking-tighter">HIS 轉型控制艙</h1>
          <p className="text-xs text-accent opacity-60">SESSION ID: {id}</p>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('連結已複製，快傳給陳主任看！');
          }}
          className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-primary transition-colors shadow-md"
        >
          分享轉型成果
        </button>
      </header>

      {/* 遊戲與決策區塊 */}
      <div className="w-full max-w-4xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-accent relative">
        <canvas 
          id="activeGameCanvas" 
          ref={canvasRef}
          width={900} 
          height={650}
          className="w-full h-full"
        />
        
        {!gameInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <button 
              onClick={initGame}
              className="px-10 py-5 bg-primary text-white text-2xl font-black rounded-full animate-bounce"
            >
              啟動轉型冒險
            </button>
          </div>
        )}
      </div>

      {/* 戰略概要 (給陳主任看的 Judgement 基礎) */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border-2 border-accent shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">當前痛點</h3>
          <p className="text-accent font-bold">{commission.cognitivePainPoint || '系統黑盒子'}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-accent shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">決策模式</h3>
          <p className="text-accent font-bold">{commission.decisionMode || '3秒風險辨識'}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-accent shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">戰略路徑</h3>
          <p className="text-accent font-bold">{commission.strategyPath || 'AI 代理人嵌入'}</p>
        </div>
      </div>
    </main>
  );
}

// 擴充 window 型別
declare global {
  interface Window {
    HISBossFight: any;
  }
}
