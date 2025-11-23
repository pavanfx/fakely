import React from 'react';
import { Message } from '../../types';
import { PhoneStatusBar } from '../PhoneStatusBar';
import { ArrowLeft, Video, Phone, Plus, Camera, Mic, CheckCheck } from 'lucide-react';

interface Props {
  messages: Message[];
  themName: string;
  themPhoto?: string;
  onSendMessage?: (text: string) => void;
  isTyping?: boolean;
}

export const WhatsAppUI: React.FC<Props> = ({ messages, themName, themPhoto, onSendMessage, isTyping }) => {
  const avatarSrc = themPhoto || `https://picsum.photos/seed/${themName}/100`;
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-[#efe7dd] overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none"></div>

      {/* Status Bar */}
      <div className="bg-wa-teal text-white z-10">
        <PhoneStatusBar darkMode={true} />
      </div>

      {/* Header */}
      <div className="bg-wa-teal text-white flex items-center justify-between px-2 py-2 z-10 shadow-sm">
        <div className="flex items-center gap-1">
          <ArrowLeft size={24} />
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover ml-1"
          />
          <div className="ml-2">
            <p className="font-medium text-base leading-tight truncate max-w-[120px]">{themName}</p>
            <p className="text-xs text-white/80 truncate">
              {isTyping ? 'typing...' : 'online'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mr-2">
          <Video size={22} fill="white" className="text-white" />
          <Phone size={20} fill="white" className="text-white" />
          <div className="flex flex-col gap-[3px]">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 z-0 scrollbar-hide">
        <div className="flex justify-center my-2">
          <span className="bg-[#e1f3fb] text-gray-600 text-[11px] px-2 py-1 rounded-lg shadow-sm uppercase font-medium">Today</span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-3 py-1.5 rounded-lg shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative text-[14.2px] leading-[19px]
                  ${isMe
                    ? 'bg-wa-green text-black rounded-tr-none'
                    : 'bg-white text-black rounded-tl-none'
                  }
                `}
              >
                {/* Tail implementation via CSS borders would be cleaner in pure CSS, simulating roughly here */}
                <span className="break-words">{msg.content}</span>
                <div className="flex justify-end items-center gap-1 mt-[-2px] ml-2 float-right h-4">
                  <span className="text-[10px] text-gray-500 mt-1">{msg.time || '9:42'}</span>
                  {isMe && <CheckCheck size={14} className="text-[#53bdeb] mt-1" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="px-2 py-2 flex items-end gap-2 z-10 mb-1">
        <div className="bg-white flex-1 rounded-[24px] min-h-[46px] flex items-center px-3 py-2 shadow-sm">
          <div className="bg-gray-300 rounded-full p-0.5 mr-2">
            <Plus size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Message"
            className="bg-transparent border-none outline-none text-base flex-1 text-black placeholder-gray-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!onSendMessage}
          />
          <div className="flex items-center gap-3 text-gray-500 ml-2">
            <Camera size={22} />
          </div>
        </div>
        <div className="w-11 h-11 bg-wa-teal rounded-full flex items-center justify-center shadow-md">
          <Mic size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};