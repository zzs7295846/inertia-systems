export const Clients = () => {
  return (
    <section className="py-48 px-6 bg-charcoal/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-32">
          <p className="text-[10px] font-mono tracking-[0.5em] text-code-white/30 uppercase mb-8">Strategic Partnerships</p>
          <h2 className="text-4xl md:text-6xl font-serif text-surgeon-white leading-tight">
            Target Client Architectures
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* MedTech */}
          <div className="space-y-8 group">
            <div className="h-px w-full bg-white/10 group-hover:bg-surgeon-white transition-colors duration-700" />
            <div className="space-y-6">
              <h3 className="text-3xl font-serif text-surgeon-white italic">MedTech & Aerospace</h3>
              <p className="text-sm font-mono text-code-white/60 leading-relaxed">
                醫療與高專注軟體：如手術輔助、飛航調度系統。用戶只要分心便關乎人命，極需引入防呆與保護性摩擦力。
              </p>
              <ul className="space-y-4 text-[10px] font-mono text-code-white/40 uppercase tracking-widest">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-surgeon-white/20" />
                  Mission Critical Interaction
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-surgeon-white/20" />
                  Cognitive Load Optimization
                </li>
              </ul>
            </div>
          </div>

          {/* High-end Brand */}
          <div className="space-y-8 group">
            <div className="h-px w-full bg-white/10 group-hover:bg-surgeon-white transition-colors duration-700" />
            <div className="space-y-6">
              <h3 className="text-3xl font-serif text-surgeon-white italic">Premium Experience Rebound</h3>
              <p className="text-sm font-mono text-code-white/60 leading-relaxed">
                面臨「數位疲勞」的高端品牌：渴望擺脫低俗暗黑模式的金融、教育、硬體巨頭，亟需打造「靜謐、克制、充滿高級感」的次世代介面。
              </p>
              <ul className="space-y-4 text-[10px] font-mono text-code-white/40 uppercase tracking-widest">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-surgeon-white/20" />
                  Anti-Dark Pattern Architecture
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-surgeon-white/20" />
                  Ethical Engagement Paradigms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
