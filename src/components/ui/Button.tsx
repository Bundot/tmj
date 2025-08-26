import React, { Component } from 'react';
import { motion } from 'framer-motion';
/**
 * Button variants
 */
const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  outline: 'bg-transparent border border-primary text-foreground hover:bg-primary/10',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline'
};
/**
 * Button sizes
 */
const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 py-3 text-lg'
};
/**
 * Button Props Interface
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  children: React.ReactNode;
}
/**
 * Button Component
 *
 * A customizable button component with different variants, sizes, and animation.
 * Uses Framer Motion for hover and tap animations.
 *
 * @param {ButtonProps} props - The component props
 * @returns {JSX.Element} The Button component
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  // Combine the variant, size, and additional classes
  const buttonClasses = `
    inline-flex items-center justify-center rounded-md font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  return <motion.button className={buttonClasses} whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} transition={{
    duration: 0.2
  }} {...props}>
      {children}
    </motion.button>;
};