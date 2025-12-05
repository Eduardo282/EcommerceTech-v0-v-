import { Shield, Download, Users, Award, Zap, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getTrustBannerConfig } from "../services/strapi";

export function TrustBanner() {
  const [trustBannerConfig, setTrustBannerConfig] = useState(null);

  useEffect(() => {
    getTrustBannerConfig().then(setTrustBannerConfig);
  }, []);

  const getColor = (key, fallback) => trustBannerConfig?.[key] || fallback;

  const features = [
    {
      icon: Shield,
      title: "Pagos Seguros",
      description: "Protección total",
    },
    {
      icon: Download,
      title: "Acceso Instantáneo",
      description: "Descarga inmediata",
    },
    {
      icon: Users,
      title: "50k+ Clientes Satisfechos",
      description: "Confianza comprobada",
    },
    {
      icon: Award,
      title: "Alta Calidad",
      description: "Productos seleccionados a mano",
    },
    {
      icon: Zap,
      title: "Actualizaciones Rápidas",
      description: "Mejoras regulares",
    },
    {
      icon: RefreshCw,
      title: "Garantía de Devolución",
      description: "Garantía de 30 días",
    },
  ];

  return (
    <section
      className="py-12 relative z-0 overflow-hidden"
      style={{
        backgroundColor: "black",
      }}>
      {/* Soft grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234,179,8,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234,179,8,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 list-none">
          {features.map((feature, index) => (
            <li key={index} className="text-center group hover:cursor-pointer">
              <div
                className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}>
                <feature.icon
                  className="h-7 w-7 text-[#foe4b8]"
                  style={{
                    filter: "drop-shadow(0 0 5px #foe4b8)",
                  }}
                />
              </div>
              <h3
                className="text-sm mb-1 text-amber-100 font-display"
                style={{
                  textShadow: "0 0 10px rgba(234,179,8,0.35)",
                  color: getColor("titleConfianzaColor", "#fef3c7"),
                }}>
                {feature.title}
              </h3>
              <p className="text-xs text-amber-200/60" style={{ color: getColor("descripcionConfianzaColor", "#fde68a") }}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
