import { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Eye,
  EyeOff,
  Github,
  Globe,
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock Templates Data
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
      {/* LEFT SIDEBAR - Template Navigation */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-[#0A0A0A] border-r border-white/5 flex flex-col h-full z-20">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="text-amber-400 h-5 w-5" />
            <span className="font-bold text-lg tracking-tight">AuthLib</span>
          </div>
          <p className="text-xs text-gray-500">Secure Authentication Patterns</p>
        </div>

        {/* Scrollable List */}
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

        {/* Footer Info */}
        <div className="p-4 border-t border-white/5 bg-[#080808]">
          <Button className="w-full bg-amber-500 text-black font-bold hover:bg-amber-400">
            Download Source
          </Button>
          <div className="mt-4 flex justify-between text-[10px] text-gray-600 uppercase font-mono">
            <span>React 18</span>
            <span>Tailwind</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>

      {/* RIGHT PREVIEW AREA */}
      <div className="flex-1 relative bg-[#050505] flex items-center justify-center p-8">
        {/* Background Ambient Gradient based on selection */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${selectedTemplate.gradient} opacity-20 blur-[120px] transition-all duration-1000`}
        />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

        {/* Preview Container - "Device" Look */}
        <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
          {/* Mockup Top Bar */}
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

          {/* Interactive Form Preview */}
          <div className="bg-[#0A0A0A] rounded-b-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 to-orange-600" />

            <div className="mb-8 text-center">
              <div className="h-12 w-12 bg-white/5 rounded-xl mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
              <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
            </div>

            <div className="space-y-4">
              {/* Inputs */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
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
                <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
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
                  Remember me
                </label>
                <button className="text-amber-500 hover:text-amber-400 font-medium">
                  Forgot password?
                </button>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-5 rounded-xl shadow-[0_4px_20px_-5px_rgba(255,255,255,0.3)] transition-transform active:scale-[0.98]">
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0A0A0A] px-2 text-gray-500">Or continue with</span>
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
              Secured by AuthLib 256-bit
            </div>
          </div>
        </div>

        {/* Feature Tags Hovering */}
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
