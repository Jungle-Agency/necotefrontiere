import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Élément signature du site : la « ligne de frontière ».
 * Un tracé rouge qui serpente le long du bord gauche — comme la frontière
 * franco-genevoise sur une carte — et se dessine au fil du scroll.
 * Purement décoratif (aria-hidden), masqué sous 1280px pour ne jamais
 * gêner la lecture du contenu.
 */
export default function BorderLine() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div
      aria-hidden="true"
      className="fixed left-3 inset-y-0 z-30 pointer-events-none hidden xl:flex flex-col items-center select-none"
    >
      {/* Bornes de départ : les deux côtés de la frontière */}
      <div className="flex items-center gap-1.5 pt-24 pb-2 text-[9px] font-display font-black tracking-[0.2em]">
        <span className="text-brand-blue/45">FR</span>
        <span className="w-1 h-1 rounded-full bg-brand-red/50" />
        <span className="text-brand-red/55">CH</span>
      </div>

      <svg
        className="flex-1 w-6"
        viewBox="0 0 24 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M12 0 C 5 8, 19 14, 10 24 C 3 32, 21 38, 13 48 C 6 56, 20 62, 11 72 C 4 80, 19 88, 12 100"
          stroke="var(--color-brand-red)"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.45}
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
