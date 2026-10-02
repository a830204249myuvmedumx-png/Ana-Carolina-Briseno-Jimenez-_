import React, { useState } from 'react';
import { GoogleUserProfile } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Boxes, 
  Truck, 
  Compass, 
  LogOut, 
  RefreshCw, 
  UserCheck, 
  Building2, 
  Award,
  Zap,
  Lock,
  Globe2,
  ChevronRight
} from 'lucide-react';

interface WelcomeViewProps {
  user: GoogleUserProfile | null;
  onActivateWithGoogle: (profile: Partial<GoogleUserProfile>) => void;
  onSignOut: () => void;
  onNavigate: (tab: string) => void;
  lang: 'es' | 'en';
}

export default function WelcomeView({
  user,
  onActivateWithGoogle,
  onSignOut,
  onNavigate,
  lang,
}: WelcomeViewProps) {
  const isEs = lang === 'es';

  // Form states for custom activation or edit
  const [selectedEmail, setSelectedEmail] = useState('a830204249@my.uvm.edu.mx');
  const [fullName, setFullName] = useState('Alex R. Morales');
  const [selectedRole, setSelectedRole] = useState(
    isEs ? 'Director de Operaciones Logísticas' : 'Global Logistics Director'
  );
  const [organization, setOrganization] = useState(
    isEs ? 'Amazon Logistics Partner / UVM' : 'Amazon Logistics Partner / UVM'
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);

  const roles = isEs
    ? [
        'Director de Operaciones Logísticas',
        'Gerente de Cadena de Suministro (Amazon FBA)',
        'Supervisor de Almacén y Fulfillment',
        'Especialista en Transporte y Última Milla',
        'Analista de Comercio Exterior e Incoterms',
        'Estudiante / Investigador de Logística'
      ]
    : [
        'Global Logistics Director',
        'Supply Chain Manager (Amazon FBA)',
        'Warehouse & Fulfillment Supervisor',
        'Fleet & Last-Mile Specialist',
        'Trade & Customs Analyst',
        'Logistics Student / Trainee'
      ];

  const handleGoogleConnect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsConnecting(true);

    // Simulate official Google OAuth token verification handshake
    setTimeout(() => {
      const generatedGoogleId = 'google-oauth2|109283746192837461829';
      const licenseNum = `VRD-${Math.floor(100000 + Math.random() * 900000)}`;

      onActivateWithGoogle({
        name: fullName.trim() || 'Alexander Thorne',
        email: selectedEmail.trim() || 'a830204249@my.uvm.edu.mx',
        role: selectedRole,
        organization: organization.trim() || 'Veridian Global Trade',
        googleId: generatedGoogleId,
        isActivated: true,
        activatedAt: new Date().toLocaleDateString(isEs ? 'es-MX' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        licenseNumber: licenseNum,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DqkksIRd7dKnqN8MlEjOYmo-Qcca2IWZx6dUhnxiMF8YW1cuhXt7hBMJornjoJla4zmtQI0gpTKzal1afIEd1XvCYBf7_owpDyl2XuNaEsH7NgxUeW0-KfAmlR1y-K7vCZgj3tQEQhiJOeJ0-JhQZNtjZUOGW3sIBxpQusup47Lai3dYFgKHn9nylrnBreipfQFRetwgAUHhTzUpPkVHoP7_sqfYqmgDCyJ6O2WEMOX33ogOxNFV2ODnoxCW7Rdz-NA79EmB8oo'
      });
      setIsConnecting(false);
      setShowAccountSwitcher(false);
    }, 750);
  };

  // Google SVG Icon
  const GoogleIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isEs ? 'Portal de Activación & Bienvenida' : 'Welcome & Activation Portal'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-headline">
              {user?.isActivated
                ? (isEs ? `¡Bienvenido de vuelta, ${user.name}!` : `Welcome back, ${user.name}!`)
                : (isEs ? 'Bienvenido a Veridian Logistics' : 'Welcome to Veridian Logistics')}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {isEs
                ? 'Centro de mando y simulador empresarial estilo Amazon. Domina las 8 fases clave de la cadena de suministro global, desde compras y almacén hasta aduanas y última milla.'
                : 'Amazon-style global logistics command center and academy. Master all 8 key supply chain phases from procurement and warehousing to customs and last-mile delivery.'}
            </p>
          </div>

          {/* User state preview chip */}
          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shrink-0 w-full md:w-auto shadow-md">
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
              {isEs ? 'Estado de Cuenta Google' : 'Google Account Status'}
            </div>
            {user?.isActivated ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {isEs ? 'Activa & Verificada' : 'Active & Verified'}
                  </div>
                  <div className="text-xs text-slate-400 truncate max-w-[180px]">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {isEs ? 'Pendiente de Activación' : 'Pending Activation'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {isEs ? 'Inicia sesión con Google' : 'Sign in with Google'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Account Activation Card & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Google Account Activation or Active Profile Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {user?.isActivated && !showAccountSwitcher ? (
            /* ACTIVE GOOGLE PROFILE CARD */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-blue-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm border border-slate-200">
                      <GoogleIcon />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {isEs ? 'Google Conectado' : 'Google Connected'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAccountSwitcher(true)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                  title="Cambiar detalles de cuenta"
                >
                  {isEs ? 'Cambiar cuenta' : 'Switch account'}
                </button>
              </div>

              {/* Verified Identity Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {isEs ? 'Organización' : 'Organization'}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1 truncate">
                    {user.organization || 'Amazon Partner Network'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-slate-500" />
                    {isEs ? 'Licencia Operativa' : 'Operational ID'}
                  </div>
                  <div className="text-xs font-bold text-blue-700 mt-1 font-mono">
                    {user.licenseNumber}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {isEs ? 'Activado el' : 'Activated On'}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {user.activatedAt}
                  </div>
                </div>
              </div>

              {/* Action buttons inside card */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('simulator')}
                  className="flex-1 min-w-[200px] py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{isEs ? 'Ir a Academia & Simulador Amazon' : 'Go to Amazon Simulator'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  {isEs ? 'Panel Principal' : 'Dashboard'}
                </button>

                <button
                  onClick={onSignOut}
                  className="py-3.5 px-4 text-red-600 hover:bg-red-50 font-bold text-xs uppercase tracking-wider rounded-xl border border-red-200 transition-all flex items-center gap-1.5"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Desactivar' : 'Sign out'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* GOOGLE ACTIVATION FORM CARD */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEs ? 'Activación Oficial de Cuenta' : 'Official Account Activation'}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isEs ? 'Conecta y Activa tu Cuenta con Google' : 'Connect & Activate with Google'}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  {isEs
                    ? 'Accede con tu cuenta institucional o personal de Google para guardar progreso, simular negocios de logística y desbloquear certificados.'
                    : 'Sign in with your institutional or personal Google account to track progress, simulate logistics operations, and unlock certifications.'}
                </p>
              </div>

              {/* Fast One-Click Google Action Button */}
              <div className="space-y-3">
                <button
                  onClick={() => handleGoogleConnect()}
                  disabled={isConnecting}
                  className="w-full py-4 px-6 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border-2 border-slate-200 hover:border-slate-400 shadow-sm flex items-center justify-center gap-3 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                  ) : (
                    <GoogleIcon />
                  )}
                  <span>
                    {isConnecting
                      ? (isEs ? 'Verificando credencial de Google...' : 'Verifying Google credentials...')
                      : (isEs ? 'Continuar con Google (Activación Inmediata)' : 'Continue with Google (Instant Activation)')}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>
                    {isEs
                      ? 'Autenticación protegida con protocolo Google Identity Services'
                      : 'Protected authentication via Google Identity Services'}
                  </span>
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-bold tracking-widest">
                  {isEs ? 'Personalizar Perfil' : 'Customize Profile'}
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Customizing Google User Information Form */}
              <form onSubmit={handleGoogleConnect} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {isEs ? 'Correo Electrónico de Google' : 'Google Email Account'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={selectedEmail}
                      onChange={(e) => setSelectedEmail(e.target.value)}
                      placeholder="usuario@google.com o institucional"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      required
                    />
                    <div className="absolute right-3 top-3 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Google OAuth
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isEs ? 'Nombre Completo' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Alex Rodríguez"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isEs ? 'Institución / Empresa' : 'Company / Campus'}
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Ej. UVM / Amazon Logistics"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {isEs ? 'Rol Operativo en el Negocio' : 'Operational Role in Business'}
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>
                      {isConnecting
                        ? (isEs ? 'Conectando con Google...' : 'Connecting with Google...')
                        : (isEs ? 'Activar Usuario con Google' : 'Activate User with Google')}
                    </span>
                  </button>

                  {user?.isActivated && (
                    <button
                      type="button"
                      onClick={() => setShowAccountSwitcher(false)}
                      className="py-3.5 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
                    >
                      {isEs ? 'Cancelar' : 'Cancel'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Quick Start Navigation Cards */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-sm border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{isEs ? 'Acceso Rápido al Ecosistema' : 'Quick Access Ecosystem'}</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                VERIDIAN CLOUD v4.2
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('simulator')}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white mt-3">
                  {isEs ? 'Academia & Simulador' : 'Academy & Simulator'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {isEs
                    ? '8 niveles interactivos tipo Amazon: compras, picking, aduanas y robots.'
                    : '8 interactive Amazon-style levels: purchases, picking, customs and robotics.'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white mt-3">
                  {isEs ? 'Panel de Control General' : 'Master Dashboard'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {isEs
                    ? 'Liquidez, envíos activos y distribución portuaria global.'
                    : 'Available liquidity, active shipments, and global port distribution.'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('tracking')}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Compass className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white mt-3">
                  {isEs ? 'Seguimiento Satelital' : 'Satellite Tracking'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {isEs
                    ? 'Monitorea buques, aviones y camiones en tiempo real con telemetría GPS.'
                    : 'Track vessels, flights and trucks in real-time with GPS telemetry.'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('inventory')}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white mt-3">
                  {isEs ? 'Gestión de Almacenes' : 'Warehouse Management'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {isEs
                    ? 'Monitorea niveles de stock, SKU y capacidades de almacenamiento.'
                    : 'Monitor SKU stock levels and storage facility capacities.'}
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 8 Pillars Amazon Business Overview & Benefits (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {isEs ? 'El Ciclo Logístico Integral (8 Fases)' : 'Comprehensive Logistics Cycle (8 Phases)'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              {isEs
                ? 'Con tu usuario de Google activado, tienes acceso a la simulación interactiva completa de una empresa de comercio global estilo Amazon:'
                : 'With your Google account activated, you gain full access to the interactive simulation of an Amazon-style global trade enterprise:'}
            </p>

            <div className="space-y-3">
              {[
                {
                  phase: '1',
                  name: isEs ? 'Planificación y Compras' : 'Procurement & Planning',
                  desc: isEs ? 'Pronóstico de ventas y negociación con proveedores.' : 'Demand forecasting and vendor price negotiation.'
                },
                {
                  phase: '2',
                  name: isEs ? 'Control de Inventarios' : 'Inventory Control',
                  desc: isEs ? 'Cálculo de punto de reorden y clasificación ABC.' : 'Reorder points and ABC merchandise classification.'
                },
                {
                  phase: '3',
                  name: isEs ? 'El Almacén (WMS)' : 'Warehouse (WMS)',
                  desc: isEs ? 'Diseño de estanterías, códigos de barra y montacargas.' : 'Slotting layout, barcode tagging and receiving.'
                },
                {
                  phase: '4',
                  name: isEs ? 'Preparación (Picking/Packing)' : 'Picking & Packing',
                  desc: isEs ? 'Recolección por pasillos y embalaje con burbujas.' : 'Wave picking across aisles and protective boxing.'
                },
                {
                  phase: '5',
                  name: isEs ? 'Transporte & Distribución' : 'Transport & Last-Mile',
                  desc: isEs ? 'Avión, barco, camión y entrega final a domicilio.' : 'Air, sea, highway routes and doorstep final transit.'
                },
                {
                  phase: '6',
                  name: isEs ? 'Logística Internacional' : 'International Customs',
                  desc: isEs ? 'Aduanas, aranceles y contratos Incoterms 2020.' : 'Customs clearance, tariffs, and global Incoterms.'
                },
                {
                  phase: '7',
                  name: isEs ? 'Logística Inversa' : 'Reverse Logistics',
                  desc: isEs ? 'Gestión de devoluciones, reparación y reciclaje.' : 'Customer returns processing and refurbishing triage.'
                },
                {
                  phase: '8',
                  name: isEs ? 'Tecnología & Robótica' : 'Robotics & GPS Telemetry',
                  desc: isEs ? 'AGVs autónomos, rastreo satelital y automatización.' : 'Autonomous AGVs, IoT live sensors and automation.'
                }
              ].map((item) => (
                <div
                  key={item.phase}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.phase}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>{isEs ? 'Simulación en Tiempo Real' : 'Real-time Simulation'}</span>
              </div>
              <button
                onClick={() => onNavigate('simulator')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
              >
                <span>{isEs ? 'Abrir Simulador' : 'Open Simulator'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
