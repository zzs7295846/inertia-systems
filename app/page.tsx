import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-black text-accent mb-4 tracking-tighter">
        HIS 系統轉型 <span className="text-primary underline">代理人服務</span>
      </h1>
      <p className="text-xl text-accent mb-8 max-w-xl">
        我們將傳統「採購軟體」的負擔轉化為「買斷工作成果」。
        透過 AI 代理人，協助您在 3 秒內掌握醫療決策風險。
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/commission" 
          className="px-10 py-4 bg-primary text-white font-bold text-xl rounded-full shadow-xl hover:scale-105 transition-transform"
        >
          填寫轉型委託
        </Link>
      </div>

      <footer className="mt-16 text-gray-400 text-sm">
        © 2026 AI Native 醫療系統架構開發專家 | MiniGame Studio v3.0
      </footer>
    </main>
  );
}
