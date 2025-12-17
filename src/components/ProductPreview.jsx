import {
  X,
  Star,
  Download,
  ShoppingCart,
  Heart,
  Package,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  Zap as Lightning,
} from 'lucide-react';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ImageWithFallback } from './fallImage/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function ProductPreview({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  allProducts = [],
  onProductClick,
}) {
  console.log('ProductPreview received:', product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [quantity, setQuantity] = useState(1);
  const imageContainerRef = useRef(null);
  const similarScrollRef = useRef(null);
  const [viewersCount] = useState(() => Math.floor(Math.random() * 20) + 5);

  if (!isOpen) return null;

  // Simula multiples imágenes (en la app real, el producto tendría un array de imágenes)
  const images = [product.image, product.image, product.image, product.image, product.image];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const magnifierSize = 160;
  const zoomLevel = 2.5;

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (imageContainerRef.current) {
      setContainerDimensions({
        width: imageContainerRef.current.offsetWidth,
        height: imageContainerRef.current.offsetHeight,
      });
    }
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleBuyNow = () => {
    // Agrega multiple items al carrito basado en la cantidad
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
    // En una app real, esto redirigiría a checkout
  };

  // Obtiene productos similares (misma categoría, excluyendo el producto actual)
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 10);

  const scrollSimilarLeft = () => {
    if (similarScrollRef.current) {
      similarScrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollSimilarRight = () => {
    if (similarScrollRef.current) {
      similarScrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="presentation"
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="relative rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden"
        style={{
          boxShadow: '0 0 20px #2c2c30',
        }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 backdrop-blur-sm p-2 rounded-full transition-all shadow-lg cursor-pointer"
          style={{
            background: '#2c2c30',
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px #2c2c30';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <X className="h-5 w-5 text-[#E4D9AF]" />
        </button>

        <div
          className="grid grid-cols-1 lg:grid-cols-[120px_1fr_400px] gap-0 max-h-[95vh] overflow-y-auto"
          role="document"
        >
          {/* Columna izquierda - miniaturas */}
          <div
            className="hidden lg:flex flex-col gap-3 p-4 border-r-2 overflow-y-auto max-h-[95vh]"
            style={{
              background: '#111115',
              borderRightColor: '#2c2c30',
            }}
          >
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all cursor-pointer ${
                  currentImageIndex === index ? 'shadow-lg' : ''
                }`}
                style={{
                  boxShadow: currentImageIndex === index ? '0 0 20px #fff' : 'none',
                }}
              >
                <ImageWithFallback
                  src={img}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Columna central - imagen principal + información del producto */}
          <div
            className="flex flex-col overflow-y-auto scrollbar-hide max-h-[95vh]"
            style={{
              background: '#111115',
            }}
          >
            <div className="relative flex items-center justify-center p-8">
              {/* Etiqueta de espectadores */}
              <div className="absolute top-6 left-6 z-10">
                <Badge
                  className="text-white px-3 py-1.5 text-xs uppercase tracking-wide shadow-lg outline-none"
                  style={{
                    background: 'linear-gradient(135deg, #111115 0%, #980707 100%)',
                  }}
                >
                  {viewersCount} VECES VISTO LAS ULTIMAS 24 HRS
                </Badge>
              </div>

              {/* Botones de pantalla completa y lista de deseos */}
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button
                  className="p-2.5 rounded-lg transition-all shadow-md cursor-pointer"
                  style={{
                    background: '#111115',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px #898989';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Maximize2 className="h-5 w-5 text-[#E4D9AF]" />
                </button>
                <button
                  className="px-3 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  onClick={() => onToggleWishlist(product.id)}
                  style={{
                    background: '#111115',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px #898989';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span className="text-sm text-[#E4D9AF]">{isInWishlist ? '19' : '18'}</span>
                  <Heart
                    className={`h-5 w-5 transition-all ${
                      isInWishlist ? 'fill-[#980707] text-transparent' : 'text-[#FF6467]'
                    }`}
                  />
                </button>
              </div>

              {/* Imagen con Magnificador */}
              <div
                ref={imageContainerRef}
                className="relative max-w-2xl w-full aspect-square cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                {/* Magnificador */}
                {showMagnifier && (
                  <div
                    className="absolute rounded-full pointer-events-none shadow-2xl overflow-hidden z-50"
                    style={{
                      width: `${magnifierSize}px`,
                      height: `${magnifierSize}px`,
                      left: `${magnifierPosition.x}px`,
                      top: `${magnifierPosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      background: 'transparent',
                      boxShadow: '0 0 30px #fff',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${containerDimensions.width * zoomLevel}px`,
                        height: `${containerDimensions.height * zoomLevel}px`,
                        backgroundImage: `url(${images[currentImageIndex]})`,
                        backgroundSize: `${containerDimensions.width * zoomLevel}px ${
                          containerDimensions.height * zoomLevel
                        }px`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `-${
                          magnifierPosition.x * zoomLevel - magnifierSize / 2
                        }px -${magnifierPosition.y * zoomLevel - magnifierSize / 2}px`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg cursor-pointer"
                style={{
                  background: 'transparent',
                  boxShadow: '0 0 15px #898989',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px #898989';
                }}
              >
                <ChevronLeft className="h-6 w-6 text-[#E4D9AF]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg cursor-pointer"
                style={{
                  background: 'transparent',
                  boxShadow: '0 0 15px #898989',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px #898989';
                }}
              >
                <ChevronRight className="h-6 w-6 text-[#E4D9AF]" />
              </button>
            </div>

            {/* Sección de Información del Producto */}
            <div
              className="px-8 py-6"
              style={{
                background: '#111115',
              }}
            >
              <h3 className="text-lg mb-4 text-[#F9B61D]">Informacion del Producto</h3>

              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border-b-2"
                  style={{
                    borderBottomColor: '#2c2c30',
                  }}
                >
                  <AccordionTrigger className="py-4 hover:no-underline text-[#E4D9AF]">
                    <span className="text-sm">Detalles del Producto</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {product.details && product.details.length > 0 ? (
                      <ul className="space-y-2 text-sm text-white">
                        {product.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#F9B61D]">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#898989] italic">No hay detalles disponibles.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border-b-2"
                  style={{
                    borderBottomColor: '#2c2c30',
                  }}
                >
                  <AccordionTrigger className="py-4 hover:no-underline text-[#E4D9AF]">
                    <span className="text-sm">Especificaciones Técnicas</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {product.specs && product.specs.length > 0 ? (
                      <div className="space-y-3 text-sm">
                        {product.specs.map((spec, index) => (
                          <div key={index} className="grid grid-cols-[140px_1fr] gap-2">
                            <span className="text-[#F9B61D]">{spec.key}:</span>
                            <span className="text-[#E4D9AF]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 text-sm">
                        {/* Fallback para productos legacy sin especificaciones técnicas */}
                        <div className="grid grid-cols-[140px_1fr] gap-2">
                          <span className="text-[#F9B61D]">Categoría:</span>
                          <span className="text-[#E4D9AF]">{product.category}</span>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="py-4 hover:no-underline text-[#E4D9AF]">
                    <span className="text-sm">Qué incluye</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {product.includes && product.includes.length > 0 ? (
                      <ul className="space-y-2 text-sm text-white">
                        {product.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#3D8B95] mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#898989] italic">No se especifica contenido.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Columna derecha - Detalles del Producto */}
          <div
            className="flex flex-col p-8 overflow-y-auto scrollbar-hide max-h-[95vh] border-l-2 border-[#2c2c30]"
            style={{
              background: '#111115',
            }}
          >
            <div className="flex-1">
              <Badge
                className="mb-3 text-white"
                style={{
                  background: '#2c2c30',
                }}
              >
                {product.category}
              </Badge>

              <h2 className="text-2xl mb-3 text-white">{product.name}</h2>

              {/* Calificación */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-[#FACE2F]' : 'text-transparent'
                      }`}
                      style={
                        i < Math.floor(product.rating)
                          ? {
                              filter: 'drop-shadow(0 0 4px #FACE2F)',
                            }
                          : {}
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-[#898989]">
                  {product.rating} ({product.reviews.toLocaleString()} reseñas)
                </span>
              </div>

              {/* Descargas */}
              <div className="flex items-center gap-2 mb-6 text-sm text-[#898989]">
                <Download className="h-4 w-4" />
                <span>{product.sales.toLocaleString()} descargas</span>
              </div>

              {/* Productos Similares */}
              {similarProducts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-[#F9B61D]">Productos Similares</h3>
                  <div className="relative">
                    {/* Botón de flecha izquierda */}
                    <button
                      onClick={scrollSimilarLeft}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer"
                      style={{
                        background: '#111115',
                      }}
                    >
                      <ChevronLeft className="h-6 w-6 text-[#E4D9AF]" />
                    </button>

                    {/* Contenedor de desplazamiento de productos */}
                    <div
                      ref={similarScrollRef}
                      className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {similarProducts.map((similarProduct) => (
                        <button
                          key={similarProduct.id}
                          onClick={() => {
                            if (onProductClick) {
                              onProductClick(similarProduct);
                            }
                          }}
                          className="shrink-0 w-24 group cursor-pointer mt-3"
                        >
                          <div
                            className="relative aspect-3/4 rounded-lg overflow-hidden mb-1.5 transition-all"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '0 0 15px #fff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <img
                              src={similarProduct.image}
                              alt={similarProduct.name}
                              className="w-full h-full object-cover"
                            />
                            {similarProduct.badge && (
                              <Badge
                                className="absolute top-1 left-1 text-white text-[10px] px-1.5 py-0"
                                style={{
                                  background: '#410F3A',
                                  boxShadow: '0 0 15px #410F3A',
                                }}
                              >
                                {similarProduct.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-white line-clamp-2 mb-0.5 text-left leading-tight">
                            {similarProduct.name}
                          </p>
                          <p className="text-xs text-white">
                            ${Number(similarProduct.price).toFixed(2)}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Botón de flecha derecha */}
                    <button
                      onClick={scrollSimilarRight}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer"
                      style={{
                        background: '#111115',
                      }}
                    >
                      <ChevronRight className="h-6 w-6 text-[#E4D9AF]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Precio */}
              <div
                className="mb-6 p-4 rounded-xl"
                style={{
                  background: 'linear-gradient(to bottom right, #2c2c30 0%, #2c2c30 100%)',
                  boxShadow: '0 0 20px #2c2c30',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-sm text-[#898989] line-through">
                        ${Number(product.originalPrice).toFixed(2)}
                      </p>
                    )}
                    <p className="text-4xl text-white">${Number(product.price).toFixed(2)}</p>
                  </div>
                  {discount > 0 && (
                    <div className="text-right">
                      <Badge
                        className="text-white text-lg px-4 py-2 animate-pulse  outline-none"
                        style={{
                          background: '#980707',
                          boxShadow: '0 0 15px #980707',
                        }}
                      >
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="mb-4">
                <label className="text-sm text-[#E4D9AF] mb-2 block">Cantidad</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 transition-colors cursor-pointer"
                      style={{
                        background: '#2c2c30',
                      }}
                    >
                      <Minus className="h-4 w-4 text-[#E4D9AF]" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center py-3 outline-none text-white no-spinners"
                      style={{
                        background: '#131317',
                      }}
                      min="1"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-3 transition-colors cursor-pointer"
                      style={{
                        background: '#2c2c30',
                      }}
                    >
                      <Plus className="h-4 w-4 text-[#E4D9AF]" />
                    </button>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-[#E4D9AF]">Total</p>
                    <p
                      className="text-2xl text-white"
                      style={{
                        textShadow: '0 0 20px white',
                      }}
                    >
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  className="text-white hover:scale-[1.06] transition-all py-6 cursor-pointer outline-none"
                  style={{
                    background: 'transparent',
                  }}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product);
                    }
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Añadir al Carrito
                </Button>
                <Button
                  className="text-[#F9B61D] py-6 cursor-pointer outline-none"
                  style={{
                    background: '#F9B61D10',
                  }}
                  onClick={handleBuyNow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px #F9B61D10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Lightning className="h-5 w-5 mr-2 text-white" />
                  Comprar Ahora
                </Button>
              </div>

              {/* Características Clave */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Shield className="h-5 w-5 text-white mb-1" />
                  <span className="text-xs text-[#E4D9AF] text-center">Licenciado</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Zap className="h-5 w-5 text-white mb-1" />
                  <span className="text-xs text-[#E4D9AF] text-center">Configuración Rápida</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Package className="h-5 w-5 text-[#07BC61] mb-1" />
                  <span className="text-xs text-[#E4D9AF] text-center">Soporte</span>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h3 className="text-sm mb-2 text-[#E4D9AF]">Descripción</h3>
                {product.longDescription ? (
                  <div
                    className="text-sm text-[#898989] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.longDescription }}
                  />
                ) : (
                  <p className="text-sm text-[#898989] leading-relaxed">
                    {product.description || 'No hay descripción disponible.'}
                  </p>
                )}
              </div>

              {/* Características */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-[#E4D9AF]">Tecnologías y Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-sm text-[#F9B61D] px-3 py-1.5 rounded-lg"
                        style={{
                          background: '#F9B61D10',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ProductPreview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    sales: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.string),
    specs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    includes: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string),
    badge: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  isInWishlist: PropTypes.bool.isRequired,
  allProducts: PropTypes.array,
  onProductClick: PropTypes.func,
};
