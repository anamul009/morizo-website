import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel distance in px (positive = rises up into place). */
  y?: number;
  /** Horizontal travel distance in px (e.g. -40 slides in from the left). */
  x?: number;
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
};

// Expo-style easing — a modern, refined deceleration curve.
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal. Fades + slides its children into place the first
 * time they enter the viewport. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
