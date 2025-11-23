import React, { useRef, useEffect } from 'react';
import { AppType, Message } from '../types';
import { InstagramUI } from './renderers/InstagramUI';
import { WhatsAppUI } from './renderers/WhatsAppUI';
import { TikTokUI } from './renderers/TikTokUI';
import { TinderUI } from './renderers/TinderUI';

interface ChatPreviewProps {
  app: AppType;
  messages: Message[];
  themName: string;
  themPhoto?: string;
  isLoading: boolean;
  isFullScreen?: boolean;
  onSendMessage?: (text: string) => void;
  isTyping?: boolean;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  app,
  messages,
  themName,
  themPhoto,
  isLoading,
  isFullScreen = false,
  onSendMessage,
  isTyping
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Small animation when app changes or loads
      containerRef.current.animate([
        { opacity: 0.8, transform: 'scale(0.98)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 300, easing: 'ease-out' });
    }
  }, [app, isLoading]);

  if (isLoading) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 animate-pulse ${isFullScreen ? '' : 'rounded-[3rem]'}`}>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-medium">Generating {app} chat...</p>
      </div>
    );
  }

  const containerClasses = isFullScreen
    ? "w-full h-full overflow-hidden bg-black relative"
    : "w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-black box-content relative";

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Notch simulation - Only show if NOT full screen (or if we want to simulate notch on desktop, but typically full screen mobile implies real device) */}
      {!isFullScreen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[1rem] z-50 pointer-events-none"></div>
      )}

      {app === AppType.INSTAGRAM && <InstagramUI messages={messages} themName={themName} themPhoto={themPhoto} onSendMessage={onSendMessage} isTyping={isTyping} />}
      {app === AppType.WHATSAPP && <WhatsAppUI messages={messages} themName={themName} themPhoto={themPhoto} onSendMessage={onSendMessage} isTyping={isTyping} />}
      {app === AppType.TIKTOK && <TikTokUI messages={messages} themName={themName} themPhoto={themPhoto} onSendMessage={onSendMessage} isTyping={isTyping} />}
      {app === AppType.TINDER && <TinderUI messages={messages} themName={themName} themPhoto={themPhoto} onSendMessage={onSendMessage} isTyping={isTyping} />}
    </div>
  );
};