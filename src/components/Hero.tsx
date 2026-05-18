import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text reveals slowly as user scrolls through the 400vh section
  const mainTitleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.3], [0, 1, 1]);
  const boxScale = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  
  // Specific message reveal
  const messageOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-matte-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
        
        {/* Minimalist Square */}
        <motion.div 
          style={{ scale: boxScale }}
          className="w-8 h-8 border border-surgeon-white mb-12"
        />

        {/* Brand Header */}
        <motion.div 
          style={{ opacity: mainTitleOpacity }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-8xl mb-4 font-serif tracking-tighter">
            Inertia Systems
          </h1>
          <p className="text-xs md:text-sm tracking-[0.5em] text-code-white/40 uppercase font-mono">
            Premium Dampening
          </p>
        </motion.div>

        {/* The Core Message - Revealed with effort */}
        <motion.div 
          style={{ opacity: messageOpacity }}
          className="max-w-2xl text-center"
        >
          <p className="text-xl md:text-3xl leading-relaxed text-balance font-serif italic text-surgeon-white">
            「感受到阻力了嗎？這就是你的大腦正在重新奪回掌控權的訊號。歡迎來到 Inertia Systems。」
          </p>
        </motion.div>

        {/* Scroll Progress Indicator (Minimalist) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-px bg-white/10">
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="w-full h-full bg-surgeon-white"
          />
        </div>

        {/* Instructions */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 text-[10px] tracking-[0.4em] text-code-white/20 uppercase"
        >
          Scroll to resist
        </motion.div>
      </div>
    </section>
  );
};
