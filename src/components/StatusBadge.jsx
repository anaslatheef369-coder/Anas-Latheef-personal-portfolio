import React from 'react';
import { cn } from '../lib/utils';

export const StatusBadge = ({ className, text = "Available for new opportunities" }) => {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-status-green/30 bg-status-green/10 px-3 py-1 text-sm font-medium text-status-green backdrop-blur-md", className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-green opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-status-green"></span>
      </span>
      {text}
    </div>
  );
};
