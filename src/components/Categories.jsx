import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const categories = [
  {
    name: "Dashboard Templates",
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxNTQ4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Admin Dashboards", count: "850+" },
      { name: "Analytics Dashboards", count: "620+" },
      { name: "E-commerce Dashboards", count: "480+" },
      { name: "CRM Dashboards", count: "340+" },
      { name: "Project Management", count: "290+" },
    ],
  },
  {
    name: "SaaS Kits",
    image:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYxNTMwMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Starter Kits", count: "320+" },
      { name: "Multi-tenant SaaS", count: "180+" },
      { name: "Subscription Models", count: "150+" },
      { name: "API Integrations", count: "210+" },
    ],
  },
  {
    name: "Automation Tools",
    image:
      "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwcm9ib3QlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTYxNjA3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Web Scraping", count: "280+" },
      { name: "Email Automation", count: "420+" },
      { name: "Social Media Bots", count: "350+" },
      { name: "Data Processing", count: "190+" },
      { name: "Workflow Automation", count: "240+" },
    ],
  },
  {
    name: "CV Templates",
    image:
      "https://images.unsplash.com/photo-1587116987928-21e47bd76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN1bWUlMjBkb2N1bWVudCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjE1OTkwODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: false,
  },
  {
    name: "UI Kits",
    image:
      "https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGNvbXBvbmVudHN8ZW58MXx8fHwxNzYxNjA3MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "React Components", count: "680+" },
      { name: "Vue Components", count: "340+" },
      { name: "Angular Components", count: "220+" },
      { name: "Web Components", count: "180+" },
    ],
  },
  {
    name: "Licenses",
    image:
      "https://images.unsplash.com/photo-1477039181047-efb4357d01bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGxvY2slMjBkaWdpdGFsfGVufDF8fHx8MTc2MTYxNjA3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: false,
  },
  {
    name: "Website Templates",
    image:
      "https://images.unsplash.com/photo-1591122947157-26bad3a117d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwdGVtcGxhdGV8ZW58MXx8fHwxNzYxNTc0MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Business Sites", count: "450+" },
      { name: "Creative Portfolios", count: "320+" },
      { name: "Blog Themes", count: "280+" },
      { name: "Agency Templates", count: "190+" },
    ],
  },
  {
    name: "Developer Tools",
    image:
      "https://images.unsplash.com/photo-1749068372532-074d6c1c088f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYxNTYxNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Code Generators", count: "180+" },
      { name: "API Tools", count: "240+" },
      { name: "Testing Frameworks", count: "160+" },
      { name: "Build Tools", count: "120+" },
    ],
  },
  {
    name: "Mobile Apps",
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NjE1Nzg3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "React Native", count: "220+" },
      { name: "Flutter Templates", count: "180+" },
      { name: "iOS Apps", count: "150+" },
      { name: "Android Apps", count: "170+" },
    ],
  },
  {
    name: "Landing Pages",
    image:
      "https://images.unsplash.com/photo-1628878015415-170edcdd42b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2V8ZW58MXx8fHwxNzYxNTcyNDQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Product Pages", count: "380+" },
      { name: "Marketing Pages", count: "420+" },
      { name: "Coming Soon", count: "150+" },
      { name: "Portfolio Pages", count: "240+" },
    ],
  },
  {
    name: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjE1MzY3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Shop Templates", count: "290+" },
      { name: "Cart Systems", count: "160+" },
      { name: "Checkout Flows", count: "120+" },
      { name: "Product Catalogs", count: "200+" },
    ],
  },
  {
    name: "CMS Themes",
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JkcHJlc3MlMjBjbXN8ZW58MXx8fHwxNzYxNjE3Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "WordPress Themes", count: "520+" },
      { name: "Shopify Themes", count: "340+" },
      { name: "Webflow Templates", count: "180+" },
      { name: "Drupal Themes", count: "90+" },
    ],
  },
  {
    name: "Email Templates",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBlbWFpbHxlbnwxfHx8fDE3NjE1NzY1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Newsletter", count: "280+" },
      { name: "Transactional", count: "220+" },
      { name: "Marketing", count: "350+" },
      { name: "Notifications", count: "160+" },
    ],
  },
  {
    name: "Plugins & Extensions",
    image:
      "https://images.unsplash.com/photo-1627773755683-dfcf2774596a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVnaW4lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjE2MTc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasDropdown: true,
    subcategories: [
      { name: "Chrome Extensions", count: "260+" },
      { name: "VS Code Plugins", count: "190+" },
      { name: "Figma Plugins", count: "140+" },
      { name: "Browser Tools", count: "210+" },
    ],
  },
];

