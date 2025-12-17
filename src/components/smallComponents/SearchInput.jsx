import { Search } from 'lucide-react';

export function SearchInput() {
  {
    /* Barra de búsqueda */
  }
  return (
    <>
      <div className="flex-1 max-w-2xl">
        <form role="search" className="relative group" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E4D9AF] group-focus-within:text-[#E4D9AF] transition-colors" />
          <input
            id="header-search"
            type="text"
            placeholder="Busca dashboards, plantillas, controladores, herramientas de automatización..."
            className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none text-[#E4D9AF] placeholder-[#F9B61D70] transition-all"
            style={{
              background: 'black',
              boxShadow: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px #2C2C30, inset 0 0 15px #2C2C30';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #2C2C3050 0%, #2C2C3050 50%, #2C2C3050 100%)',
            }}
          ></div>
        </form>
      </div>
    </>
  );
}
