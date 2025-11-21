import React from 'react';
import { Message } from '../../types';
import { PhoneStatusBar } from '../PhoneStatusBar';
import { ChevronLeft, MoreHorizontal, Flag, ArrowUpCircle } from 'lucide-react';

interface Props {
  messages: Message[];
  themName: string;
  themPhoto?: string;
}

export const TikTokUI: React.FC<Props> = ({ messages, themName, themPhoto }) => {
  const avatarSrc = themPhoto || `https://picsum.photos/seed/${themName}/100`;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-black overflow-hidden relative">
      <PhoneStatusBar darkMode={false} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <ChevronLeft size={28} className="text-black" />
          <div className="flex flex-col">
            <span className="font-bold text-base">{themName}</span>
          </div>
        </div>
        <div className="flex gap-4 text-black">
           <Flag size={22} className="rotate-12"/>
           <MoreHorizontal size={24} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-hide">
        <div className="text-center text-xs text-gray-400 py-2">
           Today 4:20 PM
        </div>
        
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
               {!isMe && (
                  <img 
                  src={avatarSrc} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
               )}
              <div 
                className={`px-4 py-3 max-w-[75%] text-[15px]
                  ${isMe 
                    ? 'bg-[#2856ff] text-white rounded-2xl rounded-br-sm' 
                    : 'bg-[#f1f1f2] text-black rounded-2xl rounded-bl-sm'
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1 bg-[#f1f1f2] rounded-full h-11 flex items-center px-4">
             <input 
                type="text" 
                placeholder="Send a message..." 
                className="bg-transparent border-none outline-none text-sm flex-1 text-black placeholder-gray-500"
                disabled
            />
        </div>
        <ArrowUpCircle size={32} className="text-[#2856ff] opacity-50" />
      </div>
    </div>
  );
};