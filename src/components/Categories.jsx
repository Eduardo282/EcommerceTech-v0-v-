import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { getCategoriesConfig } from '../services/strapi';
import { categories } from '../data/categories';
import { EtiquetaCategoria } from './smallComponents/EtiquetaCategoria';
import { CategoriaCard } from './smallComponents/CategoriaCard';
import { CategoriaSubCategorias } from './smallComponents/CategoriaSubCategorias';

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
          backgroundColor: getColor('fondoCategoriasColor', 'black'),
        }}
        className="absolute inset-0"
      />

      {/* Grid Pattern - Horizontal and Vertical Lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F9B61D20 1px, transparent 1px),
            linear-gradient(to bottom, #F9B61D20 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
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
              #F9B61D20 120px,
              #F9B61D20 121px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <EtiquetaCategoria />
          <h2 className="text-5xl mb-4 uppercase tracking-wide font-display">
            <span style={{ color: getColor('titleCategoriasColor', '#FFD700') }}>Categorias</span>
          </h2>
          <p
            className="text-lg"
            style={{ color: getColor('descripcionCategoriasColor', '#FFD700') }}
          >
           {categoriesConfig?.descripcionCategorias || 'Cargando...'}
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <article className="group relative">
                  <button
                    className="w-full text-center group cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(openDropdown === category.name ? null : category.name)
                    }
                  >
                    <CategoriaCard
                      category={category}
                      openDropdown={openDropdown}
                      setOpenDropdown={setOpenDropdown}
                      getColor={getColor}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {category.hasDropdown && openDropdown === category.name && (
                    <CategoriaSubCategorias category={category} />
                  )}
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="text-[#E4D9AF] backdrop-blur-sm hover:text-white cursor-pointer"
            style={{
              background: '#2c2c30',
              boxShadow: '0 0 20px #2c2c30',
            }}
          />
          <CarouselNext
            className="text-[#E4D9AF] backdrop-blur-sm hover:text-white cursor-pointer"
            style={{
              background: '#2c2c30',
              boxShadow: '0 0 20px #2c2c30',
            }}
          />
        </Carousel>
      </div>
    </section>
  );
}