export function Categories() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <section className="py-20 relative overflow-visible">
      {/* Deep Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b3a] via-[#1a2847] to-[#0d1b3a]" />

      {/* Grid Pattern - Horizontal and Vertical Lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Additional Horizontal Accent Lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 120px,
              rgba(14, 165, 233, 0.3) 120px,
              rgba(14, 165, 233, 0.3) 121px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 relative">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full border border-cyan-500/30 backdrop-blur-sm" />
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse relative z-10" />
            <span className="text-sm text-cyan-300 relative z-10">
              Explore Categories
            </span>
          </div>
          <h2
            className="text-5xl mb-4 text-white uppercase tracking-wide"
            style={{
              textShadow: "0 0 30px rgba(14, 165, 233, 0.4)",
            }}>
            Browse by{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-cyan-100/60 text-lg">
            Explore our curated collection of premium digital products
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <article className="group relative">
                  <button
                    className="w-full text-center group"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === category.name ? null : category.name
                      )
                    }>
                    {/* Neon Circle Container */}
                    <div className="relative mx-auto w-36 h-36 mb-6">
                      {/* Outer Glow Ring */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)",
                          filter: "blur(20px)",
                        }}
                      />

                      {/* Multiple Neon Border Rings */}
                      <div
                        className="absolute inset-0 rounded-full border-4 border-cyan-400/80 group-hover:border-cyan-300 transition-all duration-500"
                        style={{
                          boxShadow: `
                            0 0 20px rgba(14, 165, 233, 0.6),
                            0 0 40px rgba(14, 165, 233, 0.4),
                            0 0 60px rgba(14, 165, 233, 0.2),
                            inset 0 0 20px rgba(14, 165, 233, 0.1)
                          `,
                        }}
                      />

                      {/* Inner Border */}
                      <div className="absolute inset-2 rounded-full border-2 border-cyan-500/40" />

                      {/* Image Container with Blue Tint Overlay */}
                      <div className="absolute inset-3 rounded-full overflow-hidden">
                        <div className="relative w-full h-full">
                          <ImageWithFallback
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Blue Overlay Tint */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-blue-600/50 to-cyan-700/40 mix-blend-multiply" />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Center Glow Point */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{
                          boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.8)",
                        }}
                      />

                      {category.hasDropdown && (
                        <div
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 border-2 rounded-full p-1.5 shadow-lg transition-all duration-300 backdrop-blur-sm ${
                            openDropdown === category.name
                              ? "bg-cyan-500/30 border-cyan-400/80"
                              : "bg-blue-900/40 border-cyan-500/60"
                          }`}
                          style={{
                            boxShadow:
                              openDropdown === category.name
                                ? "0 0 20px rgba(14, 165, 233, 0.6)"
                                : "0 0 10px rgba(14, 165, 233, 0.3)",
                          }}>
                          <ChevronDown
                            className={`h-4 w-4 text-cyan-300 transition-transform duration-300 ${
                              openDropdown === category.name ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Category Name */}
                    <h3
                      className="text-sm text-cyan-100 group-hover:text-cyan-300 transition-colors uppercase tracking-wider"
                      style={{
                        textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
                      }}>
                      {category.name}
                    </h3>
                  </button>

                  {/* Dropdown Menu */}
                  {category.hasDropdown && openDropdown === category.name && (
                    <nav
                      aria-label={`${category.name} subcategories`}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 border-2 border-cyan-500/40 rounded-xl z-50 backdrop-blur-xl animate-in slide-in-from-top-2 shadow-2xl"
                      style={{
                        background: "rgba(13, 27, 58, 0.92)",
                        boxShadow:
                          "0 0 40px rgba(14, 165, 233, 0.35), inset 0 0 25px rgba(14, 165, 233, 0.08)",
                      }}>
                      <ul className="p-4 space-y-1 overflow-visible">
                        {category.subcategories?.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href="#"
                              className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors group/item border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400/40">
                              <span className="text-sm text-cyan-100 group-hover/item:text-cyan-300 transition-colors">
                                {sub.name}
                              </span>
                              {sub.count && (
                                <span className="text-xs bg-cyan-500/20 px-2 py-1 rounded-full text-cyan-300 border border-cyan-500/30">
                                  {sub.count}
                                </span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="border-2 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-sm"
            style={{
              background: "rgba(13, 27, 58, 0.8)",
              boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)",
            }}
          />
          <CarouselNext
            className="border-2 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-sm"
            style={{
              background: "rgba(13, 27, 58, 0.8)",
              boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)",
            }}
          />
        </Carousel>
      </div>
    </section>
  );
}
