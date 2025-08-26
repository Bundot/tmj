import React, { Component } from 'react';
import { motion } from 'framer-motion';
/**
 * Section Props Interface
 */
interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}
/**
 * Section Component
 *
 * A reusable section component for consistent section styling throughout the app.
 * Includes animation for elements entering the viewport.
 *
 * @param {SectionProps} props - The component props
 * @returns {JSX.Element} The Section component
 */
export const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  children
}) => {
  return <section id={id} className={`py-16 md:py-24 px-4 md:px-6 relative ${className}`}>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      margin: '-100px'
    }} transition={{
      duration: 0.6,
      ease: 'easeOut'
    }} className="container mx-auto">
        {children}
      </motion.div>
    </section>;
};