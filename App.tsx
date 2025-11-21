import React, { useState, useRef, useEffect } from 'react';
import { AppType, ThemeType, Message } from './types';
import { generateConversation } from './services/geminiService';
import { ChatPreview } from './components/ChatPreview';
import { Sparkles, Instagram, MessageCircle, Music2, Flame, Download, Upload, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppType>(AppType.INSTAGRAM);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(ThemeType.FLIRTY);
  const [themName, setThemName] = useState<string>('Crush ❤️');
  const [themPhoto, setThemPhoto] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isMobileFullScreen, setIsMobileFullScreen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    
    // Small delay to allow UI to show loading state immediately
    setTimeout(async () => {
        const msgs = await generateConversation(selectedApp, selectedTheme, themName);
        setMessages(msgs);
        setIsLoading(false);
        setHasGenerated(true);
        
        // If on mobile, switch to full screen view automatically
        if (window.innerWidth < 1024) {
            setIsMobileFullScreen(true);
        }
    }, 100);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThemPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const appIcons = {
    [AppType.INSTAGRAM]: <Instagram className="w-5 h-5" />,
    [AppType.WHATSAPP]: <MessageCircle className="w-5 h-5" />,
    [AppType.TIKTOK]: <Music2 className="w-5 h-5" />,
    [AppType.TINDER]: <Flame className="w-5 h-5" />,
  };

  const getAppColor = (app: AppType) => {
    switch(app) {
        case AppType.INSTAGRAM: return 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white';
        case AppType.WHATSAPP: return 'bg-[#25D366] text-white';
        case AppType.TIKTOK: return 'bg-black text-white';
        case AppType.TINDER: return 'bg-gradient-to-r from-pink-500 to-orange-500 text-white';
        default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row text-gray-800 font-sans overflow-hidden">
      
      {/* Mobile Full Screen View Overlay */}
      {isMobileFullScreen && (
        <div className="fixed inset-0 z-50 bg-black animate-in fade-in duration-300">
            <ChatPreview 
                app={selectedApp} 
                messages={messages} 
                themName={themName}
                themPhoto={themPhoto}
                isLoading={isLoading}
                isFullScreen={true}
            />
        </div>
      )}

      {/* Left Panel: Configuration */}
      <div className="w-full lg:w-[400px] bg-white p-6 lg:p-8 flex flex-col gap-8 border-r border-gray-200 overflow-y-auto z-10 shadow-lg h-screen lg:h-auto">
        
        <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="text-indigo-600" /> SocialGen AI
            </h1>
            <p className="text-gray-500 text-sm mt-2">Create realistic fake chat screenshots.</p>
        </div>

        {/* App Selection */}
        <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Select Platform</h2>
            <div className="grid grid-cols-2 gap-3">
                {Object.values(AppType).map((app) => (
                    <button
                        key={app}
                        onClick={() => setSelectedApp(app)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                            ${selectedApp === app 
                                ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${selectedApp === app ? getAppColor(app) : 'bg-gray-200 text-gray-500'}`}>
                           {appIcons[app]}
                        </div>
                        <span className={`font-semibold text-sm ${selectedApp === app ? 'text-indigo-900' : 'text-gray-600'}`}>{app}</span>
                    </button>
                ))}
            </div>
        </section>

        {/* Theme Selection */}
        <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Conversation Vibe</h2>
            <div className="flex flex-wrap gap-2">
                {Object.values(ThemeType).map((theme) => (
                    <button
                        key={theme}
                        onClick={() => setSelectedTheme(theme)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                             ${selectedTheme === theme 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {theme}
                    </button>
                ))}
            </div>
        </section>

        {/* Details */}
        <section>
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Details</h2>
             <div className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Person Name</label>
                    <input 
                        type="text" 
                        value={themName}
                        onChange={(e) => setThemName(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>
                
                {/* Photo Upload */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Profile Photo</label>
                    <div className="flex items-center gap-4">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-200 transition-colors relative group"
                        >
                            {themPhoto ? (
                                <img src={themPhoto} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Upload size={20} className="text-gray-400 group-hover:text-indigo-500" />
                            )}
                        </div>
                        <div className="flex-1">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                Upload Photo
                            </button>
                            <p className="text-xs text-gray-400 mt-0.5">Or leave empty for random</p>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handlePhotoUpload} 
                                accept="image/*" 
                                className="hidden" 
                            />
                        </div>
                         {themPhoto && (
                            <button onClick={() => setThemPhoto(undefined)} className="text-gray-400 hover:text-red-500">
                                <X size={16} />
                            </button>
                         )}
                    </div>
                </div>
             </div>
        </section>

        {/* Action */}
        <div className="mt-auto pt-4 pb-10 lg:pb-0">
            <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>Generating...</>
                ) : (
                    <><Sparkles size={20} /> Generate Conversation</>
                )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">Powered by Google Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Right Panel: Preview (Desktop only or behind mobile overlay) */}
      <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-4 lg:p-10 overflow-hidden relative h-screen">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>
         
         <div className="relative w-full max-w-[380px] aspect-[9/19] h-auto max-h-[90vh]">
             {hasGenerated || isLoading ? (
                 <ChatPreview 
                    app={selectedApp} 
                    messages={messages} 
                    themName={themName}
                    themPhoto={themPhoto}
                    isLoading={isLoading}
                    isFullScreen={false}
                 />
             ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-[3rem] border-4 border-dashed border-gray-300">
                    <MessageCircle size={48} className="mb-2 opacity-20" />
                    <p className="font-medium">Select options to preview</p>
                 </div>
             )}
         </div>
         
         {/* Desktop floating hint */}
         {hasGenerated && !isLoading && (
             <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-600">
                <Download size={16} /> Screenshot to save
             </div>
         )}
      </div>
    </div>
  );
};

export default App;