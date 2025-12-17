import { ChevronDown } from 'lucide-react';

import PropTypes from 'prop-types';

export function CategoriaCard({ category, openDropdown, getColor }) {
  return (
    <>
      {/* CONTENEDOR DE IMAGEN */}
      <div className="relative mx-auto w-40 h-40 mb-6 group-hover:-translate-y-2 transition-transform duration-500">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#F9B61D10] to-[#F9B61D10] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl group-hover:shadow-[#F9B61D10] transition-all duration-500">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={category.image}
            alt="Technology"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
          />
        </div>

        {category.hasDropdown && (
          <div
            className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-[#2c2c30]/80 backdrop-blur-md shadow-lg z-20 transition-all duration-300 ${
              openDropdown === category.name ? 'group-hover:text-[#F9B61D]' : ''
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                openDropdown === category.name ? 'rotate-180' : ''
              }`}
            />
          </div>
        )}
      </div>

      {/* NOMBRE DE LA CATEGORIA */}
      <h3
        className="text-sm transition-colors uppercase tracking-wider"
        style={{
          color: getColor('titleCategoriasColor2', '#fef3c7'),
        }}
      >
        {category.name}
      </h3>
    </>
  );
}

CategoriaCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hasDropdown: PropTypes.bool,
    image: PropTypes.string.isRequired,
  }).isRequired,
  openDropdown: PropTypes.string,
  setOpenDropdown: PropTypes.func,
  getColor: PropTypes.func.isRequired,
};
