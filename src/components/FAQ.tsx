import { useState, useMemo } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';

const CATEGORIES = ['Toutes', 'Général', 'Emploi', 'Installation'] as const;

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('Toutes');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const visibleItems = useMemo(() => {
    if (activeCategory === 'Toutes') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Category filter chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-brand-blue text-white shadow-soft'
                : 'bg-white text-brand-blue border border-brand-lightblue hover:border-brand-blue/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {visibleItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={`${item.category}-${item.question}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'border-brand-blue shadow-soft-lg' : 'border-brand-lightblue'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
              >
                <span className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-brand-blue">{item.question}</span>
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-brand-blue text-white' : 'bg-brand-lightblue/60 text-brand-blue'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-13">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-red bg-brand-lightblue/40 px-2.5 py-0.5 rounded-full mb-2">
                        {item.category}
                      </span>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
