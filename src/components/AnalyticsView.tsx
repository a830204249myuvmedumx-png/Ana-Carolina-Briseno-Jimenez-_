import React, { useState } from 'react';
import { ReportItem } from '../types';
import { 
  BarChart, 
  Download, 
  Calendar, 
  CloudDownload, 
  CheckCircle, 
  TrendingUp, 
  Timer, 
  PiggyBank, 
  Percent,
  FileCheck,
  FileText,
  Table,
  Check
} from 'lucide-react';

interface AnalyticsViewProps {
  reports: ReportItem[];
  lang: 'es' | 'en';
}

export default function AnalyticsView({ reports, lang }: AnalyticsViewProps) {
  const [downloadLogs, setDownloadLogs] = useState<Record<string, number>>({});
  const [lastDownloaded, setLastDownloaded] = useState<string | null>(null);

  // Custom range report builder states
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-24');
  const [reportFormat, setReportFormat] = useState<'PDF' | 'XLSX'>('PDF');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock charts values
  const monthlyVolume = [
    { month: 'May', volume: 45 },
    { month: 'Jun', volume: 68 },
    { month: 'Jul', volume: 80 },
    { month: 'Aug', volume: 55 },
    { month: 'Sep', volume: 92 },
    { month: 'Oct', volume: 110 },
  ];

  const costDistribution = [
    { name: 'Ocean Freight', pct: 64, color: 'bg-blue-600' },
    { name: 'Air Express', pct: 22, color: 'bg-indigo-500' },
    { name: 'Road & Ground', pct: 14, color: 'bg-emerald-600' },
  ];

  const handleDownload = (id: string, name: string) => {
    setDownloadLogs(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setLastDownloaded(name);
    setTimeout(() => {
      setLastDownloaded(null);
    }, 4000);
  };

  const generateCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      handleDownload('custom-gen', `Custom Cargo Log (${startDate} to ${endDate})`);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Page Header */}
      <header className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-headline uppercase">
          {lang === 'es' ? 'Métricas y Analíticas' : 'Operational Analytics'}
        </h2>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest block font-sans">
          {lang === 'es' ? 'RENDIMIENTO DE COSTES Y EFICIENCIA DE TRÁNSITO' : 'COST PERFORMANCE & TRANSIT LANE EFFICIENCY'}
        </p>
      </header>

      {/* Success Download banner */}
      {lastDownloaded && (
        <div className="bg-emerald-50 border-l-4 border-emerald-505 border-emerald-500 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs text-emerald-800 font-bold">
            {lang === 'es' 
              ? `✓ Documento "${lastDownloaded}" se descargó de manera segura.` 
              : `✓ Live document "${lastDownloaded}" exported & downloaded successfully.`}
          </p>
        </div>
      )}

      {/* KPI Key Performance Indicators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50/70 text-blue-600 flex items-center justify-center shrink-0">
            <Timer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              {lang === 'es' ? 'Tiempo de Tránsito Promedio' : 'Average Transit Time'}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-950 font-headline">4.2 Days</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">-12% vs LY</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100/50 text-indigo-600 flex items-center justify-center shrink-0">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              {lang === 'es' ? 'Costo Logístico por Unidad' : 'Logistics Cost Per Unit'}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-950 font-headline">$12.85</span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full">+3.4% inflation</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              {lang === 'es' ? 'Rendimiento de Entregas' : 'On-Time Performance'}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-950 font-headline">98.2%</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Target: 96%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section: Volume and Cost share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Shipping Volume columns (Raw HTML + flex columns) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
              {lang === 'es' ? 'Volumen Mensual de Envíos (TEU)' : 'Monthly Shipping Volume (TEU)'}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {lang === 'es' ? 'MÁXIMO HISTÓRICO' : 'ALL TIME HIGH'}
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {monthlyVolume.map((item) => {
              // Calculate percent height based on max 120
              const pctHeight = (item.volume / 120) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full relative">
                    {/* Hover Tooltip tooltip hover code */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-all z-20 whitespace-nowrap pointer-events-none">
                      {item.volume} Shipments
                    </div>
                    {/* Vertical Column Bar */}
                    <div 
                      className="w-full bg-slate-100 group-hover:bg-blue-600 rounded-t-lg transition-all duration-300" 
                      style={{ 
                        height: `${pctHeight}%`,
                        backgroundColor: item.month === 'Oct' ? '#3b82f6' : undefined 
                      }} 
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Distribution Donuts / progress rows */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
            {lang === 'es' ? 'Distribución por Transporte' : 'Freight Cost Share'}
          </h3>

          <div className="space-y-6 pt-4">
            {costDistribution.map((item) => {
              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-700">{item.name}</span>
                    <span className="font-extrabold text-slate-900">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50/70 p-4 rounded-xl text-center border border-blue-100/50">
            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide leading-tight">
              {lang === 'es' ? 'Optimización Marítima Sugerida' : 'Recommended Maritime Shift:'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'es' 
                ? 'Trasladar un 5% de volumen aéreo a marítimo reduciría costes en $12,400.' 
                : 'Routing 5% of air express lines via sea lanes yields $12,400 regional savings.'}
            </p>
          </div>
        </div>

      </div>

      {/* Reports and exports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: manifest reports ledger list */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
            {lang === 'es' ? 'Manifiestos y Auditorías de Rendimiento' : 'Operations Audit Ledger'}
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {reports.map((rep) => {
              const downloadCount = downloadLogs[rep.id] || 0;
              return (
                <div key={rep.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                      {rep.type === 'PDF' ? <FileText className="w-5 h-5 text-red-500" /> : <Table className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-950">{rep.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                        {rep.type} • {rep.size} • {rep.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {downloadCount > 0 && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Downloaded ({downloadCount}x)
                      </span>
                    )}
                    <button 
                      onClick={() => handleDownload(rep.id, rep.name)}
                      className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                      title="Download Manifest"
                    >
                      <Download className="w-4 h-4 text-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: custom generator query card */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
              {lang === 'es' ? 'Generador Personalizado' : 'Export Custom Manifest'}
            </h3>

            <form onSubmit={generateCustomReport} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">{lang === 'es' ? 'Desde' : 'Start Date'}</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-2 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">{lang === 'es' ? 'Hasta' : 'End Date'}</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-2 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">{lang === 'es' ? 'Formato del Documento' : 'Document Format'}</label>
                <div className="flex gap-2">
                  {(['PDF', 'XLSX'] as const).map((format) => (
                    <button
                      type="button"
                      key={format}
                      onClick={() => setReportFormat(format)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        reportFormat === format 
                          ? 'bg-blue-600 text-white border-transparent' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-blue-650 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <CloudDownload className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Generar y Exportar' : 'Compile & Export'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
