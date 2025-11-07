import { Shield, Download, Users, Award, Zap, RefreshCw } from "lucide-react";

export function TrustBanner() {
  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "SSL encrypted checkout",
    },
    {
      icon: Download,
      title: "Instant Access",
      description: "Download immediately",
    },
    {
      icon: Users,
      title: "50k+ Customers",
      description: "Trusted worldwide",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Hand-picked products",
    },
    {
      icon: Zap,
      title: "Fast Updates",
      description: "Regular improvements",
    },
    {
      icon: RefreshCw,
      title: "Money Back",
      description: "30-day guarantee",
    },
  ];

  return (
    <section
      className="py-12 relative z-0 border-y-2"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10, 20, 40, 0.95) 0%, rgba(15, 25, 45, 0.95) 100%)",
        borderTopColor: "rgba(14, 165, 233, 0.3)",
        borderBottomColor: "rgba(14, 165, 233, 0.3)",
      }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 border-2 transition-all duration-300"
                style={{
                  background: "rgba(15, 30, 55, 0.8)",
                  borderColor: "rgba(14, 165, 233, 0.5)",
                  boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.2)";
                  e.currentTarget.style.transform = "scale(1)";
                }}>
                <feature.icon
                  className="h-7 w-7 text-cyan-400"
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(14, 165, 233, 0.6))",
                  }}
                />
              </div>
              <h3
                className="text-sm mb-1 text-cyan-100"
                style={{
                  textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
                }}>
                {feature.title}
              </h3>
              <p className="text-xs text-cyan-200/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
