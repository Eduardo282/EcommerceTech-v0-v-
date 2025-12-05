import { useEffect, useState } from "react";
import { getTrustBannerConfig } from "../services/strapi";
import { features } from "../data/trustBanner";

export function TrustBanner() {
  const [trustBannerConfig, setTrustBannerConfig] = useState(null);

  useEffect(() => {
    getTrustBannerConfig().then(setTrustBannerConfig);
  }, []);

  const getColor = (key, fallback) => trustBannerConfig?.[key] || fallback;

  const featuresTrust = trustBannerConfig?.features || features;

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
            linear-gradient(to right, #F9B61D20 1px, transparent 1px),
            linear-gradient(to bottom, #F9B61D20 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 list-none">
          {featuresTrust.map((feature, index) => (
            <li key={index} className="text-center group hover:cursor-pointer">
              <div
                className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}>
                <feature.icon className="h-7 w-7"/>
              </div>
              <h3
                className="text-sm mb-1 font-display"
                style={{
                  color: getColor("titleConfianzaColor", "#fef3c7"),
                }}>
                {feature.title}
              </h3>
              <p className="text-xs" 
              style={{ color: getColor("descripcionConfianzaColor", "#fde68a") }}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
