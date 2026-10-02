import React, { useState, useEffect } from 'react';
import { Shipment } from '../types';
import { 
  Search, 
  MapPin, 
  Ship, 
  Navigation,
  Compass,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Shield,
  Snowflake,
  LifeBuoy,
  FileCheck,
  Building,
  Tag,
  Weight,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface TrackingViewProps {
  shipments: Shipment[];
  prefilledSearchId?: string;
  lang: 'es' | 'en';
}

export default function TrackingView({ shipments, prefilledSearchId, lang }: TrackingViewProps) {
  const [searchId, setSearchId] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sync with prefilled search when selected from active dashboard
  useEffect(() => {
    if (prefilledSearchId) {
      setSearchId(prefilledSearchId);
      const found = shipments.find(s => s.id.toUpperCase() === prefilledSearchId.toUpperCase());
      if (found) {
        setSelectedShipment(found);
      }
    } else if (shipments.length > 0 && !selectedShipment) {
      // Default to first shipment
      setSelectedShipment(shipments[0]);
      setSearchId(shipments[0].id);
    }
  }, [prefilledSearchId, shipments]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = searchId.trim().toUpperCase();
    const found = shipments.find(s => s.id.toUpperCase() === cleaned);
    if (found) {
      setSelectedShipment(found);
    } else {
      setSelectedShipment(null);
    }
  };

  const selectShipment = (shp: Shipment) => {
    setSelectedShipment(shp);
    setSearchId(shp.id);
  };

  // High fidelity images based on selected shipment type
  const mapImagesByMode = {
    Sea: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtbiGHoheD-GwzFIcn00rQ8ZdcDjCYBvGf1soTNO_nxfHsbsJVmfzW60wXRai50EAD-5SooTKSIK3XYbV3kkCW9bDnLZ5bOUE8ENwB69YIAA3561MjlWfzirbyl0P3Q5exG6_aIIWegzBJN-0DWICyAF7f74N1qlnYt9Wu3D0STZvNAW_ArdtaoykinEYPBFHD_ufcDnnGKekrLCbCu1iZg_knN7a9axtq4FwgBBSfruaC7B3G2qZqVh86oAafYEkUbchDzXmfpM4', // Singapore Strait
    Air: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwUrRAxQHeElQDq_IgsOGq8JBsiT13oYKVTg2a-quOKCGqcvGAVfREGIMBrpNxkGukHuppCjLq6grmiZMsUhwRlBvhXHxFOfrbW4oV8qEjtoDnOhCYpj01h_l1VzK7DX6vKJCi9rbiucEd9KUbfPxB-efCNYvWF3tlj_7186NSEGNHFWemytzjbif9znBn9rxNp-TJtXGweGK1tnFSUXUQGvSwX7dbVdFBazc-drKFQ1O769pE-wpdJRg8OyVT6itqbshjJ1kCIg0', // Minimalist trade points light
    Road: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVuXgtMJRATpw-R091w3WHvd2GEJfJ03p_VhwUntjb9GDaqLfjG2pUOCQfiK-afJ4pDFOBgTnnDacjuIMeGYPB-Q8mmy3xFZDrYhJ9VtDJbnAe-Quo_jStRuiYfJ1Zy7WLJLQGODwvjcTLVlKr1ZZzZSbH6OruMplMls8O0smHDMx7i6Nxm9M0My5yyKkbilnSIZnB7TPxySws73-j06qBKV9bHkW62_KfKWVGHQMfuCBPacVLxc0Xnc20v4H-6Ep2H8B77uXqMo' // Topo routes Style LA
  };

  return (
    <div className="space-y-12">
      {/* Top Search bar inside primary tone container as shown in design */}
      <section className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-headline">
              {lang === 'es' ? 'Rastreador de Activos Globales' : 'Track Your Assets'}
            </h2>
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
              {lang === 'es' ? 'INGRESE ID DE ENVÍO O CONTENEDOR PARA TELEMETRÍA EN TIEMPO REAL' : 'ENTER SHIPMENT OR CONTAINER ID FOR REAL-TIME TELEMETRY'}
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Compass className="w-5 h-5 text-blue-400 animate-spin-slow" />
            </div>
            <input 
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="LI-7700-4829-XQ, SHP-99281-XM..."
              className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl py-5 pl-14 pr-36 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500 transition-all font-headline font-bold text-lg outline-none"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-full rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              >
                {lang === 'es' ? 'Localizar' : 'Track'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick pick references */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 pt-1.5 mr-1">
              {lang === 'es' ? 'Accesos rápidos:' : 'Quick Select:'}
            </span>
            {shipments.map(s => (
              <button
                key={s.id}
                onClick={() => selectShipment(s)}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                  selectedShipment?.id === s.id 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Conditional loaded display feedback */}
      {!selectedShipment ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'es' ? 'No se encontró la carga' : 'Shipment Reference Not Loaded'}
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            {lang === 'es' ? 'Por favor intente con uno de los IDs de acceso rápido arriba' : 'Type a valid ID or click one of the quick tabs above to simulate tracker.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main left: Live Navigation Map View */}
          <div className="lg:col-span-8 bg-slate-100 rounded-2xl overflow-hidden min-h-[500px] relative shadow-md border border-slate-200/50">
            <img 
              alt="Telemetry Map Overlay" 
              className="w-full h-full object-cover transition-transform duration-500" 
              src={mapImagesByMode[selectedShipment.mode] || mapImagesByMode.Sea}
              style={{ transform: `scale(${zoomLevel})` }}
              referrerPolicy="no-referrer"
            />
            
            {/* Real-time coordinates floating details (Glassmorphic) */}
            <div className="absolute top-6 left-6 flex flex-col gap-3 max-w-[280px]">
              
              {/* Vessel specs */}
              <div className="glass-panel bg-white/95 p-4 rounded-xl shadow-md border border-slate-200/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                    <Ship className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">
                      {selectedShipment.mode === 'Air' ? (lang === 'es' ? 'Aeronave Activa' : 'Current Aircraft') : (lang === 'es' ? 'Buque de Carga' : 'Current Vessel')}
                    </p>
                    <p className="font-headline font-bold text-sm text-slate-900 truncate uppercase">
                      {selectedShipment.vesselName || 'MARITIME STAR VII'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transit Speed specs */}
              <div className="glass-panel bg-white/95 p-4 rounded-xl shadow-md border border-slate-200/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">
                      {lang === 'es' ? 'Velocidad de Crucero' : 'Cruising Speed'}
                    </p>
                    <p className="font-headline font-bold text-sm text-slate-900">
                      {selectedShipment.cruisingSpeed || '18.4 KNOTS'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Climate Alert if temperature control exists */}
              {selectedShipment.temperature && (
                <div className="glass-panel bg-sky-50/95 p-3 rounded-lg border border-sky-100 flex items-center gap-2.5">
                  <Snowflake className="w-4 h-4 text-sky-600 animate-spin-slow shrink-0" />
                  <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wide">
                    {lang === 'es' ? `Clima Asegurado: ${selectedShipment.temperature}` : `Climate Managed: ${selectedShipment.temperature}`}
                  </span>
                </div>
              )}
            </div>

            {/* Float zoom controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
                className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-slate-50 flex items-center justify-center text-slate-800 hover:scale-105 transition-all outline-none"
                title={lang === 'es' ? 'Acercar' : 'Zoom In'}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
                className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-slate-50 flex items-center justify-center text-slate-800 hover:scale-105 transition-all outline-none"
                title={lang === 'es' ? 'Alejar' : 'Zoom Out'}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
            
            {/* Dynamic Map Coordinate Location Label */}
            <div className="absolute bottom-6 left-6 glass-panel bg-white/95 px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
              <span className="font-mono text-[9px] font-extrabold text-slate-800 tracking-tighter uppercase">
                {selectedShipment.destination.split(',')[0]} Transit Corridor
              </span>
            </div>
          </div>

          {/* Right Column: Spec Specifications and Timeline Milestones */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* SPECifications Container */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-headline font-bold text-base text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <span>{lang === 'es' ? 'Datos del Manifiesto' : 'Manifest Details'}</span>
              </h3>

              <div className="space-y-4">
                
                {/* 1. Carrier */}
                <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      {lang === 'es' ? 'Transportista' : 'Carrier'}
                    </label>
                    <p className="font-headline font-bold text-xs text-slate-900">
                      {selectedShipment.carrier}
                    </p>
                  </div>
                  <Building className="w-4 h-4 text-slate-400" />
                </div>

                {/* 2. Vessel/Flight ID */}
                <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      {lang === 'es' ? 'ID Aeronave / Buque' : 'Flight / Vessel ID'}
                    </label>
                    <p className="font-headline font-bold text-xs text-slate-900">
                      {selectedShipment.vesselId}
                    </p>
                  </div>
                  <Tag className="w-4 h-4 text-slate-400" />
                </div>

                {/* 3. Weight */}
                <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      {lang === 'es' ? 'Peso Bruto Registrado' : 'Total Gross Weight'}
                    </label>
                    <p className="font-headline font-bold text-xs text-slate-900">
                      {selectedShipment.weight}
                    </p>
                  </div>
                  <Weight className="w-4 h-4 text-slate-400" />
                </div>

                {/* 4. Estimated arrival card */}
                <div className="bg-blue-50/70 border border-blue-100/50 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">
                    {lang === 'es' ? 'Arribo Estimado' : 'Estimated Arrival'}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-headline font-extrabold text-blue-900 text-xl">
                      {selectedShipment.eta}
                    </p>
                    <span className="text-[10px] font-extrabold text-blue-700 bg-white px-2.5 py-0.5 rounded shadow-xs uppercase border border-blue-100/40">
                      {selectedShipment.status === 'Delayed' ? (lang === 'es' ? 'Retrasado' : 'Delayed') : (lang === 'es' ? 'En Tiempo' : 'Within 4d')}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* MILESTONES TIMELINE */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-headline font-bold text-base text-slate-900">
                {lang === 'es' ? 'Hitos del Tránsito' : 'Milestone Progress'}
              </h3>

              <div className="relative space-y-6">
                
                {/* Visual Line connector */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                {selectedShipment.waypoints.map((wp, idx) => {
                  return (
                    <div key={wp.id} className="relative flex gap-4 pl-1">
                      
                      {/* Circle dot representing milestone stage */}
                      <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                        wp.status === 'completed' 
                          ? 'bg-slate-900' 
                          : wp.status === 'active' 
                          ? 'bg-blue-500 ring-blue-500/30 animate-pulse' 
                          : 'bg-slate-200'
                      }`}>
                        {wp.status === 'completed' && <span className="text-[10px] text-white">✓</span>}
                        {wp.status === 'active' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </div>

                      <div className={wp.status === 'pending' ? 'opacity-45' : ''}>
                        {wp.status === 'active' && (
                          <span className="bg-blue-50 text-blue-700 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded block w-max mb-1 border border-blue-100/50">
                            {lang === 'es' ? 'ACTUAL' : 'IN TRANSIT'}
                          </span>
                        )}
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{wp.time}</p>
                        <p className="text-xs font-bold text-slate-900 leading-tight mt-0.5">{wp.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{wp.description}</p>
                      </div>

                    </div>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      )}

      {/* Auxiliary Logistics Legend (Secure Handover...) as specified under design specs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-start gap-4">
          <Shield className="w-6 h-6 text-slate-800 shrink-0" />
          <div>
            <h4 className="font-headline font-bold text-sm text-slate-800 mb-1">
              {lang === 'es' ? 'Custodia Asegurada' : 'Secure Handover'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {lang === 'es' 
                ? 'Todos los hitos están firmados digitalmente para asegurar la integridad de la cadena de custodia.' 
                : 'All milestone events are cryptographically signed to maintain compliance custody logs.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-start gap-4">
          <Snowflake className="w-6 h-6 text-slate-800 shrink-0" />
          <div>
            <h4 className="font-headline font-bold text-sm text-slate-800 mb-1">
              {lang === 'es' ? 'Monitoreo de Temperatura' : 'Climate Integrity'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {lang === 'es' 
                ? 'La carga fría mantiene valores estables de 4°C garantizando la integridad de los componentes.' 
                : 'Shipment temperature state logs are consistently processed to guarantee product safety.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex items-start gap-4">
          <LifeBuoy className="w-6 h-6 text-slate-800 shrink-0" />
          <div>
            <h4 className="font-headline font-bold text-sm text-slate-800 mb-1">
              {lang === 'es' ? 'Despacho Exclusivo' : 'Dedicated Analyst'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {lang === 'es' 
                ? 'Tu gestor de cuentas Sarah Chen monitorea proactivamente esta ruta con alertas satelitales.' 
                : 'Your dedicated operations analyst monitors traffic, lanes, and weather anomalies continuously.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
