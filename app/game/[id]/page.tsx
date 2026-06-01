'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import BossFight from '@/components/games/BossFight';
import { useParams } from 'next/navigation';

export default function GamePage() {
  const params = useParams();
  const id = params.id as string;
  const [commission, setCommission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id.startsWith('mock-')) {
        // Mock data for demo
        setCommission({
          legacyStatus: 'talent-gap',
          desiredOutcome: 'icd-10',
          cognitivePainPoint: 'sensory-overload',
          decisionMode: '3s-risk',
          strategyPath: 'ai-embed',
          gameType: 'boss-fight'
        });
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'commissions', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCommission(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-secondary text-accent">載入中...</div>;
  if (!commission) return <div className="min-h-screen flex items-center justify-center bg-secondary text-accent">找不到委託資料</div>;

  // Map outcome to Boss name
  const bossMap: any = {
    'icd-10': 'ICD-10 編碼混亂怪',
    'billing': '財務對帳迷宮',
    'prediction': '掛號變動風暴',
    'defensive-record': '法規合規審計魔'
  };

  const bossName = bossMap[commission.desiredOutcome] || '遺留系統幽靈';
  const successMessage = "轉型成功！您已實現 3 秒風險辨識的 Trinity 境界。";

  return (
    <main className="min-h-screen bg-secondary p-4 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-accent">HIS 轉型冒客：控制艙</h1>
        <div className="text-sm bg-accent text-white px-3 py-1 rounded">
          委託 ID: {id}
        </div>
      </header>

      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-primary">
        <div className="h-[60%] bg-blue-50 relative">
          {/* 遊戲區 */}
          <BossFight 
            bossName={bossName} 
            message={successMessage}
            onWin={() => console.log('Won!')}
          />
        </div>
        <div className="h-[40%] bg-white p-6 border-t-4 border-primary overflow-y-auto">
          {/* UI 決策區 / 資訊區 */}
          <h2 className="text-xl font-bold text-accent mb-4 underline decoration-primary underline-offset-4">戰略部署概要</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary p-3 rounded border border-primary">
              <p className="text-xs text-gray-500 uppercase tracking-wider">目前痛點</p>
              <p className="text-accent font-medium">{commission.cognitivePainPoint}</p>
            </div>
            <div className="bg-secondary p-3 rounded border border-primary">
              <p className="text-xs text-gray-500 uppercase tracking-wider">核心目標</p>
              <p className="text-accent font-medium">{commission.desiredOutcome}</p>
            </div>
            <div className="bg-secondary p-3 rounded border border-primary">
              <p className="text-xs text-gray-500 uppercase tracking-wider">決策模式</p>
              <p className="text-accent font-medium">{commission.decisionMode}</p>
            </div>
            <div className="bg-secondary p-3 rounded border border-primary">
              <p className="text-xs text-gray-500 uppercase tracking-wider">戰略路徑</p>
              <p className="text-accent font-medium">{commission.strategyPath}</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('連結已複製，快傳給陳主任看！');
            }}
            className="mt-6 w-full py-2 border-2 border-accent text-accent font-bold rounded hover:bg-accent hover:text-white transition-colors"
          >
            分享轉型成果
          </button>
        </div>
      </div>
    </main>
  );
}
