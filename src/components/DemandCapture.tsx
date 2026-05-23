import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface DemandCaptureProps {
  onExit: () => void;
}

const QUESTIONS = [
  {
    id: 'target',
    label: '商業目標',
    question: '用一句話告訴我，你今年最想達成的核心商業目標是什麼？',
    placeholder: '例如：將研發週期縮短 40%...',
    required: true,
  },
  {
    id: 'pain_point',
    label: '痛點脈絡',
    question: (answers: Record<string, string>) => 
      `為了解決「${answers.target}」這個目標，你目前覺得最痛苦、卡最久的「盲點」或「人工流程」在哪裡？`,
    placeholder: '描述那些反覆發生、讓你心累的細節...',
    required: false,
  },
  {
    id: 'taste_choice',
    label: '品味取捨',
    question: '如果在接下來的解法中只能二選一，你會優先保證「極致的效率自動化」還是「細膩的使用者體驗」？為什麼？',
    placeholder: '例如：我選體驗，因為我們是精品服務...',
    required: false,
  },
  {
    id: 'constraint',
    label: '硬性約束',
    question: '在這個流程中，最核心、絕對不能外流或出錯的資料是什麼？',
    placeholder: '列出那些你睡覺也會擔心的數據或環節...',
    required: false,
  },
  {
    id: 'success_metric',
    label: '成功指標',
    question: '專案上線後，你要怎麼定義這個系統是「成功」的？',
    placeholder: '具體的、可感知的改變...',
    required: false,
  },
  {
    id: 'project_codename',
    label: '專案代號',
    question: '最後，你想為這個專案取個什麼樣的代號？',
    placeholder: '例如：Project Phoenix...',
    required: false,
  }
];

export const DemandCapture = ({ onExit }: DemandCaptureProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [generatedMd, setGeneratedMd] = useState('');

  const currentQuestion = QUESTIONS[step];

  const handleNext = async () => {
    if (currentQuestion.required && !currentInput.trim()) return;

    const newAnswers = { ...answers, [currentQuestion.id]: currentInput.trim() };
    setAnswers(newAnswers);
    setCurrentInput('');

    setIsLoading(true);
    // 1.5s visual loading to give the "Listening" feeling
    setTimeout(() => {
      setIsLoading(false);
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        finishFlow(newAnswers);
      }
    }, 1500);
  };

  const handleSkip = () => {
    if (currentQuestion.required) return;
    handleNext();
  };

  const finishFlow = async (finalAnswers: Record<string, string>) => {
    setIsFinished(true);
    const md = await generateMarkdown(finalAnswers);
    setGeneratedMd(md);
    saveToFirestore(finalAnswers, md);
  };

  const generateMarkdown = async (data: Record<string, string>) => {
    const templateResponse = await fetch('/customer-spec-template.md');
    let template = await templateResponse.text();

    const placeholders = {
      target: data.target || '> ⚠️ [待總監評估]：客戶尚未定義，需在 15 分鐘 Taste Review 中主動引導。',
      pain_point: data.pain_point || '> ⚠️ [待總監評估]：客戶尚未定義，需在 15 分鐘 Taste Review 中主動引導。',
      taste_choice: data.taste_choice || '> ⚠️ [待總監評估]：客戶尚未定義，需在 15 分鐘 Taste Review 中主動引導。',
      constraint: data.constraint || '> ⚠️ [待總監評估]：客戶尚未定義，需在 15 分鐘 Taste Review 中主動引導。',
      success_metric: data.success_metric || '> ⚠️ [待總監評估]：客戶尚未定義，需在 15 分鐘 Taste Review 中主動引導。',
      project_codename: data.project_codename || 'UNTITLED_PROJECT'
    };

    Object.entries(placeholders).forEach(([key, value]) => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return template;
  };

  const saveToFirestore = async (data: Record<string, string>, md: string) => {
    try {
      await addDoc(collection(db, 'submissions'), {
        answers: data,
        spec: md,
        timestamp: new Date(),
        version: 'v2.0'
      });
    } catch (e) {
      console.error("Error saving to Firestore: ", e);
    }
  };

  const downloadMd = () => {
    const blob = new Blob([generatedMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${answers.project_codename || 'spec'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const questionText = typeof currentQuestion?.question === 'function' 
    ? currentQuestion.question(answers) 
    : currentQuestion?.question;

  return (
    <div className="min-h-screen bg-matte-black text-surgeon-white p-6 md:p-12 flex flex-col font-serif">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 border border-surgeon-white flex items-center justify-center">
            <div className="w-1 h-1 bg-surgeon-white" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-code-white/40">
            Taste Review / Step {step + 1} of {QUESTIONS.length}
          </span>
        </div>
        <button 
          onClick={onExit}
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-code-white/20 hover:text-surgeon-white transition-colors"
        >
          [ Exit ]
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={step + (isLoading ? '-loading' : '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {isLoading ? (
                <div className="space-y-8 py-12">
                  <div className="flex space-x-2">
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1 h-1 bg-surgeon-white"
                    />
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1 h-1 bg-surgeon-white"
                    />
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-1 h-1 bg-surgeon-white"
                    />
                  </div>
                  <p className="text-xl md:text-2xl italic text-code-white/40">
                    正在聆聽並校準品味...
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <span className="text-xs font-mono text-surgeon-white/40 uppercase tracking-widest block">
                      Director's Inquiry
                    </span>
                    <h3 className="text-3xl md:text-5xl italic leading-tight text-balance">
                      {questionText}
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <textarea
                      autoFocus
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl focus:outline-none focus:border-surgeon-white transition-colors placeholder:text-white/5 resize-none h-32"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) handleNext();
                      }}
                    />
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                      <button
                        onClick={handleNext}
                        disabled={currentQuestion.required && !currentInput.trim()}
                        className="w-full md:w-auto px-12 py-4 bg-surgeon-white text-matte-black font-mono text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors disabled:opacity-20"
                      >
                        {step === QUESTIONS.length - 1 ? 'Finalize' : 'Next'}
                      </button>
                      {!currentQuestion.required && (
                        <button
                          onClick={handleSkip}
                          className="text-[10px] font-mono text-code-white/30 uppercase tracking-[0.2em] hover:text-surgeon-white transition-colors"
                        >
                          Skip / Not Defined
                        </button>
                      )}
                      <span className="text-[10px] font-mono text-code-white/10 uppercase hidden md:inline">
                        Ctrl + Enter to continue
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-16 py-12"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl italic text-surgeon-white">規格書已初步成形</h2>
                <p className="text-xl text-code-white/60">
                  基於剛才的對練，我們已將您的初步想法結構化。
                </p>
              </div>

              <div className="p-8 border border-white/5 bg-white/[0.02] font-mono text-sm text-code-white/40 overflow-y-auto max-h-[40vh] whitespace-pre-wrap leading-relaxed">
                {generatedMd}
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <button
                  onClick={downloadMd}
                  className="px-12 py-4 border border-surgeon-white text-surgeon-white hover:bg-surgeon-white hover:text-matte-black transition-all duration-500 font-mono text-sm tracking-[0.2em] uppercase"
                >
                  Download .md Spec
                </button>
                <button
                  onClick={onExit}
                  className="px-12 py-4 text-code-white/40 hover:text-surgeon-white transition-colors font-mono text-sm tracking-[0.2em] uppercase"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12 text-center md:text-left">
        <p className="text-[10px] font-mono text-code-white/10 uppercase tracking-[0.5em]">
          Inertia Systems v2.0 // Neural Interface Active
        </p>
      </div>
    </div>
  );
};
