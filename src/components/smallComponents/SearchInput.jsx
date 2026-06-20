import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Combinar categorías existentes con los items específicos solicitados por el usuario
  const searchItems = useMemo(() => {
    const items = [
      { name: 'Plantillas Dashboard', type: 'Page', link: '/categories/dashboard-templates' },
      { name: 'Plantillas Augth', type: 'Page', link: '/categories/auth-templates' }, // Assuming typofix or as requested
      { name: 'Componentes de UI/UX', type: 'Page', link: '/categories/ui-kits' },
      { name: 'Libros de programación', type: 'Page', link: '/books' },
      { name: 'Guías de estudio', type: 'Page', link: '/guides' },
      { name: 'Controladores', type: 'Page', link: '/controllers' },
      { name: 'Nuevos Lanzamientos', type: 'Page', link: '/nuevos-lanzamientos' },
    ];

    // Añadir categorías del sistema
    categories.forEach((cat) => {
      items.push({
        name: cat.name,
        type: 'General Category',
        link: `/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
      });
      cat.subcategories?.forEach((sub) => {
        items.push({
          name: sub.name,
          type: 'Subcategory', // cat.name
          link: `/search?q=${encodeURIComponent(sub.name)}`,
        });
      });
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    if (!query) return [];
    return searchItems
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8); // Limit results
  }, [query, searchItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
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
                      navigate(item.link);
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
