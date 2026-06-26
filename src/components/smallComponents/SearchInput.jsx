import { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { categories } from '../../data/categories';
import { buildSearchTarget, filterCatalogItems } from '../../lib/catalogSearch';

export function SearchInput({ catalogItems = [] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [staticCatalogItems, setStaticCatalogItems] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const loadStaticCatalogItems = useCallback(async () => {
    if (staticCatalogItems.length > 0) return staticCatalogItems;

    const module = await import('../../lib/staticCatalogSearch');
    setStaticCatalogItems(module.STATIC_CATALOG_SEARCH_ITEMS);
    return module.STATIC_CATALOG_SEARCH_ITEMS;
  }, [staticCatalogItems]);

  useEffect(() => {
    if (!isOpen && !query.trim()) return;
    loadStaticCatalogItems();
  }, [isOpen, loadStaticCatalogItems, query]);

  // Combine catalog products with navigation shortcuts.
  const navigationItems = useMemo(() => {
    const items = [
      { name: 'Plantillas Dashboard', type: 'Página', link: '/plantillas-dashboard' },
      { name: 'Plantillas Auth', type: 'Página', link: '/plantillas-auth' },
      { name: 'Componentes de UI/UX', type: 'Página', link: '/componentes-ui-ux' },
      { name: 'Libros de programación', type: 'Página', link: '/libros-programacion' },
      { name: 'Guías de estudio', type: 'Página', link: '/guias-estudio' },
      { name: 'Controladores', type: 'Página', link: '/controladores' },
      { name: 'Nuevos Lanzamientos', type: 'Page', link: '/nuevos-lanzamientos' },
    ];

    // Añadir categorías del sistema
    categories.forEach((cat) => {
      items.push({
        name: cat.name,
        type: 'Categoría',
        link: `/nuevos-lanzamientos?q=${encodeURIComponent(cat.name)}#catalog-results`,
      });
      cat.subcategories?.forEach((sub) => {
        items.push({
          name: sub.name,
          type: 'Subcategoría',
          link: `/nuevos-lanzamientos?q=${encodeURIComponent(sub.name)}#catalog-results`,
        });
      });
    });

    return items;
  }, []);

  const searchItems = useMemo(
    () => [...catalogItems, ...staticCatalogItems, ...navigationItems],
    [catalogItems, navigationItems, staticCatalogItems]
  );

  const filteredResults = useMemo(() => {
    if (!query) return [];
    return filterCatalogItems(searchItems, query).slice(0, 8);
  }, [query, searchItems]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const loadedStaticItems = await loadStaticCatalogItems();
    const availableItems = [...catalogItems, ...loadedStaticItems, ...navigationItems];
    const [firstMatch] = filterCatalogItems(availableItems, trimmedQuery);
    if (firstMatch?.path) {
      navigate(buildSearchTarget(firstMatch, trimmedQuery));
    } else if (firstMatch?.link) {
      navigate(firstMatch.link);
    } else {
      navigate(`/nuevos-lanzamientos?q=${encodeURIComponent(trimmedQuery)}#catalog-results`);
    }
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);

  return (
    <div className="flex-1 max-w-2xl" ref={containerRef}>
      <form role="search" className="relative group" onSubmit={handleSearch}>
        <label htmlFor="header-search" className="sr-only">
          Search products
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E4D9AF] group-focus-within:text-[#E4D9AF] transition-colors z-20"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="header-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
          placeholder="Busca dashboards, plantillas, controladores..."
          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none text-[#E4D9AF] placeholder-[#F9B61D70] transition-all relative z-10"
          style={{
            background: 'black',
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            // Solo si no está en foco para no sobrescribir
            if (document.activeElement !== e.currentTarget) {
              // e.currentTarget.style.boxShadow = ...
            }
          }}
          // Se maneja el estilo con css classes o inline con cuidado
        />

        {/* Glow effect container */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #2C2C3050 0%, #2C2C3050 50%, #2C2C3050 100%)',
            boxShadow: '0 0 20px #2C2C30, inset 0 0 15px #2C2C30',
          }}
        ></div>

        {/* Dropdown Results */}
        {isOpen && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#111115] border border-[#2c2c30] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            <ul>
              {filteredResults.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path ? buildSearchTarget(item, query.trim()) : item.link);
                      setQuery('');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[#2c2c30] flex items-center gap-3 transition-colors group/item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground group-hover/item:text-[#F9B61D]"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <div>
                      <p className="text-[#E4D9AF] text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

SearchInput.propTypes = {
  catalogItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      path: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};
