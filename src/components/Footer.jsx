import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t-2 border-cyan-500/40"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13, 27, 58, 0.95) 0%, rgba(10, 20, 45, 0.98) 100%)",
        boxShadow: "0 -2px 30px rgba(14, 165, 233, 0.2)",
      }}>
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent Horizontal Lines */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(14, 165, 233, 0.3) 100px,
              rgba(14, 165, 233, 0.3) 101px
            )
          `,
        }}
      />

      {/* Animated Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div
                className="p-2.5 rounded-xl shadow-lg transition-all duration-300 border-2 border-cyan-400/60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%)",
                  boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                }}>
                <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 2L4 8V14C4 21.3 9.1 28.1 16 30C22.9 28.1 28 21.3 28 14V8L16 2Z"
                    fill="white"
                    fillOpacity="0.95"
                  />
                  <path
                    d="M16 8L10 11V14C10 17.9 12.7 21.6 16 23C19.3 21.6 22 17.9 22 14V11L16 8Z"
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="10"
                      y1="8"
                      x2="22"
                      y2="23">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl text-cyan-100"
                  style={{
                    textShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
                  }}>
                  TechMarket
                </h3>
                <p
                  className="text-sm text-cyan-300"
                  style={{
                    textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
                  }}>
                  Premium Digital Assets
                </p>
              </div>
            </div>
            <p className="text-cyan-200/70 mb-6 max-w-md">
              Your one-stop marketplace for premium dashboard templates,
              automation tools, and digital products.{" "}
              <span className="text-cyan-300">
                Trusted by over 50,000 developers worldwide.
              </span>
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-cyan-300/70 hover:text-cyan-300 transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@techmarket.com</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300/70 hover:text-cyan-300 transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300/70 hover:text-cyan-300 transition-colors">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-cyan-500/40 backdrop-blur-sm group"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(14, 165, 233, 0.2)";
                }}>
                <Facebook className="h-5 w-5 text-cyan-300/70 group-hover:text-cyan-300" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-cyan-500/40 backdrop-blur-sm group"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(14, 165, 233, 0.2)";
                }}>
                <Twitter className="h-5 w-5 text-cyan-300/70 group-hover:text-cyan-300" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-cyan-500/40 backdrop-blur-sm group"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(14, 165, 233, 0.2)";
                }}>
                <Instagram className="h-5 w-5 text-cyan-300/70 group-hover:text-cyan-300" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-cyan-500/40 backdrop-blur-sm group"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(14, 165, 233, 0.2)";
                }}>
                <Github className="h-5 w-5 text-cyan-300/70 group-hover:text-cyan-300" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-cyan-500/40 backdrop-blur-sm group"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(14, 165, 233, 0.2)";
                }}>
                <Linkedin className="h-5 w-5 text-cyan-300/70 group-hover:text-cyan-300" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="mb-4 text-cyan-100 flex items-center gap-2"
              style={{
                textShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
              }}>
              <Sparkles
                className="h-4 w-4 text-cyan-400"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(14, 165, 233, 0.6))",
                }}
              />
              Categories
            </h4>
            <ul className="space-y-2 text-cyan-200/70">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Dashboard Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Admin Panels
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  SaaS Kits
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Automation Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  CV Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  UI Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="mb-4 text-cyan-100"
              style={{
                textShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
              }}>
              Support
            </h4>
            <ul className="space-y-2 text-cyan-200/70">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-4 text-cyan-100"
              style={{
                textShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
              }}>
              Company
            </h4>
            <ul className="space-y-2 text-cyan-200/70">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Press Kit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block">
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 mb-12 border-2 border-cyan-500/40 backdrop-blur-xl"
          style={{
            background: "rgba(13, 27, 58, 0.6)",
            boxShadow:
              "0 0 30px rgba(14, 165, 233, 0.2), inset 0 0 20px rgba(14, 165, 233, 0.05)",
          }}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                className="text-2xl mb-2 text-cyan-100"
                style={{
                  textShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                }}>
                Stay Updated
              </h3>
              <p className="text-cyan-200/70">
                Subscribe to our newsletter for the latest products and
                exclusive deals.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-cyan-500/40 text-cyan-100 placeholder-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 backdrop-blur-xl"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  boxShadow: "inset 0 0 10px rgba(14, 165, 233, 0.1)",
                }}
              />
              <button
                className="text-white px-6 py-3 rounded-xl transition-all hover:scale-105 border-2 border-cyan-400/60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14, 165, 233, 0.6) 0%, rgba(59, 130, 246, 0.6) 100%)",
                  boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                  textShadow: "0 0 10px rgba(14, 165, 233, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(14, 165, 233, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.4)";
                }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t-2 border-cyan-500/30"
          style={{
            boxShadow: "0 -1px 15px rgba(14, 165, 233, 0.1)",
          }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cyan-200/70 text-sm">
              © 2025 TechMarket. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-cyan-200/70">
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Licenses
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
