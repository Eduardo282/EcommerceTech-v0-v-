import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { downloadBrowserFile } from './catalog/catalogUtils';
import { filterCatalogItems, getSearchQueryFromParams } from '../lib/catalogSearch';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import {
  Lock,
  AUTH_TEMPLATES,
  PreviewMinimal,
  PreviewSplit,
  PreviewGlass,
  Preview2FA,
  PreviewMagicLink,
  PreviewNeon,
  PreviewCorporate,
  PreviewFullBg
} from './PlantillasAuthPage.data';

export function PlantillasAuthPage() {
  const outletContext = useOutletContext() || {};
  const { onVentasClick } = outletContext;
  const [searchParams] = useSearchParams();
  const urlSearchQuery = getSearchQueryFromParams(searchParams);
  const highlightedProductId = searchParams.get('highlight');
  const [selectedTemplate, setSelectedTemplate] = useState(AUTH_TEMPLATES[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const visibleTemplates = useMemo(
    () => filterCatalogItems(AUTH_TEMPLATES, urlSearchQuery),
    [urlSearchQuery]
  );

  useEffect(() => {
    if (!urlSearchQuery) return;

    const matchedTemplate =
      visibleTemplates.find((template) => `auth-${template.id}` === highlightedProductId) ||
      visibleTemplates[0];

    if (matchedTemplate) {
      setSelectedTemplate(matchedTemplate);
      setShowPassword(false);
    }
  }, [highlightedProductId, urlSearchQuery, visibleTemplates]);

  useSearchHighlight(highlightedProductId, visibleTemplates.length);

  async function handleDownload() {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadBrowserFile('/downloads/authlib-react-source.zip', 'authlib-react-source.zip');

      toast.success('Descarga iniciada', {
        description: `El paquete incluye la plantilla "${selectedTemplate.name}" y la colección AuthLib.`,
      });
    } catch {
      toast.error('No se pudo descargar el archivo', {
        description: 'Comprueba que el servidor local esté activo e inténtalo nuevamente.',
      });
    } finally {
      setIsDownloading(false);
    }
  }

  const accentColors = {
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    fuchsia: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
    slate: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  function renderPreview() {
    switch (selectedTemplate.id) {
      case 'login-minimal':
        return <PreviewMinimal showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 'signup-split':
        return <PreviewSplit showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 'reset-glass':
        return <PreviewGlass />;
      case '2fa-mobile':
        return <Preview2FA />;
      case 'magic-link':
        return <PreviewMagicLink />;
      case 'dark-neon':
        return <PreviewNeon showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 'corporate':
        return <PreviewCorporate showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 'fullbg-welcome':
        return <PreviewFullBg showPassword={showPassword} setShowPassword={setShowPassword} />;
      default:
        return null;
    }
  }

  return (
    <div className="h-screen bg-[#050505] text-white overflow-hidden flex flex-col md:flex-row font-sans">
      {/* Lado izquierdo - plantillas de autenticacion */}
      <div className="w-full md:w-1/3 lg:w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col h-full z-20 flex-shrink-0">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="text-amber-400 h-5 w-5" />
            <span className="font-bold text-lg tracking-tight">AuthLib</span>
          </div>
          <p className="text-xs text-gray-500">
            {AUTH_TEMPLATES.length} plantillas de autenticación
          </p>
        </div>

        {/* lista */}
        <div id="catalog-results" className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleTemplates.map((template) => {
            const accent = accentColors[template.accent] || accentColors.amber;
            const isSelected = selectedTemplate.id === template.id;
            return (
              <button
                key={template.id}
                data-search-id={`auth-${template.id}`}
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowPassword(false);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300
                  ${isSelected ? 'bg-white/10 border-white/10 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5 text-gray-400 hover:text-white'}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm">{template.name}</span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0 mt-1" />
                  )}
                </div>
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${accent}`}
                >
                  {template.type}
                </span>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#080808] space-y-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-amber-500 text-black font-bold hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60 py-2 rounded-md text-sm transition-colors"
          >
            {isDownloading ? 'Preparando descarga…' : 'Descargar fuente'}
          </button>
          {onVentasClick && (
            <button
              onClick={onVentasClick}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 py-2 rounded-md text-xs transition-colors"
            >
              ✦ Vende tus plantillas
            </button>
          )}
          <div className="flex justify-between text-[10px] text-gray-600 uppercase font-mono pt-1">
            <span>React 18</span>
            <span>Tailwind</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>

      {/* Area de visualizacion */}
      <div className="flex-1 relative bg-[#050505] flex items-center justify-center p-6 overflow-y-auto">
        <div
          className={`absolute inset-0 bg-linear-to-br ${selectedTemplate.gradient} opacity-20 blur-[120px] transition-all duration-1000 pointer-events-none`}
        />

        <div className="relative z-10 w-full max-w-md">
          {/* Barra superior del mockup */}
          <div className="bg-[#111] rounded-t-2xl p-3 flex items-center gap-2 border border-white/10 border-b-0">
            <div className="flex gap-1.5 ml-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 text-center text-[10px] flex items-center justify-center gap-1 text-gray-500 font-mono bg-black py-1 rounded-md mx-4">
              <Lock className="h-2 w-2 inline" /> secure-auth.app
            </div>
          </div>

          {/* Preview dinámico */}
          <div key={selectedTemplate.id} className="transition-all duration-300">
            {renderPreview()}
          </div>
        </div>

        {/* Feature badges */}
        <div className="absolute bottom-6 right-6 flex gap-2 flex-wrap justify-end max-w-xs">
          {selectedTemplate.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs text-gray-400"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
