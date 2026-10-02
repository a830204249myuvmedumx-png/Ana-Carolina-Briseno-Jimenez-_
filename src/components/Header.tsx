import React from 'react';
import { Menu, Bell, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  lang: 'es' | 'en';
  setLang: (l: 'es' | 'en') => void;
}

export default function Header({ onMenuClick, lang, setLang }: HeaderProps) {
  // Use high-end profile avatar from Aida Public Asset
  const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo';

  return (
    <header className="bg-white sticky top-0 z-40 px-8 py-3.5 flex justify-between items-center w-full border-b border-slate-200 shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="text-slate-700 transition-all duration-300 ease-in-out active:scale-95 hover:bg-slate-100 p-2 rounded-lg lg:hidden"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>
        <span className="text-lg font-bold text-slate-900 tracking-tight uppercase font-headline">
          {lang === 'es' ? 'Logística Internacional' : 'Veridian Global Trade'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Language selector toggle button */}
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-all active:scale-95 border border-slate-200/50"
          title="Cambiar idioma / Change Language"
        >
          {lang === 'en' ? 'EN 🌐 ES' : 'ES 🌐 EN'}
        </button>

        <div className="relative group">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full"></span>
          </button>
        </div>

        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all md:block hidden">
          <HelpCircle className="w-5 h-5 text-slate-600" />
        </button>

        <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 ring-2 ring-slate-100 hover:ring-blue-200 cursor-pointer transition-all">
          <img 
            alt="Logistic Manager Avatar" 
            className="w-full h-full object-cover" 
            src={avatarUrl}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
