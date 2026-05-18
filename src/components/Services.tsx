export const Services = () => {
  const services = [
    {
      id: '01',
      title: 'HCI Cognitive Audit',
      subtitle: '$Friction$ 動態核心架構調研',
      desc: '進駐企業切除「認知腫瘤」。基於動態摩擦力公式 Friction ∝ Risk × Uncertainty 進行深度調研與風險評估。',
    },
    {
      id: '02',
      title: 'Dampen Kernel Integration',
      subtitle: '阻尼內核系統整合',
      desc: '部署 Ambient & Hard Gate。在底層進行自動化分流：綠燈區 Zero Interface、黃燈區環境感知回饋、紅燈區硬核阻斷。',
    },
    {
      id: '03',
      title: 'E2E Reconstruction',
      subtitle: 'AI 原生端到端次世代生產環境重構',
      desc: '以「乘法 AI」流水線放大人類思想密度，一條龍交付即時脈絡呈現系統（Just-in-Time Justification），拒絕廢話彈窗。',
    },
  ];

  return (
    <section className="py-48 px-6 max-w-7xl mx-auto">
      <div className="mb-32">
        <p className="text-[10px] font-mono tracking-[0.5em] text-code-white/30 uppercase mb-8">Operational Depth</p>
        <h2 className="text-4xl md:text-7xl font-serif text-surgeon-white mb-8">
          Core Services
        </h2>
        <div className="w-24 h-px bg-surgeon-white/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {services.map((s) => (
          <div key={s.id} className="bg-matte-black p-12 space-y-16 hover:bg-charcoal/30 transition-all duration-700 flex flex-col justify-between group">
            <div className="space-y-8">
              <span className="text-xs font-mono text-code-white/20 group-hover:text-surgeon-white transition-colors duration-500 underline underline-offset-4 decoration-white/10">
                MODULE {s.id}
              </span>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif text-surgeon-white leading-tight">
                  {s.title}
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-code-white/40 uppercase">
                  {s.subtitle}
                </p>
              </div>
            </div>
            <p className="text-sm font-mono text-code-white/60 leading-relaxed border-l border-white/10 pl-6 italic">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
