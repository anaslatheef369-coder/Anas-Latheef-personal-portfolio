import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const IridiumCard = ({ children, className, glowColor = "rgba(139, 92, 246, 0.4)", ...props }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface/80 backdrop-blur-xl border border-border p-6 sm:p-8 transition-all duration-300 shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Radioactive Hover Glow (Polonium/Promethium) */}
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
            zIndex: 0
          }}
        />
      )}
      
      {/* Metallic/Obsidian Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
