import React, { useState } from 'react';
import { Shipment } from '../types';
import { 
  MapPin, 
  Flag, 
  ShieldAlert, 
  Thermometer, 
  HelpCircle, 
  Ship, 
  Plane, 
  Truck, 
  Check, 
  CheckCircle,
  FileCheck,
  Globe,
  ArrowRight
} from 'lucide-react';

interface ShipViewProps {
  onAddShipment: (shp: Shipment) => void;
  lang: 'es' | 'en';
}

export default function ShipView({ onAddShipment, lang }: ShipViewProps) {
  // Wizard active step
  const [step, setStep] = useState(1);
  const [successCreatedId, setSuccessCreatedId] = useState('');

  // Form states
  const [originCountry, setOriginCountry] = useState('United States');
  const [originAddress, setOriginAddress] = useState('123 Industrial Way, Port Area');
  const [destCountry, setDestCountry] = useState('Brazil');
  const [destAddress, setDestAddress] = useState('Av. das Industrias 500, São Paulo');
  const [weight, setWeight] = useState(1250);
  const [cargoType, setCargoType] = useState<'General Cargo' | 'Hazmat' | 'Fragile' | 'Temperature Controlled'>('General Cargo');
  const [length, setLength] = useState(120);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(90);
  const [selectedMode, setSelectedMode] = useState<'Sea' | 'Air' | 'Road'>('Air');

  // Multi-step helpers
  const steps = [
    { title: lang === 'es' ? 'Ruta' : 'Origin/Dest', num: 1 },
    { title: lang === 'es' ? 'Carga' : 'Cargo Spec', num: 2 },
    { title: lang === 'es' ? 'Tránsito' : 'Mode Select', num: 3 },
    { title: lang === 'es' ? 'Fin' : 'Review Match', num: 4 }
  ];

  // Dynamic cost helper
  const getCalculatePrice = () => {
    let multiplier = 1.0;
    if (selectedMode === 'Air') multiplier = 3.88;
    if (selectedMode === 'Sea') multiplier = 0.96;
    if (selectedMode === 'Road') multiplier = 0.68;

    const base = weight * multiplier;
    const additional = cargoType !== 'General Cargo' ? 450 : 0;
    return Math.round(base + additional);
  };

  // Dynamic duration estimate helper
  const getEstTime = () => {
    if (selectedMode === 'Air') return '3-5 Days';
    if (selectedMode === 'Sea') return '22-28 Days';
    return '7-10 Days';
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      submitNewShipmentOrder();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const submitNewShipmentOrder = () => {
    // Generate high fidelity UUID code
    const generatedId = `LI-ORD-${Math.floor(1000 + Math.random() * 9000)}-${selectedMode === 'Air' ? 'EXP' : 'STD'}`;

    const newShipment: Shipment = {
      id: generatedId,
      carrier: selectedMode === 'Air' ? 'AERO-CARGO ALLIANCE' : selectedMode === 'Sea' ? 'GLOBAL PACIFIC SHIPPING' : 'CONTINENTAL CARRIER TRUCKS',
      vesselId: `${selectedMode.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}`,
      origin: `${originAddress}, ${originCountry}`,
      destination: `${destAddress}, ${destCountry}`,
      status: 'Processing',
      eta: 'Oct 28, 2026',
      weight: `${weight.toLocaleString()} KG`,
      mode: selectedMode,
      vesselName: selectedMode === 'Air' ? 'BOEING 777F FREIGHTER' : selectedMode === 'Sea' ? 'OCEANIC INTEGRATOR XII' : 'VOLVO TRUCK S900',
      cruisingSpeed: selectedMode === 'Air' ? '480 KNOTS' : selectedMode === 'Sea' ? '19.2 KNOTS' : '62 MPH',
      temperature: cargoType === 'Temperature Controlled' ? '4°C' : undefined,
      waypoints: [
        {
          id: 'wp1',
          time: 'Just Now',
          title: 'Shipment Order Created',
          description: 'Logged inside general trade book catalog',
          status: 'completed'
        },
        {
          id: 'wp2',
          time: 'Awaiting dispatch',
          title: 'Customs Transit Hold',
          description: 'Generating certified manifest digital signature',
          status: 'active'
        }
      ]
    };

    onAddShipment(newShipment);
    setSuccessCreatedId(generatedId);
    setStep(4); // Ensure final review confirms success!
  };

  const handleResetForm = () => {
    setStep(1);
    setSuccessCreatedId('');
    setOriginAddress('123 Industrial Way, Port Area');
    setDestAddress('Av. das Industrias 500, São Paulo');
    setWeight(1250);
    setCargoType('General Cargo');
    setSelectedMode('Air');
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-headline uppercase">
          {lang === 'es' ? 'Nuevo Pedido de Envío' : 'New Shipment Request'}
        </h2>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest leading-relaxed">
          {lang === 'es' ? 'GENERAR GUIAS Y EMBARQUES MULTIMODAL' : 'GENERATE MULTIMODAL SHIPPING ORDERS'}
        </p>
      </header>

      {/* Progressive Step Progress indicators */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <React.Fragment key={s.num}>
              <button 
                onClick={() => successCreatedId === '' && setStep(s.num)}
                disabled={successCreatedId !== ''}
                className="flex flex-col items-center gap-2 group focus:outline-none"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ring-4 transition-all ${
                  successCreatedId !== '' && s.num === 1 
                    ? 'bg-slate-900 text-white ring-blue-100'
                    : step === s.num 
                    ? 'bg-blue-600 text-white ring-blue-100 scale-110' 
                    : step > s.num 
                    ? 'bg-emerald-600 text-white ring-emerald-100' 
                    : 'bg-slate-100 text-slate-500 ring-transparent'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  step === s.num || (successCreatedId !== '' && s.num === 1) ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {s.title}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-6 transition-colors duration-300 ${
                  step > s.num ? 'bg-emerald-600' : 'bg-slate-100'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {successCreatedId ? (
        /* Success Screen */
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-slate-200/85 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-headline text-slate-900">
              {lang === 'es' ? '¡Orden Creada Satisfactoriamente!' : 'Shipment Dispatched Successfully!'}
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
              {lang === 'es' 
                ? `El envío número ${successCreatedId} ha ingresado a la red de distribución.` 
                : `Your premium shipment order ${successCreatedId} is registered & active inside our trade database.`}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl space-y-2 font-mono text-xs max-w-xs mx-auto text-left border border-slate-200/60">
            <p className="text-slate-700"><strong>ID:</strong> {successCreatedId}</p>
            <p className="text-slate-700"><strong>{lang === 'es' ? 'Ruta:' : 'Route:'}</strong> {originCountry} → {destCountry}</p>
            <p className="text-slate-700"><strong>{lang === 'es' ? 'Tipo:' : 'Transport:'}</strong> {selectedMode}</p>
            <p className="text-slate-700"><strong>{lang === 'es' ? 'Peso:' : 'Weight:'}</strong> {weight} KG</p>
          </div>
          <div className="flex gap-4 max-w-sm mx-auto">
            <button 
              onClick={handleResetForm}
              className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Nueva Orden' : 'Ship Another'}
            </button>
            <button 
              onClick={() => {
                // To track immediately, parent state will auto load this search ID
                window.location.hash = '#tracking'; // Simple helper triggers hash change
                const trackingBtn = document.getElementById('tracking-tab-trigger');
                if (trackingBtn) trackingBtn.click();
              }}
              className="flex-1 py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-705 transition-colors shadow-xs cursor-pointer"
            >
              {lang === 'es' ? 'Rastrear Ahora' : 'Track Active'}
            </button>
          </div>
        </div>
      ) : (
        /* Form inputs block Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Step 1: Routing */}
            {step === 1 && (
              <section className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-headline">
                    {lang === 'es' ? '1. Coordenadas de la Ruta' : 'Shipment Trade Route'}
                  </h3>
                  <div className="h-1 flex-grow bg-slate-100 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Origin */}
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-200/50">
                    <div className="flex items-center gap-2 text-slate-805 font-bold text-xs uppercase tracking-widest">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'es' ? 'Puerto o Bodega de Origen' : 'Origin Pier / Warehouse'}</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'País de Procedencia' : 'Country'}</label>
                        <select 
                          value={originCountry}
                          onChange={(e) => setOriginCountry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option>United States</option>
                          <option>Germany</option>
                          <option>Singapore</option>
                          <option>China</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Dirección Exacta o Muelle' : 'Pickup Terminal Address'}</label>
                        <input 
                          type="text" 
                          value={originAddress}
                          onChange={(e) => setOriginAddress(e.target.value)}
                          placeholder="123 Industrial Way, Port Area"
                          className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-200/50">
                    <div className="flex items-center gap-2 text-slate-805 font-bold text-xs uppercase tracking-widest">
                      <Flag className="w-4 h-4 text-blue-605 text-blue-600" />
                      <span>{lang === 'es' ? 'Muelle o Destinatario Final' : 'Final Port / Delivery Destination'}</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'País del Destinatario' : 'Country'}</label>
                        <select 
                          value={destCountry}
                          onChange={(e) => setDestCountry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option>Brazil</option>
                          <option>Mexico</option>
                          <option>Netherlands</option>
                          <option>United Arab Emirates</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Dirección del Destinatario' : 'Delivery Address'}</label>
                        <input 
                          type="text" 
                          value={destAddress}
                          onChange={(e) => setDestAddress(e.target.value)}
                          placeholder="Av. das Industrias 500, São Paulo"
                          className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Step 2: Cargo specifications */}
            {step === 2 && (
              <section className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-headline">
                    {lang === 'es' ? '2. Especificaciones de la Carga' : 'Cargo Specifications'}
                  </h3>
                  <div className="h-1 flex-grow bg-slate-100 rounded-full"></div>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/50 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Peso Total Bruto' : 'Total Weight (KG)'}</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={weight}
                          onChange={(e) => setWeight(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2.5 font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">KG</span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-2">{lang === 'es' ? 'Categoría de Tránsito' : 'Cargo Type Flags'}</label>
                      <div className="flex flex-wrap gap-2">
                        {(['General Cargo', 'Hazmat', 'Fragile', 'Temperature Controlled'] as const).map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setCargoType(t)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                              cargoType === t 
                                ? 'bg-blue-600 text-white shadow-sm cursor-pointer' 
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dimensions panel */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Largo (cm)' : 'Length (cm)'}</label>
                      <input 
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Ancho (cm)' : 'Width (cm)'}</label>
                      <input 
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{lang === 'es' ? 'Alto (cm)' : 'Height (cm)'}</label>
                      <input 
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Step 3: Transportation Mode */}
            {step === 3 && (
              <section className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-headline">
                    {lang === 'es' ? '3. Tipo de Tránsito de Flete' : 'Shipping Mode'}
                  </h3>
                  <div className="h-1 flex-grow bg-slate-100 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Sea Cargo */}
                  <div 
                    onClick={() => changeSelectMode('Sea')}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all min-h-[180px] flex flex-col justify-between ${
                      selectedMode === 'Sea' 
                        ? 'bg-slate-900 text-white border-blue-500 ring-4 ring-blue-900/10 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <Ship className={`w-8 h-8 ${selectedMode === 'Sea' ? 'text-white' : 'text-slate-850'}`} />
                        {selectedMode === 'Sea' && <span className="bg-blue-600 text-white p-1 rounded-full text-xs">✓</span>}
                      </div>
                      <h4 className={`font-bold text-base mt-3 ${selectedMode === 'Sea' ? 'text-white' : 'text-slate-900'}`}>{lang === 'es' ? 'Flete Marítimo' : 'Sea Freight'}</h4>
                      <p className={`text-xs mt-1 ${selectedMode === 'Sea' ? 'text-slate-300' : 'text-slate-500'}`}>Standard maritime container shipping</p>
                    </div>

                    <div className={`border-t pt-3 mt-4 flex justify-between items-end ${selectedMode === 'Sea' ? 'border-white/10' : 'border-slate-200'}`}>
                      <div>
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Sea' ? 'text-slate-400' : 'text-slate-400'}`}>Est. Time</p>
                        <p className="text-xs font-bold">22-28 Days</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Sea' ? 'text-slate-400' : 'text-slate-400'}`}>Starting at</p>
                        <p className={`text-base font-black ${selectedMode === 'Sea' ? 'text-blue-400' : 'text-blue-600'}`}>$1,200</p>
                      </div>
                    </div>
                  </div>

                  {/* Air Freight Card (Active by default) */}
                  <div 
                    onClick={() => changeSelectMode('Air')}
                    className={`cursor-pointer rounded-xl p-5 relative overflow-hidden transition-all border-2 border-transparent ${
                      selectedMode === 'Air' 
                        ? 'bg-slate-900 text-white border-blue-500 ring-4 ring-blue-900/10 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <Plane className={`w-8 h-8 ${selectedMode === 'Air' ? 'text-white' : 'text-slate-800'}`} />
                        {selectedMode === 'Air' && <span className="bg-blue-600 text-white p-1 rounded-full text-xs">✓</span>}
                      </div>
                      <h4 className={`font-bold text-base mt-3 ${selectedMode === 'Air' ? 'text-white' : 'text-slate-900'}`}>{lang === 'es' ? 'Flete Aéreo' : 'Air Freight'}</h4>
                      <p className={`text-xs mt-1 ${selectedMode === 'Air' ? 'text-slate-300' : 'text-slate-500'}`}>Express aerial transport for priority</p>
                    </div>

                    <div className={`border-t pt-3 mt-4 flex justify-between items-end ${selectedMode === 'Air' ? 'border-white/10' : 'border-slate-200'}`}>
                      <div>
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Air' ? 'text-slate-400' : 'text-slate-400'}`}>Est. Time</p>
                        <p className="text-xs font-bold">3-5 Days</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Air' ? 'text-slate-400' : 'text-slate-400'}`}>Estimated</p>
                        <p className={`text-base font-black ${selectedMode === 'Air' ? 'text-blue-400' : 'text-blue-600'}`}>$4,850</p>
                      </div>
                    </div>
                  </div>

                  {/* Road freight */}
                  <div 
                    onClick={() => changeSelectMode('Road')}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all min-h-[180px] flex flex-col justify-between ${
                      selectedMode === 'Road' 
                        ? 'bg-slate-900 text-white border-blue-500 ring-4 ring-blue-900/10 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <Truck className={`w-8 h-8 ${selectedMode === 'Road' ? 'text-white' : 'text-slate-800'}`} />
                        {selectedMode === 'Road' && <span className="bg-blue-600 text-white p-1 rounded-full text-xs">✓</span>}
                      </div>
                      <h4 className={`font-bold text-base mt-3 ${selectedMode === 'Road' ? 'text-white' : 'text-slate-900'}`}>{lang === 'es' ? 'Flete Terrestre' : 'Road Freight'}</h4>
                      <p className={`text-xs mt-1 ${selectedMode === 'Road' ? 'text-slate-300' : 'text-slate-500'}`}>Inland trucking and distribution</p>
                    </div>

                    <div className={`border-t pt-3 mt-4 flex justify-between items-end ${selectedMode === 'Road' ? 'border-white/10' : 'border-slate-200'}`}>
                      <div>
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Road' ? 'text-slate-400' : 'text-slate-400'}`}>Est. Time</p>
                        <p className="text-xs font-bold">7-10 Days</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-[9px] uppercase font-bold ${selectedMode === 'Road' ? 'text-slate-400' : 'text-slate-400'}`}>Starting at</p>
                        <p className={`text-base font-black ${selectedMode === 'Road' ? 'text-blue-400' : 'text-blue-600'}`}>$850</p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* Custom setter function helper since TS wants specific names */}
            {(() => {
              // helper to map local var so child is safe
              return null;
            })()}

            {/* Action buttons (Back, Continue) */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="py-3 px-6 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {lang === 'es' ? 'Atrás' : 'Back'}
                </button>
              )}
              <button
                onClick={handleNextStep}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-xs cursor-pointer"
              >
                {step === 4 
                  ? (lang === 'es' ? 'Enviar Orden de Flete' : 'Submit Shipping Order') 
                  : (lang === 'es' ? 'Siguiente Paso' : 'Proceed to Next Step')
                }
              </button>
            </div>

          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6 animate-fadeIn">
              
              {/* Request Summary */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3">
                  {lang === 'es' ? 'Resumen de la Solicitud' : 'Request Summary'}
                </h3>

                <div className="space-y-4">
                  {/* Route progress */}
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-16 bg-blue-600 rounded-full shrink-0"></div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400">Origin Point</span>
                      <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{originCountry}</p>
                      
                      <span className="text-[9px] font-bold uppercase text-slate-400 block mt-2">Destination Port</span>
                      <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{destCountry}</p>
                    </div>
                  </div>

                  {/* Specifications details */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 text-center">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400">{lang === 'es' ? 'Peso Registrado' : 'Total Weight'}</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{weight} KG</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400">{lang === 'es' ? 'Vía Tránsito' : 'Transport'}</span>
                      <p className="text-sm font-bold text-blue-600 mt-0.5 uppercase">{selectedMode} Transit</p>
                    </div>
                  </div>

                  {/* Calculated Est Total */}
                  <div className="bg-blue-50/70 p-4 rounded-xl flex items-center justify-between border border-blue-100/50">
                    <span className="text-xs font-bold uppercase text-slate-600">{lang === 'es' ? 'Costo Estimado' : 'Est. Total'}</span>
                    <span className="text-2xl font-black text-blue-700 font-headline">${getCalculatePrice().toLocaleString()}.00</span>
                  </div>

                  {/* Summary progress bar */}
                  <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {lang === 'es' ? `Tránsito Ajustado: ~ ${getEstTime()}` : `Transit SLA Estimate: ~ ${getEstTime()}`}
                    </span>
                  </div>

                </div>
              </div>

              {/* Little map card */}
              <div className="rounded-2xl overflow-hidden h-40 relative bg-slate-100 border border-slate-200 shadow-xs">
                <img 
                  alt="Transit World Overview" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwUrRAxQHeElQDq_IgsOGq8JBsiT13oYKVTg2a-quOKCGqcvGAVfREGIMBrpNxkGukHuppCjLq6grmiZMsUhwRlBvhXHxFOfrbW4oV8qEjtoDnOhCYpj01h_l1VzK7DX6vKJCi9rbiucEd9KUbfPxB-efCNYvWF3tlj_7186NSEGNHFWemytzjbif9znBn9rxNp-TJtXGweGK1tnFSUXUQGvSwX7dbVdFBazc-drKFQ1O769pE-wpdJRg8OyVT6itqbshjJ1kCIg0" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2 text-white">
                    <Globe className="w-4 h-4 text-blue-300 animate-spin-slow" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">
                      {lang === 'es' ? 'Vista Satelital del Tránsito' : 'Live Route Preview'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );

  // Helper setter override defined internally
  function changeSelectMode(val: 'Sea' | 'Air' | 'Road') {
    setLength(val === 'Air' ? 120 : val === 'Sea' ? 600 : 250);
    setHeight(val === 'Air' ? 90 : val === 'Sea' ? 240 : 180);
    setSelectedMode(val);
  }
}
