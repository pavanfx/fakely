import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneStatusBarProps {
  darkMode?: boolean;
}

export const PhoneStatusBar: React.FC<PhoneStatusBarProps> = ({ darkMode = false }) => {
  const textColor = darkMode ? 'text-white' : 'text-black';
  
  return (
    <div className={`flex justify-between items-center px-6 py-2 text-xs font-semibold ${textColor} select-none`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={16} strokeWidth={2.5} />
      </div>
    </div>
  );
};