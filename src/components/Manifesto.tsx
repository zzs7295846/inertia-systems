export const Manifesto = () => {
  return (
    <section className="py-48 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-4xl md:text-6xl font-serif text-surgeon-white leading-tight">
            The Manifesto against <br />
            <span className="italic opacity-50">Dopamine Tyranny</span>
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-12">
          <p className="text-2xl md:text-3xl font-serif italic text-code-white leading-snug text-balance">
            "AI 虽强，却从未拥有过人类身体、更不懂人类的真实体验。"
          </p>
          
          <div className="space-y-8 text-code-white/60 font-mono text-base leading-relaxed">
            <p>
              創辦人深刻體會過被舊時代垃圾 UI 霸凌注意力、極度渴望自律卻不斷被數位環境背叛的痛苦。
              我們拒絕向「參與度極大化 (Engagement Maxing)」的吸血數據信仰妥協。
            </p>
            
            <p>
              在 AI 時代，螢幕使用時長不是成功的指標，而是產品無能的表現。
              Inertia Systems 立志以「真人實際體驗」的稀缺領域知識，為人類奪回專注的主導權。
            </p>
            
            <p>
              我們不只是在設計介面，我們是在為大腦建立防禦工事。
              透過精確計算的「阻尼」，將數位流沙轉化為穩固的基石。
            </p>
          </div>

          <div className="pt-16">
            <div className="inline-block px-6 py-4 border border-white/10 bg-charcoal/50">
              <p className="text-sm font-mono tracking-tighter text-surgeon-white">
                FOUNDER'S NOTE // SYSTEMS ARCHITECT & COGNITIVE PSYCHOLOGY
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
