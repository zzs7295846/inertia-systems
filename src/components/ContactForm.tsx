import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  onStartCapture: () => void;
}

interface FormState {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
}

// 嚴格定義問題結構，讓 key 只能是 FormState 的其中一個欄位
interface QuestionItem {
  key: keyof FormState;
  title: string;
  label: string;
  isQ3: boolean;
}

export const ContactForm = ({ onStartCapture }: ContactFormProps) => {
  // ---- 1. 狀態與後端連線邏輯核心 ----
  const [step, setStep] = useState<number>(0); // 0: 初始畫面, 1~7: 引導問題
  const [formData, setFormData] = useState<FormState>({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 明確宣告 QuestionItem[] 型別，消除後續型別斷言(Type Assertion)的風險
  const questions: QuestionItem[] = [
    { key: 'q1', title: 'v2.0 / Q01', label: '用一句話告訴我，你今年最想達成的核心商業目標是什麼？', isQ3: false },
    { key: 'q2', title: 'v2.0 / Q02', label: '為了解決這個目標，你目前覺得最痛苦、卡最久的「盲點」或「人工流程」在哪裡？', isQ3: false },
    { key: 'q3', title: 'v2.0 / Q03', label: '如果在接下來的解法中只能二選一，你會優先保證「極致的效率自動化」還是「細膩的使用者體驗」？為什麼？', isQ3: true },
    { key: 'q4', title: 'v2.0 / Q04', label: '在這個流程中，最核心、絕對不能外流或出錯的敏感資料是什麼？（例如：客戶金流、進貨底價）', isQ3: false },
    { key: 'q5', title: 'v2.0 / Q05', label: '專案上線後，你要怎麼定義這個系統是「成功」的？（例如：回本週期、人力釋放比例等）', isQ3: false },
    { key: 'q6', title: 'v2.0 / Q06', label: '如果我們的 AI 導演在沙盒中模擬出顛覆你想像、但成本低一半的新路徑，你有多大的意願放手讓 AI 跑跑看？', isQ3: false },
    { key: 'q7', title: 'v2.0 / Q07', label: '我們不需要你重構現有系統，如果直接用 Agents 在前端即時渲染原型，你最快希望幾天內看到結果？', isQ3: false }
  ];

  const handleInputChange = (key: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5001/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert('規格需求已成功同步至沙盒系統（submissions.json）。');
        setStep(0); 
        setFormData({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' });
      } else {
        alert('同步失敗，請檢查後端服務狀態。');
      }
    } catch (error) {
      console.error('Dispatch failed:', error);
      alert('連線失敗，請確認後端 server.js 是否已在 localhost:5001 啟動。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 7) {
      handleSubmit();
    } else {
      setStep(prev => prev + 1);
    }
  };

  // ---- 2. 渲染邏輯 ----
  // Step 0: 完美回歸原廠初始按鈕外觀
  if (step === 0) {
    return (
      <section className="py-48 px-6 max-w-3xl mx-auto border-t border-white/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-surgeon-white italic">Admission</h2>
            <p className="text-xs font-mono text-code-white/40 uppercase tracking-[0.4em]">v2.0 Taste & Architecture Review</p>
          </div>

          <div className="space-y-8 max-w-xl mx-auto text-balance">
            <p className="text-xl md:text-2xl font-serif text-code-white/60 leading-relaxed italic">
              「別再遞交死板的規格書。我們只接受曖昧、模糊且簡短的目標。」
            </p>
            <p className="text-sm font-mono text-code-white/30 leading-relaxed uppercase tracking-widest">
              點擊下方按鈕，進入總監引導對練流程。
            </p>
          </div>

          <div className="pt-12 flex justify-center">
            <button 
              type="button"
              onClick={() => {
                onStartCapture(); 
                setStep(1);       
              }}
              className="px-12 py-6 border border-surgeon-white text-surgeon-white hover:bg-surgeon-white hover:text-matte-black transition-all duration-700 font-mono text-sm tracking-[0.4em] uppercase group"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-500">
                Begin Dialogue
              </span>
            </button>
          </div>
          
          <p className="text-[10px] font-mono text-code-white/10 uppercase tracking-[0.8em] pt-24">
            Establish Secure Link
          </p>
        </motion.div>
      </section>
    );
  }

  // 透過後備機制 (|| questions[0])，徹底封印 noUncheckedIndexedAccess 噴出的潛在 undefined 錯誤
  const currentQuestion = questions[step - 1] || questions[0];

  return (
    <section className="py-48 px-6 max-w-3xl mx-auto border-t border-white/5 text-center">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-surgeon-white italic">
            {currentQuestion.title}
          </h2>
          <p className="text-xs font-mono text-code-white/40 uppercase tracking-[0.2em]">
            Inertia Sandbox Director
          </p>
        </div>

        {/* Q3 特有的動態 Echo 機制 */}
        {currentQuestion.isQ3 && (
          <div className="max-w-xl mx-auto p-4 border border-white/5 bg-white/[0.01] rounded-sm">
            <p className="text-xs font-mono text-code-white/40 leading-relaxed italic text-left">
              「既然您的核心目標是 <span className="text-surgeon-white">{formData.q1 || '（未提供）'}</span>，且面臨 <span className="text-surgeon-white">{formData.q2 || '（未提供）'}</span> 的痛點...」
            </p>
          </div>
        )}

        <div className="space-y-6 max-w-xl mx-auto">
          <label className="block text-base md:text-lg font-serif text-code-white/80 leading-relaxed italic">
            {currentQuestion.label}
          </label>
          
          <textarea
            autoFocus
            value={formData[currentQuestion.key]}
            onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
            placeholder="請輸入您的回答，或直接點擊下一步跳過（將標記為 PENDING）..."
            className="w-full bg-transparent border-b border-white/10 focus:border-surgeon-white outline-none py-3 text-surgeon-white font-mono text-center transition-colors duration-500 resize-none h-24 placeholder:text-code-white/20 text-sm"
          />
        </div>

        <div className="pt-6 flex justify-center gap-4 font-mono text-xs tracking-widest uppercase">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="px-6 py-3 border border-white/10 text-code-white/40 hover:text-surgeon-white transition-colors duration-300"
            >
              Back
            </button>
          )}
          
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-8 py-3 border border-surgeon-white text-surgeon-white hover:bg-surgeon-white hover:text-matte-black transition-all duration-500"
          >
            {isSubmitting ? 'Sending...' : step === 7 ? 'Submit Spec' : 'Next / Skip'}
          </button>
        </div>
      </motion.div>
    </section>
  );
};