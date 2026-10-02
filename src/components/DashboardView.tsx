import React, { useState } from 'react';
import { 
  Shipment, 
  InventoryItem 
} from '../types';
import { 
  Truck, 
  Anchor, 
  Plane, 
  AlertOctagon, 
  ArrowRight, 
  PlusSquare, 
  DollarSign, 
  Warehouse as WarehouseIcon,
  HelpCircle,
  TrendingUp,
  FileText,
  UserCheck,
  Send,
  X
} from 'lucide-react';

interface DashboardViewProps {
  shipments: Shipment[];
  inventory: InventoryItem[];
  onTrackShipment: (id: string) => void;
  onNavigateToShip: () => void;
  lang: 'es' | 'en';
}

export default function DashboardView({ 
  shipments, 
  inventory, 
  onTrackShipment, 
  onNavigateToShip, 
  lang 
}: DashboardViewProps) {
  
  // KPI Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Quote Calculator Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteWeight, setQuoteWeight] = useState(1250);
  const [quoteMode, setQuoteMode] = useState<'Sea' | 'Air' | 'Road'>('Air');
  const [quoteOrigin, setQuoteOrigin] = useState('New York');
  const [quoteDest, setQuoteDest] = useState('São Paulo');

  // Report Issue Modal State
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState(shipments[0]?.id || '');
  const [issueDescription, setIssueDescription] = useState('');
  const [reportedIssues, setReportedIssues] = useState<Array<{id: string; desc: string; date: string}>>([]);

  // Contact Support Chat State
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'agent'; text: string}>>([
    { sender: 'agent', text: lang === 'es' ? 'Hola, soy Sarah Chen, tu gestora de cuentas. ¿Cómo puedo ayudarte hoy con la ruta?' : 'Hello, I am Sarah Chen, your dedicated accounts manager. How can I assist you with your routes today?' }
  ]);
  const [userMsg, setUserMsg] = useState('');

  // Total items calculation
  const totalSpend = 4500;
  const transitUnits = inventory.reduce((acc, curr) => acc + (curr.stockLevel < 20 ? curr.stockLevel : 0), 410);

  const kpis = [
    {
      id: 'active',
      title: lang === 'es' ? 'Envíos Activos' : 'Active Shipments',
      value: shipments.length.toString(),
      sub: '+12% vs LY',
      icon: Truck,
      bg: 'bg-slate-900 text-white border border-slate-800',
      badge: 'bg-blue-500/20 text-blue-300',
    },
    {
      id: 'ontime',
      title: lang === 'es' ? 'Entregas a Tiempo' : 'On-Time Delivery',
      value: '98%',
      sub: lang === 'es' ? 'Objetivo Cumplido' : 'Target Met',
      icon: Anchor,
      bg: 'bg-white border border-slate-200 text-slate-900 shadow-xs',
      badge: 'bg-emerald-50 text-emerald-700 border border-emerald-100/50',
    },
    {
      id: 'spend',
      title: lang === 'es' ? 'Gasto Total (MTD)' : 'Total Spend (MTD)',
      value: `$${totalSpend.toLocaleString()}`,
      sub: '+4.2%',
      icon: DollarSign,
      bg: 'bg-white border border-slate-200 text-slate-900 shadow-xs',
      badge: 'bg-blue-50 text-blue-700 border border-blue-100/50',
    },
    {
      id: 'transit',
      title: lang === 'es' ? 'Unidades en Tránsito' : 'Units In Transit',
      value: transitUnits.toString(),
      sub: lang === 'es' ? 'Estable' : 'Stable',
      icon: WarehouseIcon,
      bg: 'bg-white border border-slate-200 text-slate-900 shadow-xs',
      badge: 'bg-slate-100 text-slate-600 border border-slate-200/50',
    },
  ];

  const handleNextKpi = () => {
    setCarouselIndex((prev) => (prev + 1) % kpis.length);
  };

  const handlePrevKpi = () => {
    setCarouselIndex((prev) => (prev - 1 + kpis.length) % kpis.length);
  };

  // Live price calculation for quote window
  const calculatedQuotePrice = () => {
    let base = quoteWeight * 1.5;
    if (quoteMode === 'Air') base *= 2.6;
    if (quoteMode === 'Road') base *= 0.8;
    return Math.max(850, Math.round(base));
  };

  const handleSendSupportMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: userMsg }];
    setChatMessages(newMsgs);
    const storedMsg = userMsg;
    setUserMsg('');

    // Quick reactive response from support Agent
    setTimeout(() => {
      let reply = '';
      if (storedMsg.toLowerCase().includes('cargo') || storedMsg.toLowerCase().includes('envío') || storedMsg.toLowerCase().includes('shipment')) {
        reply = lang === 'es' 
          ? 'He comprobado el sistema y los manifiestos de aduana se han cargado de forma segura. ¿Quieres que prioricemos el tramo final?' 
          : 'I have checked the system logs; the customs manifests are securely processed. Should we flag this container for priority final-mile delivery?';
      } else {
        reply = lang === 'es'
          ? 'Entendido. Estoy monitoreando la ruta en tiempo real y te mantendré informado ante cualquier factor meteorológico.'
          : 'Understood. I am actively tracking the route and will dispatch live telemetry updates directly to your operations feed.';
      }
      setChatMessages(prev => [...prev, { sender: 'agent', text: reply }]);
    }, 1000);
  };

  const submitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDescription.trim()) return;
    setReportedIssues([
      ...reportedIssues,
      {
        id: selectedShipmentId,
        desc: issueDescription,
        date: new Date().toLocaleTimeString(),
      }
    ]);
    setIssueDescription('');
    setShowIssueModal(false);
  };

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-headline uppercase">
          {lang === 'es' ? 'COMANDO DE OPERACIONES GLOBALES' : 'Global Operations Command'}
        </h1>
        <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">
          {lang === 'es' ? 'VISTA GENERAL DE LA CADENA DE SUMINISTRO EN TIEMPO REAL' : 'Real-time supply chain overview'}
        </p>
      </header>

      {/* Reported Bottlenecks Alert Banner */}
      {reportedIssues.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900">
              {lang === 'es' ? 'Avisos de Cuellos de Botella Activos' : 'Operational Flagged Bottlenecks'}
            </h4>
            <div className="space-y-1.5 mt-1 text-xs text-amber-800">
              {reportedIssues.map((issue, idx) => (
                <p key={idx}>
                  • <strong>{issue.id}</strong>: {issue.desc} <span className="opacity-70 font-mono text-[10px]">({issue.date})</span>
                </p>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setReportedIssues([])}
            className="text-amber-500 hover:text-amber-800 text-xs font-bold font-headline uppercase"
          >
            {lang === 'es' ? 'Ignorar' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* KPI Summary Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold font-headline text-slate-400 uppercase tracking-widest">
            {lang === 'es' ? 'Métricas de Rendimiento' : 'Performance Metrics'}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevKpi}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Previous Metric"
            >
              <span className="sr-only">Previous</span>
              <span className="text-sm font-bold px-1.5 py-0.5">←</span>
            </button>
            <button 
              onClick={handleNextKpi}
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Next Metric"
            >
              <span className="sr-only">Next</span>
              <span className="text-sm font-bold px-1.5 py-0.5">→</span>
            </button>
          </div>
        </div>

        {/* Carousel Viewport Desktop (Grid) and Mobile (Solo Carousel Card) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div 
                key={kpi.id} 
                className={`p-6 rounded-xl shadow-sm flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 ${kpi.bg}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-current/80" />
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kpi.badge}`}>
                    {kpi.sub}
                  </span>
                </div>
                <div className="mt-8">
                  <p className="text-4xl font-headline font-extrabold leading-none">{kpi.value}</p>
                  <p className="text-xs opacity-75 mt-1">{kpi.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile carousel layout */}
        <div className="md:hidden">
          {(() => {
            const kpi = kpis[carouselIndex];
            const Icon = kpi.icon;
            return (
              <div className={`p-6 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-500 ${kpi.bg}`}>
                <div className="flex justify-between items-start">
                  <span className="p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-current" />
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.badge}`}>
                    {kpi.sub}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="text-4xl font-headline font-extrabold leading-none">{kpi.value}</p>
                  <p className="text-sm opacity-80 mt-1">{kpi.title}</p>
                </div>
                <div className="flex justify-center gap-1.5 mt-4">
                  {kpis.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${carouselIndex === idx ? 'bg-orange-500 scale-125' : 'bg-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Main Content Layout Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Shipments Section */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {lang === 'es' ? 'Envíos en Tránsito' : 'Active Shipments'}
            </h2>
            <button 
              onClick={() => onTrackShipment('')}
              className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
            >
              {lang === 'es' ? 'Ver Todos' : 'View All'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {shipments.map((shp) => {
              const borderColors: Record<string, string> = {
                'In Transit': 'border-l-4 border-amber-500',
                'Processing': 'border-l-4 border-slate-900',
                'Delayed': 'border-l-4 border-red-500',
                'Exception': 'border-l-4 border-[#e11d48]',
                'Delivered': 'border-l-4 border-emerald-500'
              };

              const badgeColors: Record<string, string> = {
                'In Transit': 'bg-amber-100/75 text-amber-800 border border-amber-200/50',
                'Processing': 'bg-blue-100/75 text-blue-800 border border-blue-200/50',
                'Delayed': 'bg-orange-100/75 text-orange-800 border border-orange-200/50',
                'Exception': 'bg-rose-100/75 text-rose-800 border border-rose-200/50',
                'Delivered': 'bg-emerald-100/75 text-emerald-800 border border-emerald-200/50'
              };

              return (
                <div 
                  key={shp.id} 
                  className={`bg-white p-5 rounded-2xl border border-slate-200/60 transition-all hover:bg-slate-50 hover:shadow-sm ${borderColors[shp.status] || ''}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-800">
                        {shp.mode === 'Sea' ? <Anchor className="w-5 h-5 text-slate-700" /> : shp.mode === 'Air' ? <Plane className="w-5 h-5 text-slate-700" /> : <Truck className="w-5 h-5 text-slate-700" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 tracking-tight">{shp.id}</h4>
                        <p className="text-xs text-slate-500 font-medium">{shp.origin.split(',')[0]} → {shp.destination.split(',')[0]}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-1 ${badgeColors[shp.status] || ''}`}>
                        {shp.status}
                      </span>
                      <p className="text-xs font-semibold text-slate-900">ETA {shp.eta}</p>
                    </div>
                    <div className="w-full sm:w-auto text-right">
                      <button 
                        onClick={() => onTrackShipment(shp.id)}
                        className="w-full sm:w-auto bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition-all border border-slate-200/50"
                      >
                        {lang === 'es' ? 'Rastrear' : 'Track'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions Grid Side Panel */}
        <section className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {lang === 'es' ? 'Acciones Rápidas' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            
            {/* Action 1: New Shipment */}
            <button 
              onClick={onNavigateToShip}
              className="aspect-square bg-slate-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/10"
            >
              <PlusSquare className="w-8 h-8 text-white" />
              <span className="font-bold text-xs tracking-wide uppercase text-center">
                {lang === 'es' ? 'Nuevo Envío' : 'New Shipment'}
              </span>
            </button>

            {/* Action 2: Quote Tool */}
            <button 
              onClick={() => setShowQuoteModal(true)}
              className="aspect-square bg-white border border-slate-200 text-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 hover:bg-slate-50 shadow-sm"
            >
              <DollarSign className="w-8 h-8 text-slate-700" />
              <span className="font-bold text-xs tracking-wide uppercase text-center">
                {lang === 'es' ? 'Calcular Tarifas' : 'Quote Request'}
              </span>
            </button>

            {/* Action 3: Report Bottleneck */}
            <button 
              onClick={() => setShowIssueModal(true)}
              className="aspect-square bg-white border border-slate-200 text-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 hover:bg-slate-50 shadow-sm"
            >
              <AlertOctagon className="w-8 h-8 text-rose-500" />
              <span className="font-bold text-xs tracking-wide uppercase text-center pt-1 leading-tight text-center">
                {lang === 'es' ? 'Reportar Retraso' : 'Report Issue'}
              </span>
            </button>

            {/* Action 4: Real Support Chat with Sarah */}
            <button 
              onClick={() => setShowSupportModal(true)}
              className="aspect-square bg-white border border-slate-200 text-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 hover:bg-slate-50 shadow-sm"
            >
              <UserCheck className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xs tracking-wide uppercase text-center">
                {lang === 'es' ? 'Gestor de Cuentas' : 'Contact Support'}
              </span>
            </button>
          </div>

          {/* Decorative Card - Market Trends */}
          <div className="relative overflow-hidden bg-slate-900 p-6 rounded-2xl text-white border border-slate-800">
            <div className="relative z-10 space-y-2">
              <h3 className="font-headline font-bold text-lg">
                {lang === 'es' ? 'Tendencias del Mercado' : 'Market Trends'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'es' 
                  ? 'Las tarifas marítimas se han estabilizado este trimestre. Planifica tu Q4 ahora para optimizar costes de fletes.' 
                  : 'Freight rates are stabilizing this quarter. Plan your Q4 logistics now to optimize continental shipping cost.'}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold border-b-2 border-blue-500 pb-0.5 text-white/95">
                  {lang === 'es' ? 'LEER ANÁLISIS DE COSTES' : 'READ LIVE ANALYSIS'}
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-white">
              <TrendingUp className="w-32 h-32 text-white" />
            </div>
          </div>
        </section>
      </div>

      {/* MODAL 1: Quote Calculator */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-headline text-slate-900">
                {lang === 'es' ? 'Calculadora Estimativa de Fletes' : 'Premium Cargo Rate Quote'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'es' ? 'Tarifas basadas en peso, procedencia y tipo de tránsito.' : 'Instant freight estimator for planning logistics.'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  {lang === 'es' ? 'Origen' : 'Origin Country'}
                </label>
                <input 
                  type="text" 
                  value={quoteOrigin} 
                  onChange={(e) => setQuoteOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-600 outline-none" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  {lang === 'es' ? 'Destino' : 'Destination Country'}
                </label>
                <input 
                  type="text" 
                  value={quoteDest} 
                  onChange={(e) => setQuoteDest(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-600 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {lang === 'es' ? 'Peso (KG)' : 'Weight (KG)'}
                  </label>
                  <input 
                    type="number" 
                    value={quoteWeight} 
                    onChange={(e) => setQuoteWeight(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-600 outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {lang === 'es' ? 'Modalidad' : 'Modal Shipping'}
                  </label>
                  <select 
                    value={quoteMode} 
                    onChange={(e) => setQuoteMode(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm px-3.5 py-2 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="Sea">{lang === 'es' ? 'Marítimo (Lento)' : 'Sea Freight Over'}</option>
                    <option value="Air">{lang === 'es' ? 'Aéreo (Exprés)' : 'Air Freight Cargo'}</option>
                    <option value="Road">{lang === 'es' ? 'Terrestre' : 'Inland Road'}</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600">
                    {lang === 'es' ? 'Total Estimado' : 'Estimated Total'}
                  </span>
                  <p className="text-2xl font-black text-blue-600 leading-none mt-1">
                    ${calculatedQuotePrice().toLocaleString()}.00
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowQuoteModal(false);
                    onNavigateToShip();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Solicitar Ahora' : 'Ship with This'} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Report Issue */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowIssueModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-headline text-rose-600 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" />
                <span>{lang === 'es' ? 'Reportar Retraso o Excepción' : 'Report Cargo Bottleneck'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'es' ? 'Registra una anomalía para su investigación inmediata.' : 'Log an operational exception inside the shipping pipeline.'}
              </p>
            </div>

            <form onSubmit={submitIssue} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  {lang === 'es' ? 'Identificador de Carga' : 'Select Cargo ID'}
                </label>
                <select 
                  value={selectedShipmentId}
                  onChange={(e) => setSelectedShipmentId(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-rose-500"
                >
                  {shipments.map(s => (
                    <option key={s.id} value={s.id}>{s.id} ({s.origin.split(',')[0]} → {s.destination.split(',')[0]})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2">
                  {lang === 'es' ? 'Descripción del Impedimento' : 'Exception / Construction Details'}
                </label>
                <textarea 
                  rows={3}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder={lang === 'es' ? 'Ejem. Retraso climático en canal, congestión portuaria huelga...' : 'E.g. Extreme weather advisor, highway closure near regional customs depot...'}
                  className="w-full bg-slate-100 border-none rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all"
              >
                {lang === 'es' ? 'Transmitir Flag de Retraso' : 'Transmit Exception Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Contact Support Chat with Sarah */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center gap-3 relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-blue-500/30">
                <img 
                  alt="Sarah Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm font-headline">Sarah Chen</h4>
                <p className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Global Account Manager</p>
              </div>
              <button 
                onClick={() => {}}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                {/* Visual indicator */}
              </button>
              <button 
                onClick={() => {
                  // close
                  const btn = document.getElementById('close-support-btn');
                  if (btn) btn.click();
                }}
                className="absolute top-4 right-4 text-white hover:bg-white/10 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              {/* Dummy close trigger for simplicity */}
              <button id="close-support-btn" className="hidden" onClick={() => setShowSupportModal(false)} />
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs font-medium leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-250 text-slate-800 rounded-bl-none shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* TextInput form */}
            <form onSubmit={handleSendSupportMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0">
              <input 
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder={lang === 'es' ? 'Haz una pregunta sobre tu tramo de carga...' : 'Ask about shipment status, delays, etc...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg text-xs px-3.5 py-3 outline-none focus:ring-2 focus:ring-blue-600"
         
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
