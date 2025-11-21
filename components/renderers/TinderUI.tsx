import React from 'react';
import { Message } from '../../types';
import { PhoneStatusBar } from '../PhoneStatusBar';
import { ChevronLeft, Shield, Video } from 'lucide-react';

interface Props {
  messages: Message[];
  themName: string;
  themPhoto?: string;
}

export const TinderUI: React.FC<Props> = ({ messages, themName, themPhoto }) => {
  const avatarSrc = themPhoto || `https://picsum.photos/seed/${themName}/100`;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-black overflow-hidden relative">
      <PhoneStatusBar darkMode={false} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)] z-10">
        <div className="flex items-center gap-1">
            <ChevronLeft size={30} className="text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-pink-100 overflow-hidden">
                <img src={avatarSrc} className="w-full h-full object-cover" />
            </div>
            <span className="ml-2 font-bold text-gray-800 text-sm uppercase tracking-wide">{themName}</span>
        </div>
        <div className="flex gap-4">
            <Video size={24} className="text-gray-300 fill-gray-300" />
            <Shield size={24} className="text-gray-300" />
        </div>
      </div>

      {/* Date Match Banner */}
      <div className="text-center py-6">
         <p className="text-gray-400 text-xs font-medium">YOU MATCHED WITH {themName.toUpperCase()} ON 5/24/24</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 scrollbar-hide">
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start items-end gap-3'}`}>
               {!isMe && (
                 <img 
                 src={avatarSrc} 
                 alt="Avatar" 
                 className="w-10 h-10 rounded-full object-cover mb-1"
               />
               )}
              <div 
                className={`px-5 py-3 max-w-[75%] text-[15px] font-medium
                  ${isMe 
                    ? 'bg-[#2196f3] text-white rounded-[24px] rounded-br-md' 
                    : 'bg-[#f0f2f4] text-gray-700 rounded-[24px] rounded-bl-md'
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
      <div className="p-3 flex items-center gap-2 bg-white border-t border-gray-100">
        <div className="flex-1 relative">
             <input 
                type="text" 
                placeholder="Type a message" 
                className="w-full bg-white border border-gray-300 rounded-full h-11 px-5 text-sm outline-none focus:border-[#fd297b]"
                disabled
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase">Send</button>
        </div>
      </div>
    </div>
  );
};