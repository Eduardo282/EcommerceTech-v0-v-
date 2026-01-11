import { useState } from 'react';
const Lock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Mail = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const ArrowRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const ShieldCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const Fingerprint = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6" />
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-2.6 4.58l-1.6-2.1" />
    <path d="M16.97 6.35A6 6 0 0 1 12 2c-4.48 0-8 4.28-8 8v2c0 .7.1 2.44.21 3.2" />
  </svg>
);
const Eye = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOff = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);
const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const Globe = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// plantillas de autenticacion
const AUTH_TEMPLATES = [
  {
    id: 'login-minimal',
    name: 'Minimalist Login',
    type: 'Login',
    description: 'Clean, centered login form with social providers. Perfect for SaaS.',
    features: ['Social Auth', 'Remember Me', 'Validation'],
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'signup-split',
    name: 'Split Register',
    type: 'Register',
    description: 'Modern split-screen layout with testimonials or branding on the side.',
    features: ['Testimonial Sidebar', 'Strength Meter', 'Multi-step'],
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'reset-glass',
    name: 'Glassmorphism Reset',
    type: 'Recovery',
    description: 'Password reset flow with premium frosted glass aesthetics.',
    features: ['Glass Effect', 'OTP Input', 'Timer'],
    gradient: 'from-purple-600 to-pink-700',
  },
  {
    id: '2fa-mobile',
    name: 'Mobile 2FA',
    type: 'Security',
    description: 'Optimized mobile-first verification screen for 2FA codes.',
    features: ['Mobile First', 'Numpad Logic', 'Auto-focus'],
    gradient: 'from-orange-500 to-red-600',
  },
];

export function PlantillasAuthPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(AUTH_TEMPLATES[0]);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen bg-[#050505] text-white overflow-hidden flex flex-col md:flex-row font-sans">
      {/* Lado izquierdo - plantillas de autenticacion */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-[#0A0A0A] border-r border-white/5 flex flex-col h-full z-20">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="text-amber-400 h-5 w-5" />
            <span className="font-bold text-lg tracking-tight">AuthLib</span>
          </div>
          <p className="text-xs text-gray-500">Plantillas de autenticacion</p>
        </div>

        {/* lista desplegable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {AUTH_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`
                w-full text-left p-4 rounded-xl border transition-all duration-300 group
                ${
                  selectedTemplate.id === template.id
                    ? 'bg-white/10 border-white/10 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-white/5 text-gray-400 hover:text-white'
                }
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">{template.name}</span>
                {selectedTemplate.id === template.id && (
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
                {template.type}
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {template.description}
              </p>
            </button>
          ))}
        </div>

        {/* informacion del footer*/}
        <div className="p-4 border-t border-white/5 bg-[#080808]">
          <button className="w-full bg-amber-500 text-black font-bold hover:bg-amber-400 py-2 rounded-md">
            Descargar fuente
          </button>
          <div className="mt-4 flex justify-between text-[10px] text-gray-600 uppercase font-mono">
            <span>React 18</span>
            <span>Tailwind</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>

      {/* Area de visualizacion */}
      <div className="flex-1 relative bg-[#050505] flex items-center justify-center p-8">
        {/* Gradiente de fondo basado en la plantilla seleccionada */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${selectedTemplate.gradient} opacity-20 blur-[120px] transition-all duration-1000`}
        />
        {/* Patrones de fondo */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

        {/* Contenedor de previsualizacion - "Dispositivo" Look */}
        <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
          {/* Barra superior del mockup */}
          <div className="bg-[#111] rounded-t-2xl p-3 flex items-center gap-2 border border-white/10 border-b-0">
            <div className="flex gap-1.5 ml-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 text-center text-[10px] items-center justify-center flex gap-1 text-gray-500 font-mono bg-black py-1 rounded-md mx-4">
              <Lock size={8} /> secure-auth.com
            </div>
          </div>

          {/* Previsualizacion del formulario interactivo */}
          <div className="bg-[#0A0A0A] rounded-b-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 to-orange-600" />

            <div className="mb-8 text-center">
              <div className="h-12 w-12 bg-white/5 rounded-xl mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Bienvenido</h2>
              <p className="text-gray-400 text-sm">Por favor, ingresa tus datos para iniciar sesión.</p>
            </div>

            <div className="space-y-4">
              {/* Inputs */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 ml-1">Correo Electronico</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 ml-1">Contraseña</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-gray-600"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                  <input
                    type="checkbox"
                    className="rounded bg-[#111] border-white/10 text-amber-500 focus:ring-0"
                  />
                  Recordarme
                </label>
                <button className="text-amber-500 hover:text-amber-400 font-medium">
                  Olvidaste tu contraseña?
                </button>
              </div>

              <button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-5 rounded-xl shadow-[0_4px_20px_-5px_rgba(255,255,255,0.3)] transition-transform active:scale-[0.98] inline-flex items-center justify-center">
                Iniciar sesión <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0A0A0A] px-2 text-gray-500">O continuar con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] text-sm text-gray-300 transition-colors">
                  <Github size={16} /> GitHub
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] text-sm text-gray-300 transition-colors">
                  <Globe size={16} /> Google
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500">
              <Fingerprint className="inline-block h-4 w-4 mr-1 text-gray-600" />
              Seguro por AuthLib 256-bit
            </div>
          </div>
        </div>

        {/* Etiquetas de caracteristicas flotando */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {selectedTemplate.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-gray-400"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
