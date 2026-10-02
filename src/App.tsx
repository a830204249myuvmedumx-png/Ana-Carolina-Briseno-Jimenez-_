import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import TrackingView from './components/TrackingView';
import ShipView from './components/ShipView';
import InventoryView from './components/InventoryView';
import AnalyticsView from './components/AnalyticsView';
import SimulatorView from './components/SimulatorView';
import WelcomeView from './components/WelcomeView';

import { 
  INITIAL_SHIPMENTS, 
  INITIAL_INVENTORY, 
  INITIAL_WAREHOUSES, 
  INITIAL_REPORTS 
} from './data';
import { Shipment, InventoryItem, Warehouse, ReportItem, GoogleUserProfile } from './types';

import { 
  LayoutDashboard, 
  Map, 
  PlusSquare, 
  Boxes, 
  BarChart3, 
  AlertTriangle,
  X,
  Truck,
  Trophy,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const INITIAL_GOOGLE_USER: GoogleUserProfile = {
  id: 'usr-google-830204',
  name: 'Alex R. Morales',
  email: 'a830204249@my.uvm.edu.mx',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo',
  role: 'Director de Operaciones Logísticas',
  organization: 'Amazon Logistics Partner / UVM',
  googleId: 'google-oauth2|109283746192837461829',
  isActivated: true,
  activatedAt: '1 Oct, 2026, 17:35',
  licenseNumber: 'VRD-782910',
  locale: 'es-MX'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [lang, setLang] = useState<'es' | 'en'>('es');
  
  // Google User Authentication State
  const [user, setUser] = useState<GoogleUserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('veridian_google_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading user session', e);
    }
    return INITIAL_GOOGLE_USER;
  });

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core reactive data states
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [reports] = useState<ReportItem[]>(INITIAL_REPORTS);
  
  // Tracking query feedback
  const [prefilledSearchId, setPrefilledSearchId] = useState<string>('');

  // Emergency Alert flag banner
  const [emergencyNotification, setEmergencyNotification] = useState<string | null>(null);

  // Google User Handlers
  const handleActivateWithGoogle = (profileData: Partial<GoogleUserProfile>) => {
    const updatedUser: GoogleUserProfile = {
      ...(user || INITIAL_GOOGLE_USER),
      ...profileData,
      isActivated: true,
    };
    setUser(updatedUser);
    try {
      localStorage.setItem('veridian_google_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed saving user session', e);
    }
  };

  const handleSignOut = () => {
    if (user) {
      const deactivated: GoogleUserProfile = {
        ...user,
        isActivated: false
      };
      setUser(deactivated);
      try {
        localStorage.setItem('veridian_google_user', JSON.stringify(deactivated));
      } catch (e) {
        console.error('Failed updating user state', e);
      }
    }
    setActiveTab('welcome');
  };

  // Global Actions handlers
  const handleAddShipment = (newShp: Shipment) => {
    setShipments(prev => [newShp, ...prev]);
    
    // Increment Rotterdam or related warehouse capacity slightly to simulate physical trade
    setWarehouses(prev => prev.map(wh => {
      if (wh.name === 'Rotterdam Port' && wh.used < 100) {
        return { ...wh, used: Math.min(wh.used + 2, 99), status: 'Near Capacity' };
      }
      return wh;
    }));

    setPrefilledSearchId(newShp.id);
  };

  const handleAddProduct = (newItem: InventoryItem) => {
    setInventory(prev => [newItem, ...prev]);

    // Recalculate related warehouse capacity used representation
    setWarehouses(prev => prev.map(wh => {
      if (wh.name === newItem.warehouse && wh.used < 98) {
        return { ...wh, used: wh.used + 3 };
      }
      return wh;
    }));
  };

  const handleRestockItem = (sku: string, amount: number) => {
    setInventory(prev => prev.map(item => {
      if (item.sku === sku) {
        const newLevel = item.stockLevel + amount;
        return { 
          ...item, 
          stockLevel: newLevel,
          status: 'In Stock' 
        };
      }
      return item;
    }));
  };

  const handleTrackShipmentTrigger = (id: string) => {
    setPrefilledSearchId(id);
    setActiveTab('tracking');
  };

  const handleEmergencyTrigger = () => {
    const text = lang === 'es'
      ? '¡ALERTA ROJA ACTIVA! Re-rutamiento automatizado en canal de Suez por condiciones climáticas extremas. SLA ajustados.'
      : 'RED ALERT FLAGGED: Automated re-routing active near Suez Transit Straits due to meteorological anomalies.';
    setEmergencyNotification(text);
  };

  // Mobile Bottom bar options
  const mobileNavItems = [
    { id: 'welcome', label: lang === 'es' ? 'Bienvenida' : 'Welcome', icon: Sparkles },
    { id: 'home', label: lang === 'es' ? 'Inicio' : 'Home', icon: LayoutDashboard },
    { id: 'simulator', label: lang === 'es' ? 'Simular' : 'Simulate', icon: Trophy },
    { id: 'tracking', label: lang === 'es' ? 'Seguimiento' : 'Track', icon: Map },
    { id: 'ship', label: lang === 'es' ? 'Enviar' : 'Ship', icon: PlusSquare },
    { id: 'inventory', label: lang === 'es' ? 'Inventario' : 'Inventory', icon: Boxes },
    { id: 'analytics', label: lang === 'es' ? 'Métricas' : 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 lg:pb-0 font-sans flex flex-col antialiased">
      
      {/* Desktop fixed Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        onEmergencyAlert={handleEmergencyTrigger}
        user={user}
        onOpenWelcome={() => setActiveTab('welcome')}
      />

      {/* Main Container Wrapper */}
      <div className="flex-1 flex flex-col lg:pl-72">
        
        {/* Sticky Header Row */}
        <Header 
          onMenuClick={() => setMobileMenuOpen(true)}
          lang={lang}
          setLang={setLang}
          user={user}
          onOpenWelcome={() => setActiveTab('welcome')}
          onSignOut={handleSignOut}
          onOpenSimulator={() => setActiveTab('simulator')}
        />

        {/* Global Emergency Signal Warning Drawer banner */}
        {emergencyNotification && (
          <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-between text-xs font-bold font-headline uppercase tracking-wider animate-pulse relative z-30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>{emergencyNotification}</span>
            </div>
            <button 
              onClick={() => setEmergencyNotification(null)}
              className="hover:scale-110 p-1 bg-white/10 rounded cursor-pointer"
              title="Cerrar alerta"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}

        {/* Dynamic Display Canvas View */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {activeTab === 'welcome' && (
            <WelcomeView
              user={user}
              onActivateWithGoogle={handleActivateWithGoogle}
              onSignOut={handleSignOut}
              onNavigate={(tab) => setActiveTab(tab)}
              lang={lang}
            />
          )}

          {activeTab === 'home' && (
            <DashboardView 
              shipments={shipments}
              inventory={inventory}
              onTrackShipment={handleTrackShipmentTrigger}
              onNavigateToShip={() => setActiveTab('ship')}
              lang={lang}
            />
          )}

          {activeTab === 'tracking' && (
            <TrackingView 
              shipments={shipments}
              prefilledSearchId={prefilledSearchId}
              lang={lang}
            />
          )}

          {activeTab === 'ship' && (
            <ShipView 
              onAddShipment={handleAddShipment}
              lang={lang}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView 
              inventory={inventory}
              warehouses={warehouses}
              onAddProduct={handleAddProduct}
              onRestockItem={handleRestockItem}
              lang={lang}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView 
              reports={reports}
              lang={lang}
            />
          )}

          {activeTab === 'simulator' && (
            <SimulatorView 
              lang={lang}
            />
          )}
        </main>

      </div>

      {/* MOBILE INTERACTIVE SIDELINK MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop screen shadow click exit */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
          />

          <div className="relative flex flex-col w-full max-w-xs bg-slate-50 h-full p-6 shadow-2xl space-y-6 animate-slide-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-black text-blue-700 uppercase tracking-wider font-headline">Veridian Command</span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Mobile Navigator</p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Mobile Google User Profile Card */}
            <div 
              onClick={() => {
                setActiveTab('welcome');
                setMobileMenuOpen(false);
              }}
              className="p-3.5 bg-white rounded-xl shadow-xs border border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50"
            >
              <img
                src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo'}
                alt={user?.name || 'User'}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name}</h4>
                <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{user?.isActivated ? 'Google Activo' : 'Activar Cuenta'}</span>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5 overflow-y-auto">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-left text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-current" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 mt-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleEmergencyTrigger();
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'es' ? 'Alerta de Emergencia' : 'Emergency Alert'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/60 py-2 px-3 flex justify-around items-center lg:hidden z-40 shadow-xl overflow-x-auto">
        {mobileNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`${item.id}-tab-trigger`}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id !== 'tracking') {
                  setPrefilledSearchId('');
                }
              }}
              className="flex flex-col items-center justify-center gap-1 min-w-[54px] cursor-pointer"
            >
              <div className={`p-1.5 rounded-lg transition-all ${
                isActive ? 'bg-blue-50 text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[8.5px] font-bold tracking-tight uppercase leading-none transition-colors ${
                isActive ? 'text-blue-600 font-extrabold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </footer>

    </div>
  );
}
