import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(13, 27, 58, 0.95) 0%, rgba(10, 20, 45, 0.98) 100%)",
      }}>
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal Accent Lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 80px,
              rgba(14, 165, 233, 0.4) 80px,
              rgba(14, 165, 233, 0.4) 81px
            )
          `,
        }}
      />

      {/* Animated Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border-2 border-cyan-400/40"
            style={{
              background: "rgba(14, 165, 233, 0.1)",
              boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)",
            }}>
            <Mail
              className="h-4 w-4 text-cyan-300"
              style={{
                filter: "drop-shadow(0 0 5px rgba(14, 165, 233, 0.6))",
              }}
            />
            <span className="text-sm text-cyan-200">Join our newsletter</span>
          </div>

          <h2
            className="text-5xl mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 40px rgba(14, 165, 233, 0.3)",
            }}>
            Get Exclusive Deals & Updates
          </h2>

          <p className="text-xl text-cyan-100/70 mb-8">
            Subscribe to get special offers, free resources, and
            once-in-a-lifetime deals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-xl text-cyan-100 placeholder:text-cyan-300/40"
              style={{
                background: "rgba(13, 27, 58, 0.6)",
                boxShadow: "inset 0 0 15px rgba(14, 165, 233, 0.1)",
              }}
            />
            <Button
              className="text-white px-8 py-4 rounded-xl shadow-lg border-2 border-cyan-400/60"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.7) 100%)",
                boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)",
                textShadow: "0 0 10px rgba(14, 165, 233, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 35px rgba(14, 165, 233, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(14, 165, 233, 0.4)";
              }}>
              Subscribe Now
            </Button>
          </div>

          <p className="text-sm text-cyan-200/60 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
