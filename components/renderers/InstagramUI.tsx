import React from 'react';
import { Message } from '../../types';
import { PhoneStatusBar } from '../PhoneStatusBar';
import { ChevronLeft, Phone, Video, Info, Camera, Mic, Image as ImageIcon, Heart, Smile } from 'lucide-react';

interface Props {
  messages: Message[];
  themName: string;
  themPhoto?: string;
}

export const InstagramUI: React.FC<Props> = ({ messages, themName, themPhoto }) => {
  const avatarSrc = themPhoto || `https://picsum.photos/seed/${themName}/100`;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-black overflow-hidden relative">
      {/* Status Bar */}
      <PhoneStatusBar darkMode={false} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <ChevronLeft size={28} className="text-black -ml-2" />
          <div className="flex items-center gap-2">
            <img 
              src={avatarSrc} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-semibold leading-tight">{themName}</p>
              <p className="text-xs text-gray-400 leading-tight">Active now</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-black">
          <Phone size={24} />
          <Video size={24} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
        <div className="flex justify-center mb-4">
          <span className="text-xs text-gray-400 font-medium">Today 9:41 AM</span>
        </div>
        
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start items-end gap-2'}`}>
              {!isMe && (
                 <img 
                 src={avatarSrc} 
                 alt="Avatar" 
                 className="w-7 h-7 rounded-full object-cover mb-1"
               />
              )}
              <div 
                className={`max-w-[70%] px-4 py-2.5 text-[15px] leading-snug
                  ${isMe 
                    ? 'bg-gray-100 text-black rounded-3xl rounded-br-md' 
                    : 'bg-white border border-gray-200 text-black rounded-3xl rounded-bl-md'
                  }
                `}
                style={isMe ? { background: '#3797f0', color: 'white' } : {}}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
         <div className="flex justify-end mt-1 px-1">
            <span className="text-[10px] text-gray-400 font-medium">Seen</span>
         </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-3 flex items-center gap-3 bg-white">
        <div className="bg-gray-100 flex-1 rounded-full h-11 flex items-center px-1 relative">
            <div className="bg-blue-500 p-1.5 rounded-full ml-1">
                <Camera size={18} className="text-white" />
            </div>
            <input 
                type="text" 
                placeholder="Message..." 
                className="bg-transparent border-none outline-none text-sm ml-2 flex-1 placeholder-gray-500"
                disabled
            />
             <div className="flex items-center gap-3 mr-3 text-gray-800">
                <Mic size={22} />
                <ImageIcon size={22} />
                <Heart size={22} />
             </div>
        </div>
      </div>
    </div>
  );
};