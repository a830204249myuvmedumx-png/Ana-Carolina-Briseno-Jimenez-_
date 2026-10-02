import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, HelpCircle, ShieldCheck, LogOut, Sparkles, ChevronDown, Trophy, ArrowRight } from 'lucide-react';
import { GoogleUserProfile } from '../types';

interface HeaderProps {
  onMenuClick?: () => void;
  lang: 'es' | 'en';
  setLang: (l: 'es' | 'en') => void;
  user: GoogleUserProfile | null;
  onOpenWelcome: () => void;
  onSignOut: () => void;
  onOpenSimulator: () => void;
}

export default function Header({ 
  onMenuClick, 
  lang, 
  setLang,
  user,
  onOpenWelcome,
  onSignOut,
  onOpenSimulator
}: HeaderProps) {
  const isEs = lang === 'es';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo';

  // Google SVG Icon
  const GoogleGIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
    </svg>
  );

  return (
    <header className="bg-white sticky top-0 z-40 px-6 md:px-8 py-3.5 flex justify-between items-center w-full border-b border-slate-200 shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="text-slate-700 transition-all duration-300 ease-in-out active:scale-95 hover:bg-slate-100 p-2 rounded-lg lg:hidden"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900 tracking-tight uppercase font-headline">
            {isEs ? 'Logística Internacional' : 'Veridian Global Trade'}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-200">
            {isEs ? 'Simulador Amazon' : 'Amazon Simulator'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Language selector toggle button */}
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-all active:scale-95 border border-slate-200/50 cursor-pointer"
          title="Cambiar idioma / Change Language"
        >
          {lang === 'en' ? 'EN 🌐 ES' : 'ES 🌐 EN'}
        </button>

        {/* Notifications Icon */}
        <div className="relative group">
          <button 
            className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all relative"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full"></span>
          </button>
        </div>

        {/* Welcome Page Direct Button */}
        <button
          onClick={onOpenWelcome}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEs ? 'Bienvenida' : 'Welcome'}</span>
        </button>

        {/* Google User Profile Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          {user?.isActivated ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 border border-slate-200/80 transition-all cursor-pointer"
            >
              <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 ring-2 ring-blue-500/20">
                <img 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                  src={user.avatar || defaultAvatar}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left hidden lg:block pr-1">
                <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                  {user.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Google Activo
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block mr-1" />
            </button>
          ) : (
            <button
              onClick={onOpenWelcome}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-blue-400 text-slate-800 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <GoogleGIcon />
              <span>{isEs ? 'Activar con Google' : 'Sign in with Google'}</span>
            </button>
          )}

          {/* Profile Dropdown Popover */}
          {dropdownOpen && user?.isActivated && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar || defaultAvatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 uppercase">
                      <ShieldCheck className="w-3 h-3" />
                      {isEs ? 'Cuenta Google Activa' : 'Google Account Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenWelcome();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{isEs ? 'Página de Bienvenida & Perfil' : 'Welcome & Profile Page'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenSimulator();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>{isEs ? 'Simulador Amazon (8 Fases)' : 'Amazon Simulator (8 Phases)'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>{isEs ? 'Desactivar / Cerrar Sesión' : 'Deactivate / Sign Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
