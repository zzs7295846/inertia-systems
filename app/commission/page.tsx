'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function CommissionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    legacyStatus: '',
    desiredOutcome: '',
    cognitivePainPoint: '',
    decisionMode: '',
    strategyPath: '',
    targetName: '', // 委託對象
    gameType: 'boss-fight', // 預設遊戲類型
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitting...', formData);
    
    // Simulate a slight delay for better UX
    const timer = setTimeout(() => {
      const mockId = 'mock-' + Math.random().toString(36).substr(2, 9);
      router.push(`/game/${mockId}`);
    }, 500);

    try {
      // Attempt Firebase only if config is not placeholders
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith('YOUR_')) {
        const docRef = await addDoc(collection(db, 'commissions'), {
          ...formData,
          createdAt: new Date(),
        });
        clearTimeout(timer);
        alert('委託已送出！');
        router.push(`/game/${docRef.id}`);
      }
    } catch (error) {
      console.error('Firebase error, falling back to mock:', error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-secondary">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-primary">
        <h1 className="text-3xl font-bold text-accent mb-6 text-center">啟動 HIS 轉型委託</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 2 欄位 */}
          
          <div>
            <label className="block text-accent font-semibold mb-2">1. 老舊系統維護現狀</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.legacyStatus}
              onChange={(e) => setFormData({...formData, legacyStatus: e.target.value})}
              required
            >
              <option value="">請選擇...</option>
              <option value="uncompilable">程式碼臃腫且已無法成功編譯</option>
              <option value="talent-gap">核心維護人才已出現斷層 (如 Delphi 專家退休)</option>
              <option value="risk-prone">系統小修小改即有癱瘓全院風險</option>
              <option value="sync-delay">法規調整需要數月才能完成同步</option>
            </select>
          </div>

          <div>
            <label className="block text-accent font-semibold mb-2">2. 您最希望由 AI 代理人「買斷」的工作成果</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.desiredOutcome}
              onChange={(e) => setFormData({...formData, desiredOutcome: e.target.value})}
              required
            >
              <option value="">請選擇...</option>
              <option value="icd-10">自動化 ICD-10 醫療編碼與合規申報</option>
              <option value="billing">自動化自費批價與財務帳務結算</option>
              <option value="prediction">診所掛號變動預測與感官引導</option>
              <option value="defensive-record">防禦性醫療紀錄 (Defensive Record) 的自動生成與審計</option>
            </select>
          </div>

          <div>
            <label className="block text-accent font-semibold mb-2">3. 對於 HIS 轉型最擔憂的「認知障礙」</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.cognitivePainPoint}
              onChange={(e) => setFormData({...formData, cognitivePainPoint: e.target.value})}
              required
            >
              <option value="">請選擇...</option>
              <option value="learning-curve">醫護人員面對新系統介面的學習曲線</option>
              <option value="sensory-overload">AI 生成介面過於頻繁造成的感官過載</option>
              <option value="risk-visibility">無法在第一時間 (3秒內) 抓出系統中的異常風險</option>
              <option value="tight-coupling">系統底層邏輯與 UI 深度耦合</option>
            </select>
          </div>

          <div>
            <label className="block text-accent font-semibold mb-2">4. 期望的「Trinity」決策控制模式</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.decisionMode}
              onChange={(e) => setFormData({...formData, decisionMode: e.target.value})}
              required
            >
              <option value="">請選擇...</option>
              <option value="3s-risk">3 秒風險辨識：僅標示 5% 高風險異常</option>
              <option value="dashboard">自動化控制艙：即時監看交接健康度</option>
              <option value="axl-sync">語義層對齊：數秒內完成全院邏輯同步</option>
              <option value="autopilot">全自動執行：僅在嚴重錯誤時通知</option>
            </select>
          </div>

          <div>
            <label className="block text-accent font-semibold mb-2">5. 預期的轉型戰略路徑</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.strategyPath}
              onChange={(e) => setFormData({...formData, strategyPath: e.target.value})}
              required
            >
              <option value="">請選擇...</option>
              <option value="vendor-swap">供應商置換 (Vendor Swap)</option>
              <option value="ai-embed">AI 代理人嵌入</option>
              <option value="reorg">組織重整 (Reorg)</option>
              <option value="dual-run">雙軌運行</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold text-xl rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
          >
            開始打造轉型冒險
          </button>
        </form>
      </div>
    </main>
  );
}
