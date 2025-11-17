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
  ChevronDown,
} from "lucide-react";
import { useState, useRef } from "react";
import { ImageWithFallback } from "./fallImage/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const imageContainerRef = useRef(null);
  const similarScrollRef = useRef(null);

  if (!isOpen) return null;

  // Simulate multiple images (in real app, product would have an images array)
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
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
    // Add multiple items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
    // In a real app, this would redirect to checkout
  };

  const viewersCount = Math.floor(Math.random() * 20) + 5;

  // Get similar products (same category, excluding current product)
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 10);

  const scrollSimilarLeft = () => {
    if (similarScrollRef.current) {
      similarScrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollSimilarRight = () => {
    if (similarScrollRef.current) {
      similarScrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="presentation">
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="relative rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden border-2"
        style={{
          background: "linear-gradient(to bottom, #131317 0%, #131317 100%)",
          borderColor: "#2c2c30",
          boxShadow: "0 0 40px #2c2c30",
        }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 backdrop-blur-sm p-2 rounded-full transition-all shadow-lg border-2 border-[#2c2c30] cursor-pointer"
          style={{
            background: "#131317",
            borderColor: "#2c2c30",
            boxShadow: "0 0 15px #2c2c30",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#2c2c30";
            e.currentTarget.style.boxShadow = "0 0 25px #2c2c30";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2c2c30";
            e.currentTarget.style.boxShadow = "0 0 15px #2c2c30";
          }}>
          <X className="h-5 w-5 text-[#f0e4b8]" />
        </button>

        <div
          className="grid grid-cols-1 lg:grid-cols-[120px_1fr_400px] gap-0 max-h-[95vh] overflow-y-auto"
          role="document">
          {/* Left Column - Thumbnails */}
          <div
            className="hidden lg:flex flex-col gap-3 p-4 border-r-2 overflow-y-auto max-h-[95vh]"
            style={{
              background: "#131317",
              borderRightColor: "#2c2c30",
            }}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all cursor-pointer ${
                  currentImageIndex === index ? "shadow-lg" : ""
                }`}
                style={{
                  boxShadow:
                    currentImageIndex === index ? "0 0 20px #fff" : "none",
                }}>
                <ImageWithFallback
                  src={img}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Center Column - Main Image + Product Info */}
          <div
            className="flex flex-col overflow-y-auto scrollbar-hide max-h-[95vh]"
            style={{
              background: "#131317",
            }}>
            <div className="relative flex items-center justify-center p-8">
              {/* Viewers Badge */}
              <div className="absolute top-6 left-6 z-10">
                <Badge
                  className="text-white px-3 py-1.5 text-xs uppercase tracking-wide shadow-lg outline-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #131317 0%, rgba(220, 38, 38, 0.7) 100%)",
                  }}>
                  {viewersCount} VECES VISTO LAS ULTIMAS 24 HRS
                </Badge>
              </div>

              {/* Fullscreen & Wishlist Buttons */}
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button
                  className="p-2.5 rounded-lg transition-all shadow-md cursor-pointer"
                  style={{
                    background: "#131317",
                    boxShadow: "0 0 10px #2c2c30",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px #fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <Maximize2 className="h-5 w-5 text-[#f0e4b8]" />
                </button>
                <button
                  className="px-3 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  onClick={() => onToggleWishlist(product.id)}
                  style={{
                    background: "#131317",
                    boxShadow: "0 0 10px #2c2c30",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px #fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <span className="text-sm text-[#f0e4b8]">
                    {isInWishlist ? "19" : "18"}
                  </span>
                  <Heart
                    className={`h-5 w-5 transition-all ${
                      isInWishlist
                        ? "fill-[#ae3a2e] text-transparent"
                        : "text-red-400"
                    }`}
                  />
                </button>
              </div>

              {/* Main Image with Magnifier */}
              <div
                ref={imageContainerRef}
                className="relative max-w-2xl w-full aspect-square cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                {/* Magnifier Glass */}
                {showMagnifier && imageContainerRef.current && (
                  <div
                    className="absolute rounded-full pointer-events-none shadow-2xl overflow-hidden z-50"
                    style={{
                      width: `${magnifierSize}px`,
                      height: `${magnifierSize}px`,
                      left: `${magnifierPosition.x}px`,
                      top: `${magnifierPosition.y}px`,
                      transform: "translate(-50%, -50%)",
                      background: "transparent",
                      boxShadow: "0 0 30px #fff",
                    }}>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${
                          imageContainerRef.current.offsetWidth * zoomLevel
                        }px`,
                        height: `${
                          imageContainerRef.current.offsetHeight * zoomLevel
                        }px`,
                        backgroundImage: `url(${images[currentImageIndex]})`,
                        backgroundSize: `${
                          imageContainerRef.current.offsetWidth * zoomLevel
                        }px ${
                          imageContainerRef.current.offsetHeight * zoomLevel
                        }px`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `-${
                          magnifierPosition.x * zoomLevel - magnifierSize / 2
                        }px -${
                          magnifierPosition.y * zoomLevel - magnifierSize / 2
                        }px`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg cursor-pointer"
                style={{
                  background: "transparent",
                  boxShadow: "0 0 15px #fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px white";
                }}>
                <ChevronLeft className="h-6 w-6 text-[#f0e4b8]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg cursor-pointer"
                style={{
                  background: "transparent",
                  boxShadow: "0 0 15px white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px white";
                }}>
                <ChevronRight className="h-6 w-6 text-[#f0e4b8]" />
              </button>
            </div>

            {/* Product Information Section */}
            <div
              className="border-t-2 px-8 py-6"
              style={{
                background: "#131317",
                borderTopColor: "#2c2c30",
              }}>
              <h3
                className="text-lg mb-4 text-orange-100"
                style={{
                  textShadow: "0 0 15px rgba(251, 146, 60, 0.4)",
                }}>
                Informacion del Producto
              </h3>

              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border-b-2"
                  style={{
                    borderBottomColor: "#2c2c30",
                  }}>
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">Detalles del Producto</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 text-sm text-orange-200/70">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>Alta calidad diseñado por profesionales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Construido con tecnologías modernas y mejores
                          prácticas
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Totalmente personalizable y fácil de implementar
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Diseño responsivo que funciona en todos los
                          dispositivos
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Actualizaciones regulares y mejoras incluidas
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border-b-2"
                  style={{
                    borderBottomColor: "#2c2c30",
                  }}>
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">Especificaciones Técnicas</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Categoría:</span>
                        <span className="text-orange-200/70">
                          {product.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Tecnologías:</span>
                        <span className="text-orange-200/70">
                          {product.features?.join(", ") ||
                            "Multiple frameworks"}
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">
                          Formato de archivo:
                        </span>
                        <span className="text-orange-200/70">
                          Código fuente, Documentación, Recursos
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">
                          Tipo de licencia:
                        </span>
                        <span className="text-orange-200/70">
                          Uso comercial permitido
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Compatibilidad:</span>
                        <span className="text-orange-200/70">
                          Todos los navegadores y dispositivos modernos
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Soporte:</span>
                        <span className="text-orange-200/70">
                          6 meses de soporte premium incluido
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">
                          Actualizaciones:
                        </span>
                        <span className="text-orange-200/70">
                          Actualizaciones gratuitas de por vida
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">Qué incluye</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 text-sm text-orange-200/70">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>
                          Código fuente completo con comentarios detallados
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>
                          Documentación completa y guía de configuración
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Todos los recursos y activos de diseño</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>
                          Implementaciones y demostraciones de ejemplo
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>
                          Acceso de por vida a todas las actualizaciones futuras
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>6 meses de soporte técnico premium</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>
                          Licencia comercial para proyectos ilimitados
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div
            className="flex flex-col p-8 overflow-y-auto scrollbar-hide max-h-[95vh]"
            style={{
              background: "#131317",
            }}>
            <div className="flex-1">
              <Badge
                variant="outline"
                className="mb-3 text-orange-300 border-[#2c2c30] bg-[#131317]">
                {product.category}
              </Badge>

              <h2
                className="text-2xl mb-3 text-orange-100"
                style={{
                  textShadow: "0 0 20px rgba(251, 146, 60, 0.4)",
                }}>
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-[#f0e4b8]"
                      }`}
                      style={
                        i < Math.floor(product.rating)
                          ? {
                              filter:
                                "drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))",
                            }
                          : {}
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-orange-200/70">
                  {product.rating} ({product.reviews.toLocaleString()} reseñas)
                </span>
              </div>

              {/* Downloads */}
              <div className="flex items-center gap-2 mb-6 text-sm text-orange-200/70">
                <Download className="h-4 w-4" />
                <span>{product.sales.toLocaleString()} descargas</span>
              </div>

              {/* Similar Products Carousel */}
              {similarProducts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-orange-100">
                    Productos Similares
                  </h3>
                  <div className="relative">
                    {/* Left Arrow */}
                    <button
                      onClick={scrollSimilarLeft}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer"
                      style={{
                        background: "#131317",
                      }}>
                      <ChevronLeft className="h-6 w-6 text-orange-200" />
                    </button>

                    {/* Products Scroll Container */}
                    <div
                      ref={similarScrollRef}
                      className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}>
                      {similarProducts.map((similarProduct) => (
                        <button
                          key={similarProduct.id}
                          onClick={() => {
                            if (onProductClick) {
                              onProductClick(similarProduct);
                            }
                          }}
                          className="shrink-0 w-24 group cursor-pointer mt-3">
                          <div
                            className="relative aspect-3/4 rounded-lg overflow-hidden mb-1.5 transition-all"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = "0 0 15px #fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                            }}>
                            <img
                              src={similarProduct.image}
                              alt={similarProduct.name}
                              className="w-full h-full object-cover"
                            />
                            {similarProduct.badge && (
                              <Badge
                                className="absolute top-1 left-1 text-white text-[10px] px-1.5 py-0"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(251, 146, 60, 0.8) 0%, rgba(245, 158, 11, 0.8) 100%)",
                                }}>
                                {similarProduct.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-orange-200 line-clamp-2 mb-0.5 text-left leading-tight">
                            {similarProduct.name}
                          </p>
                          <p
                            className="text-xs text-orange-300"
                            style={{
                              textShadow: "0 0 10px rgba(251, 146, 60, 0.4)",
                            }}>
                            ${similarProduct.price}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={scrollSimilarRight}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer"
                      style={{
                        background: "#131317",
                      }}>
                      <ChevronRight className="h-6 w-6 text-orange-200" />
                    </button>
                  </div>
                </div>
              )}

              {/* Price */}
              <div
                className="mb-6 p-4 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to bottom right, #2c2c30 0%, #2c2c30 100%)",
                  boxShadow: "0 0 20px #2c2c30",
                }}>
                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-sm text-orange-400/50 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                    <p className="text-4xl text-[#f0e4b8]">${product.price}</p>
                  </div>
                  {discount > 0 && (
                    <div className="text-right">
                      <Badge
                        className="text-white text-lg px-4 py-2 outline-none"
                        style={{
                          background:
                            "linear-gradient(135deg, #131317 0%, #131317 100%)",
                        }}>
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-sm text-orange-200 mb-2 block">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 transition-colors cursor-pointer"
                      style={{
                        background: "#2c2c30",
                      }}>
                      <Minus className="h-4 w-4 text-orange-200" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center py-3 outline-none text-orange-100 no-spinners"
                      style={{
                        background: "#131317",
                      }}
                      min="1"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-3 transition-colors cursor-pointer"
                      style={{
                        background: "#2c2c30",
                      }}>
                      <Plus className="h-4 w-4 text-orange-200" />
                    </button>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-orange-200/70">Total</p>
                    <p
                      className="text-2xl text-orange-300"
                      style={{
                        textShadow: "0 0 20px rgba(251, 146, 60, 0.5)",
                      }}>
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="ghost"
                  className="text-orange-300 py-6 cursor-pointer outline-none"
                  style={{
                    background: "#2c2c30",
                  }}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product);
                    }
                  }}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Añadir al Carrito
                </Button>
                <Button
                  className="text-white py-6 cursor-pointer outline-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #3F2F14 0%, #3F2F14 100%)",
                    textShadow: "0 0 15px rgba(251, 146, 60, 0.5)",
                  }}
                  onClick={handleBuyNow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 35px #ffffff50";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <Lightning className="h-5 w-5 mr-2" />
                  Comprar Ahora
                </Button>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Shield className="h-5 w-5 text-orange-300 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Licenciado
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Zap className="h-5 w-5 text-amber-300 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Configuración Rápida
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg">
                  <Package className="h-5 w-5 text-green-400 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Soporte
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm mb-2 text-orange-100">Descripción</h3>
                <p className="text-sm text-orange-200/70 leading-relaxed">
                  Esta categoria {product.category.toLowerCase()} es
                  profesionalmente diseñada para ayudarte a construir proyectos
                  increíbles más rápido. Incluye documentación completa,
                  actualizaciones regulares, y soporte dedicado.
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-orange-100">
                    Tecnologías y Características
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-sm text-orange-200 px-3 py-1.5 rounded-lg border-2"
                        style={{
                          background: "rgba(251, 146, 60, 0.1)",
                          borderColor: "rgba(251, 146, 60, 0.3)",
                        }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-sm mb-3 text-orange-100">Qué incluye</h3>
                <ul className="space-y-2 text-sm text-orange-200/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Código fuente completo con comentarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Documentación completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Actualizaciones de por vida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>6 meses de soporte premium</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
