import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { PlayCircleIcon } from 'lucide-react';
import TMJ04 from '../../assets/TMJ04.png';

/**
 * Hero Component (Poster Theme Only)
 *
 * Full-screen hero section with TMJ's name, tagline, CTAs, and hero image.
 * Features parallax scrolling effects styled for the Poster theme.
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Poster theme styles (hardcoded)
  const themeStyles = {
    overlay: 'absolute inset-0 bg-gradient-to-b from-background/90 to-background/30',
    pattern: 'after:bg-[var(--texture-halftone)]',
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative h-screen w-full overflow-hidden ${themeStyles.pattern} after:absolute after:inset-0 after:opacity-30 after:pointer-events-none`}
    >
      {/* Overlay */}
      <div className={themeStyles.overlay} />

      {/* Background + parallax container */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: textY, opacity: opacityText }}
      >
        <div className="container mx-auto px-4 md:px-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            {/* Left: Image */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.8,
              }}
            >
              <img
                src={TMJ04}
                alt="TMJ promotional poster"
                className="w-full max-h-[100vh] object-cover"
              />
            </motion.div>

            {/* Right: Text */}
            <div className="max-w-3xl">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-lg [font-family:Pacifico,cursive] italic"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.2,
                }}
              >
                TMJ
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 text-[#7D4F3A]/90 drop-shadow-md max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.4,
                }}
              >
                Nigerian singer-songwriter blending Afropop, R&amp;B, and
                traditional Juju with socially conscious storytelling and
                activism.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.6,
                }}
              >
                <Button>
                  <PlayCircleIcon size={18} className="mr-2" />
                  Listen Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
