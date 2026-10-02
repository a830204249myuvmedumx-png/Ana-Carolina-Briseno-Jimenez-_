import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  PlusSquare, 
  Boxes, 
  BarChart3, 
  AlertTriangle,
  Anchor,
  HelpCircle,
  Truck,
  Trophy
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'es' | 'en';
  onEmergencyAlert: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, lang, onEmergencyAlert }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: lang === 'es' ? 'Panel de Control' : 'Dashboard', icon: LayoutDashboard },
    { id: 'simulator', label: lang === 'es' ? 'Academia & Simulador' : 'Logistics Academy', icon: Trophy },
    { id: 'tracking', label: lang === 'es' ? 'Seguimiento' : 'Tracking Map', icon: Map },
    { id: 'ship', label: lang === 'es' ? 'Enviar Carga' : 'New Shipment', icon: PlusSquare },
    { id: 'inventory', label: lang === 'es' ? 'Inventario' : 'Inventory Spec', icon: Boxes },
    { id: 'analytics', label: lang === 'es' ? 'Métricas' : 'Analytics Center', icon: BarChart3 },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col bg-slate-900 border-r border-slate-800 pt-6 text-slate-300">
      {/* Brand logo & premium identity */}
      <div className="px-6 mb-8 flex items-center gap-3 border-b border-slate-800 pb-6 shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold font-headline select-none">
          V
        </div>
        <div>
          <div className="text-lg font-bold text-white tracking-tight uppercase leading-none font-headline">
            {lang === 'es' ? 'VERIDIAN' : 'VERIDIAN'}
          </div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1 block">
            {lang === 'es' ? 'Logística Predictiva' : 'Global Premium Trade'}
          </div>
        </div>
      </div>

      {/* Connection unit header context */}
      <div className="mx-4 mb-6 p-4 bg-slate-800 rounded-xl border border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-white truncate">Unit 772-Bravo</h3>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">
              {lang === 'es' ? 'EN TRÁNSITO - A TIEMPO' : 'IN TRANSIT - ON TIME'}
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation options */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-5 py-3 rounded-lg text-left text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-855/60 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Emergency Panel */}
      <div className="p-4 border-t border-slate-800 mt-auto space-y-3">
        <div className="p-3 bg-slate-800 rounded-xl">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Account Status</p>
          <p className="text-xs text-white font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Institutional Pro
          </p>
        </div>
        <button 
          onClick={onEmergencyAlert}
          className="w-full py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <AlertTriangle className="w-4 h-4 text-white" />
          <span>{lang === 'es' ? 'Alerta de Emergencia' : 'Emergency Alert'}</span>
        </button>
      </div>
    </aside>
  );
}
