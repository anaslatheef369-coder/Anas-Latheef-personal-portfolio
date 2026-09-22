import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-canvas";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-gradient text-white hover:opacity-90 glow-effect",
    secondary: "glass-panel hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
