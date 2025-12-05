

export function CategoriaSubCategorias({ category }) {

return (
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
                              <span className="text-sm text-[#E4D9AF] transition-colors">
                                {sub.name}
                              </span>
                              {sub.count && (
                                <span className="text-xs px-2 py-1 rounded-full text-[#F9B61D] ">
                                  {sub.count}
                                </span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>  
)   
}