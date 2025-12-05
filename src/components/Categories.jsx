import { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./fallImage/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getCategoriesConfig } from "../services/strapi";
import { categories } from "../data/categories";

export function Categories() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categoriesConfig, setCategoriesConfig] = useState(null);

  useEffect(() => {
    getCategoriesConfig().then(setCategoriesConfig);
  }, []);

  const getColor = (key, fallback) => categoriesConfig?.[key] || fallback;

  return (
    <section id="categories-section" className="py-20 relative overflow-visible">
      {/* Onyx Background */}
      <div
        style={{
          backgroundColor: getColor("fondoCategoriasColor", "black"),
        }}
        className="absolute inset-0"
      />

      {/* Grid Pattern - Horizontal and Vertical Lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.15) 1px, transparent 1px)
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
              rgba(234, 179, 8, 0.28) 120px,
              rgba(234, 179, 8, 0.28) 121px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 relative">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full backdrop-blur-sm" />
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse relative z-10" />
            <span className="text-sm text-amber-300 relative z-10 font-display">
              Explora Categorías
            </span>
          </div>
          <h2
            className="text-5xl mb-4 text-white uppercase tracking-wide font-display"
            style={{
              textShadow: "0 0 30px rgba(234, 179, 8, 0.35)",
            }}>
              <span style={{ color: getColor("titleCategoriasColor", "#FFD700") }}>
                Categorias
            </span>
          </h2>
          <p className="text-lg" style={{ color: getColor("descripcionCategoriasColor", "#FFD700") }}>
            Explora nuestra colección de productos digitales
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
                    className="w-full text-center group cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === category.name ? null : category.name
                      )
                    }>
                    {/* Professional Tech Image Container */}
                    <div className="relative mx-auto w-40 h-40 mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                      <div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-amber-500/20 transition-all duration-500 rounded-full">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img
                          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop"
                          alt="Technology"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        />
                      </div>

                      {category.hasDropdown && (
                        <div
                          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-[#111115]/80 backdrop-blur-md shadow-lg z-20 transition-all duration-300 ${
                            openDropdown === category.name
                              ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                              : "text-gray-400 group-hover:text-amber-200"
                          }`}>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              openDropdown === category.name ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Category Name */}
                    <h3
                      className="text-sm text-amber-100 group-hover:text-amber-300 transition-colors uppercase tracking-wider"
                      style={{
                        textShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                        color: getColor("titleCategoriasColor2", "#fef3c7"),
                      }}>
                      {category.name}
                    </h3>
                  </button>

                  {/* Dropdown Menu */}
                  {category.hasDropdown && openDropdown === category.name && (
                    <nav
                      aria-label={`${category.name} subcategories`}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 z-50 backdrop-blur-xl animate-in slide-in-from-top-2 shadow-2xl rounded-3xl"
                      style={{
                        background: "#111115",
                      }}>
                      <ul className="p-4 space-y-1 overflow-visible">
                        {category.subcategories?.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href="#"
                              className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors group/item border border-[#2c2c30] hover:bg-[#2c2c30] hover:border-[#2c2c30]">
                              <span className="text-sm text-amber-100 transition-colors">
                                {sub.name}
                              </span>
                              {sub.count && (
                                <span className="text-xs px-2 py-1 rounded-full text-amber-300 ">
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
            className="text-[#f0e4b8] backdrop-blur-sm hover:text-white cursor-pointer"
            style={{
              background: "#2c2c30",
              boxShadow: "0 0 20px #2c2c30",
            }}
          />
          <CarouselNext
            className="text-[#f0e4b8] backdrop-blur-sm hover:text-white cursor-pointer"
            style={{
              background: "#2c2c30",
              boxShadow: "0 0 20px #2c2c30",
            }}
          />
        </Carousel>
      </div>
    </section>
  );
}
