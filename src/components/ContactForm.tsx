import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    entity: '',
    description: '',
    budget: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-48 px-6 max-w-3xl mx-auto border-t border-white/5 text-center">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif text-surgeon-white italic">Admission</h2>
              <p className="text-xs font-mono text-code-white/40 uppercase tracking-[0.4em]">System Pathogen Report</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 text-left">
              <div className="space-y-12">
                <div className="group">
                  <label className="text-[10px] font-mono text-code-white/30 uppercase tracking-widest block mb-2 group-focus-within:text-surgeon-white transition-colors">Enterprise Entity</label>
                  <input 
                    type="text" 
                    name="entity"
                    value={formData.entity}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-xl focus:outline-none focus:border-surgeon-white transition-colors placeholder:text-white/5"
                    placeholder="e.g. United Aerospace"
                  />
                </div>
                
                <div className="group">
                  <label className="text-[10px] font-mono text-code-white/30 uppercase tracking-widest block mb-2 group-focus-within:text-surgeon-white transition-colors">High-Risk Pathogen Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-xl focus:outline-none focus:border-surgeon-white transition-colors placeholder:text-white/5 resize-none"
                    placeholder="Describe the cognitive decay in your system..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group">
                    <label className="text-[10px] font-mono text-code-white/30 uppercase tracking-widest block mb-2 group-focus-within:text-surgeon-white transition-colors">Budgetary Scale (USD)</label>
                    <input 
                      type="text" 
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-xl focus:outline-none focus:border-surgeon-white transition-colors placeholder:text-white/5"
                      placeholder="$100k - $1M+"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-mono text-code-white/30 uppercase tracking-widest block mb-2 group-focus-within:text-surgeon-white transition-colors">Direct Link (Email)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-xl focus:outline-none focus:border-surgeon-white transition-colors placeholder:text-white/5"
                      placeholder="surgeon@your-domain.com"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-12 flex justify-center">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 border border-surgeon-white text-surgeon-white hover:bg-surgeon-white hover:text-matte-black transition-all duration-500 font-mono text-sm tracking-[0.3em] uppercase disabled:opacity-50"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit for Evaluation'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12 py-32"
          >
            <div className="w-16 h-16 border border-surgeon-white mx-auto mb-16 flex items-center justify-center">
              <div className="w-1 h-1 bg-surgeon-white animate-pulse" />
            </div>
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-serif text-surgeon-white italic text-balance leading-tight">
                「我們已收到您的系統病灶報告。」
              </p>
              <p className="text-xl md:text-2xl font-serif text-code-white/60 text-balance leading-relaxed">
                請離開螢幕，回歸真實生活。<br />
                外科醫生評估後，我們將主動聯絡您。
              </p>
            </div>
            <p className="text-[10px] font-mono text-code-white/20 uppercase tracking-[0.8em] pt-24">
              Transmission Offline
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
