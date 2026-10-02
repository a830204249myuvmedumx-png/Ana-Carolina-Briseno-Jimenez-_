import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  PlusSquare, 
  Boxes, 
  BarChart3, 
  AlertTriangle,
  Truck,
  Trophy,
  Sparkles,
  ShieldCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import { GoogleUserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'es' | 'en';
  onEmergencyAlert: () => void;
  user: GoogleUserProfile | null;
  onOpenWelcome: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  lang, 
  onEmergencyAlert,
  user,
  onOpenWelcome
}: SidebarProps) {
  const isEs = lang === 'es';

  const menuItems = [
    { id: 'welcome', label: isEs ? 'Bienvenida & Cuenta' : 'Welcome & Account', icon: Sparkles },
    { id: 'home', label: isEs ? 'Panel de Control' : 'Dashboard', icon: LayoutDashboard },
    { id: 'simulator', label: isEs ? 'Academia & Simulador' : 'Logistics Academy', icon: Trophy },
    { id: 'tracking', label: isEs ? 'Seguimiento GPS' : 'Tracking Map', icon: Map },
    { id: 'ship', label: isEs ? 'Enviar Carga' : 'New Shipment', icon: PlusSquare },
    { id: 'inventory', label: isEs ? 'Inventario & WMS' : 'Inventory Spec', icon: Boxes },
    { id: 'analytics', label: isEs ? 'Métricas & Informes' : 'Analytics Center', icon: BarChart3 },
  ];

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
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col bg-slate-900 border-r border-slate-800 pt-6 text-slate-300 z-30">
      {/* Brand logo & premium identity */}
      <div className="px-6 mb-6 flex items-center gap-3 border-b border-slate-800 pb-5 shrink-0">
        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold font-headline select-none shadow-md">
          V
        </div>
        <div>
          <div className="text-lg font-bold text-white tracking-tight uppercase leading-none font-headline flex items-center gap-2">
            <span>VERIDIAN</span>
            <span className="text-[9px] bg-blue-900/60 text-blue-300 border border-blue-700/50 px-1.5 py-0.5 rounded font-mono">
              AMZN
            </span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1 block">
            {isEs ? 'Logística & Academia' : 'Global Logistics Academy'}
          </div>
        </div>
      </div>

      {/* Real-time Fleet Unit Status Card */}
      <div className="mx-4 mb-4 p-3.5 bg-slate-800/90 rounded-xl border border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-white truncate">Unit 772-Bravo</h3>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">
              {isEs ? 'EN TRÁNSITO - A TIEMPO' : 'IN TRANSIT - ON TIME'}
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation links */}
      <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
              {item.id === 'welcome' && !user?.isActivated && (
                <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Google Account Card & Status */}
      <div className="p-4 border-t border-slate-800 mt-auto space-y-3">
        {user?.isActivated ? (
          <div 
            onClick={onOpenWelcome}
            className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700/80 cursor-pointer transition-all group"
            title="Ver perfil y bienvenida"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <GoogleGIcon />
                <span>Google Activo</span>
              </span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            </div>
            <div className="flex items-center gap-2.5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-600"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenWelcome}
            className="w-full p-3 bg-slate-800 hover:bg-slate-750 text-left rounded-xl border border-slate-700/80 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Cuenta Inactiva</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white rounded-md shrink-0">
                <GoogleGIcon />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white group-hover:text-blue-300">
                  {isEs ? 'Activar con Google' : 'Activate with Google'}
                </p>
                <p className="text-[9px] text-slate-400">
                  {isEs ? 'Haz clic para comenzar' : 'Click to start'}
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Emergency Alert Button */}
        <button 
          onClick={onEmergencyAlert}
          className="w-full py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4 text-white" />
          <span>{isEs ? 'Alerta de Emergencia' : 'Emergency Alert'}</span>
        </button>
      </div>
    </aside>
  );
}
