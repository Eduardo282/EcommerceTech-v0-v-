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
import { ImageWithFallback } from "./figma/ImageWithFallback";
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
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="presentation">
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="relative rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden border-2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(25, 15, 5, 0.98) 0%, rgba(30, 20, 10, 0.98) 100%)",
          borderColor: "rgba(251, 146, 60, 0.4)",
          boxShadow: "0 0 40px rgba(251, 146, 60, 0.3)",
        }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 backdrop-blur-sm p-2 rounded-full transition-all shadow-lg border-2"
          style={{
            background: "rgba(25, 15, 5, 0.9)",
            borderColor: "rgba(251, 146, 60, 0.5)",
            boxShadow: "0 0 15px rgba(251, 146, 60, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.8)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(251, 146, 60, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.5)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(251, 146, 60, 0.3)";
          }}>
          <X className="h-5 w-5 text-orange-200" />
        </button>

        <div
          className="grid grid-cols-1 lg:grid-cols-[120px_1fr_400px] gap-0 max-h-[95vh] overflow-y-auto"
          role="document">
          {/* Left Column - Thumbnails */}
          <div
            className="hidden lg:flex flex-col gap-3 p-4 border-r-2 overflow-y-auto max-h-[95vh]"
            style={{
              background: "rgba(20, 12, 5, 0.6)",
              borderRightColor: "rgba(251, 146, 60, 0.3)",
            }}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? "shadow-lg" : ""
                }`}
                style={{
                  borderColor:
                    currentImageIndex === index
                      ? "rgba(251, 146, 60, 0.8)"
                      : "rgba(251, 146, 60, 0.3)",
                  boxShadow:
                    currentImageIndex === index
                      ? "0 0 20px rgba(251, 146, 60, 0.4)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (currentImageIndex !== index) {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.6)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentImageIndex !== index) {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.3)";
                  }
                }}>
                <ImageWithFallback
                  src={img}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Orange Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-amber-600/20 to-orange-700/15 mix-blend-multiply" />
              </button>
            ))}
          </div>

          {/* Center Column - Main Image + Product Info */}
          <div
            className="flex flex-col overflow-y-auto max-h-[95vh]"
            style={{
              background: "rgba(20, 12, 5, 0.4)",
            }}>
            <div className="relative flex items-center justify-center p-8">
              {/* Viewers Badge */}
              <div className="absolute top-6 left-6 z-10">
                <Badge
                  className="text-white border-2 px-3 py-1.5 text-xs uppercase tracking-wide shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239, 68, 68, 0.7) 0%, rgba(220, 38, 38, 0.7) 100%)",
                    borderColor: "rgba(239, 68, 68, 0.6)",
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
                  }}>
                  {viewersCount} VIEWED IN THE LAST 24 HOURS
                </Badge>
              </div>

              {/* Fullscreen & Wishlist Buttons */}
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button
                  className="p-2.5 rounded-lg transition-all shadow-md border-2"
                  style={{
                    background: "rgba(25, 15, 5, 0.9)",
                    borderColor: "rgba(251, 146, 60, 0.4)",
                    boxShadow: "0 0 10px rgba(251, 146, 60, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.7)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(251, 146, 60, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(251, 146, 60, 0.2)";
                  }}>
                  <Maximize2 className="h-5 w-5 text-orange-200" />
                </button>
                <button
                  className="px-3 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-2 border-2"
                  onClick={() => onToggleWishlist(product.id)}
                  style={{
                    background: "rgba(25, 15, 5, 0.9)",
                    borderColor: "rgba(251, 146, 60, 0.4)",
                    boxShadow: "0 0 10px rgba(251, 146, 60, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.7)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(251, 146, 60, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(251, 146, 60, 0.2)";
                  }}>
                  <span className="text-sm text-orange-200">
                    {isInWishlist ? "19" : "18"}
                  </span>
                  <Heart
                    className={`h-5 w-5 transition-all ${
                      isInWishlist
                        ? "fill-red-500 text-red-500"
                        : "text-orange-200"
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
                    className="absolute border-4 rounded-full pointer-events-none shadow-2xl overflow-hidden z-50"
                    style={{
                      width: `${magnifierSize}px`,
                      height: `${magnifierSize}px`,
                      left: `${magnifierPosition.x}px`,
                      top: `${magnifierPosition.y}px`,
                      transform: "translate(-50%, -50%)",
                      borderColor: "rgba(251, 146, 60, 0.8)",
                      background: "rgba(25, 15, 5, 0.95)",
                      boxShadow: "0 0 30px rgba(251, 146, 60, 0.5)",
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg border-2"
                style={{
                  background: "rgba(25, 15, 5, 0.9)",
                  borderColor: "rgba(251, 146, 60, 0.5)",
                  boxShadow: "0 0 15px rgba(251, 146, 60, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(251, 146, 60, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(251, 146, 60, 0.3)";
                }}>
                <ChevronLeft className="h-6 w-6 text-orange-200" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all shadow-lg border-2"
                style={{
                  background: "rgba(25, 15, 5, 0.9)",
                  borderColor: "rgba(251, 146, 60, 0.5)",
                  boxShadow: "0 0 15px rgba(251, 146, 60, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(251, 146, 60, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(251, 146, 60, 0.3)";
                }}>
                <ChevronRight className="h-6 w-6 text-orange-200" />
              </button>
            </div>

            {/* Product Information Section */}
            <div
              className="border-t-2 px-8 py-6"
              style={{
                background: "rgba(25, 15, 5, 0.8)",
                borderTopColor: "rgba(251, 146, 60, 0.3)",
              }}>
              <h3
                className="text-lg mb-4 text-orange-100"
                style={{
                  textShadow: "0 0 15px rgba(251, 146, 60, 0.4)",
                }}>
                Product Information
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
                    borderBottomColor: "rgba(251, 146, 60, 0.2)",
                  }}>
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">Product Details</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 text-sm text-orange-200/70">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Premium quality {product.category.toLowerCase()}{" "}
                          designed by professionals
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>
                          Built with modern technologies and best practices
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>Fully customizable and easy to implement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>Responsive design that works on all devices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-300">•</span>
                        <span>Regular updates and improvements included</span>
                      </li>
                    </ul>
                    <div
                      className="mt-4 p-3 rounded-lg border-2"
                      style={{
                        background: "rgba(251, 146, 60, 0.1)",
                        borderColor: "rgba(251, 146, 60, 0.3)",
                      }}>
                      <p className="text-sm text-orange-100/80">
                        This {product.category.toLowerCase()} has been
                        downloaded over {product.sales.toLocaleString()} times
                        and rated {product.rating} stars by{" "}
                        {product.reviews.toLocaleString()} satisfied customers.
                        Join thousands of developers and designers who trust our
                        products for their projects.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border-b-2"
                  style={{
                    borderBottomColor: "rgba(251, 146, 60, 0.2)",
                  }}>
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">Technical Specifications</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Category:</span>
                        <span className="text-orange-200/70">
                          {product.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Technologies:</span>
                        <span className="text-orange-200/70">
                          {product.features?.join(", ") ||
                            "Multiple frameworks"}
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">File Format:</span>
                        <span className="text-orange-200/70">
                          Source code, Documentation, Assets
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">License Type:</span>
                        <span className="text-orange-200/70">
                          Commercial Use Allowed
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Compatibility:</span>
                        <span className="text-orange-200/70">
                          All modern browsers and devices
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Support:</span>
                        <span className="text-orange-200/70">
                          6 months premium support included
                        </span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] gap-2">
                        <span className="text-orange-200">Updates:</span>
                        <span className="text-orange-200/70">
                          Lifetime free updates
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="py-4 hover:no-underline text-orange-100">
                    <span className="text-sm">What's Included</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 text-sm text-orange-200/70">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Complete source code with detailed comments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Comprehensive documentation and setup guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>All design assets and resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Example implementations and demos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Lifetime access to all future updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>6 months of premium technical support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Commercial license for unlimited projects</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div
            className="flex flex-col p-8 overflow-y-auto max-h-[95vh]"
            style={{
              background: "rgba(25, 15, 5, 0.8)",
            }}>
            <div className="flex-1">
              <Badge
                variant="outline"
                className="mb-3 text-orange-300 border-orange-500/40 bg-orange-500/10">
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
                          : "text-orange-900"
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
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Downloads */}
              <div className="flex items-center gap-2 mb-6 text-sm text-orange-200/70">
                <Download className="h-4 w-4" />
                <span>{product.sales.toLocaleString()} downloads</span>
              </div>

              {/* Similar Products Carousel */}
              {similarProducts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-orange-100">
                    Similar Products
                  </h3>
                  <div className="relative">
                    {/* Left Arrow */}
                    <button
                      onClick={scrollSimilarLeft}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all border-2"
                      style={{
                        background: "rgba(25, 15, 5, 0.9)",
                        borderColor: "rgba(251, 146, 60, 0.5)",
                        boxShadow: "0 0 10px rgba(251, 146, 60, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(251, 146, 60, 0.8)";
                        e.currentTarget.style.boxShadow =
                          "0 0 20px rgba(251, 146, 60, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(251, 146, 60, 0.5)";
                        e.currentTarget.style.boxShadow =
                          "0 0 10px rgba(251, 146, 60, 0.3)";
                      }}>
                      <ChevronLeft className="h-4 w-4 text-orange-200" />
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
                          className="flex-shrink-0 w-24 group cursor-pointer">
                          <div
                            className="relative aspect-[3/4] rounded-lg overflow-hidden mb-1.5 border-2 transition-all"
                            style={{
                              borderColor: "rgba(251, 146, 60, 0.3)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(251, 146, 60, 0.7)";
                              e.currentTarget.style.boxShadow =
                                "0 0 15px rgba(251, 146, 60, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(251, 146, 60, 0.3)";
                              e.currentTarget.style.boxShadow = "none";
                            }}>
                            <img
                              src={similarProduct.image}
                              alt={similarProduct.name}
                              className="w-full h-full object-cover"
                            />
                            {/* Orange Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-amber-600/20 to-orange-700/15 mix-blend-multiply" />
                            {similarProduct.badge && (
                              <Badge
                                className="absolute top-1 left-1 text-white border-0 text-[10px] px-1.5 py-0"
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
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all border-2"
                      style={{
                        background: "rgba(25, 15, 5, 0.9)",
                        borderColor: "rgba(251, 146, 60, 0.5)",
                        boxShadow: "0 0 10px rgba(251, 146, 60, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(251, 146, 60, 0.8)";
                        e.currentTarget.style.boxShadow =
                          "0 0 20px rgba(251, 146, 60, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(251, 146, 60, 0.5)";
                        e.currentTarget.style.boxShadow =
                          "0 0 10px rgba(251, 146, 60, 0.3)";
                      }}>
                      <ChevronRight className="h-4 w-4 text-orange-200" />
                    </button>
                  </div>
                </div>
              )}

              {/* Price */}
              <div
                className="mb-6 p-4 rounded-xl border-2"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(251, 146, 60, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)",
                  borderColor: "rgba(251, 146, 60, 0.4)",
                  boxShadow: "0 0 20px rgba(251, 146, 60, 0.2)",
                }}>
                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-sm text-orange-400/50 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                    <p
                      className="text-4xl text-orange-300"
                      style={{
                        textShadow: "0 0 25px rgba(251, 146, 60, 0.6)",
                      }}>
                      ${product.price}
                    </p>
                  </div>
                  {discount > 0 && (
                    <div className="text-right">
                      <Badge
                        className="text-white border-2 text-lg px-4 py-2"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(239, 68, 68, 0.7) 0%, rgba(220, 38, 38, 0.7) 100%)",
                          borderColor: "rgba(239, 68, 68, 0.6)",
                          boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
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
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center border-2 rounded-lg overflow-hidden"
                    style={{
                      borderColor: "rgba(251, 146, 60, 0.4)",
                    }}>
                    <button
                      onClick={decrementQuantity}
                      className="p-3 transition-colors"
                      style={{
                        background: "rgba(251, 146, 60, 0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(251, 146, 60, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(251, 146, 60, 0.1)";
                      }}>
                      <Minus className="h-4 w-4 text-orange-200" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center border-x-2 py-3 focus:outline-none text-orange-100"
                      style={{
                        borderColor: "rgba(251, 146, 60, 0.4)",
                        background: "rgba(25, 15, 5, 0.6)",
                      }}
                      min="1"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-3 transition-colors"
                      style={{
                        background: "rgba(251, 146, 60, 0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(251, 146, 60, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(251, 146, 60, 0.1)";
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
                  variant="outline"
                  className="border-2 text-orange-300 py-6"
                  style={{
                    borderColor: "rgba(251, 146, 60, 0.6)",
                    background: "rgba(251, 146, 60, 0.1)",
                  }}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(251, 146, 60, 0.2)";
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(251, 146, 60, 0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(251, 146, 60, 0.6)";
                  }}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  className="text-white py-6 border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251, 146, 60, 0.7) 0%, rgba(245, 158, 11, 0.7) 100%)",
                    borderColor: "rgba(251, 146, 60, 0.6)",
                    boxShadow: "0 0 25px rgba(251, 146, 60, 0.4)",
                    textShadow: "0 0 15px rgba(251, 146, 60, 0.5)",
                  }}
                  onClick={handleBuyNow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(251, 146, 60, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(251, 146, 60, 0.4)";
                  }}>
                  <Lightning className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="flex flex-col items-center p-3 rounded-lg border-2"
                  style={{
                    background: "rgba(251, 146, 60, 0.1)",
                    borderColor: "rgba(251, 146, 60, 0.3)",
                  }}>
                  <Shield className="h-5 w-5 text-orange-300 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Licensed
                  </span>
                </div>
                <div
                  className="flex flex-col items-center p-3 rounded-lg border-2"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    borderColor: "rgba(245, 158, 11, 0.3)",
                  }}>
                  <Zap className="h-5 w-5 text-amber-300 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Fast Setup
                  </span>
                </div>
                <div
                  className="flex flex-col items-center p-3 rounded-lg border-2"
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    borderColor: "rgba(34, 197, 94, 0.3)",
                  }}>
                  <Package className="h-5 w-5 text-green-400 mb-1" />
                  <span className="text-xs text-orange-200/70 text-center">
                    Support
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm mb-2 text-orange-100">Description</h3>
                <p className="text-sm text-orange-200/70 leading-relaxed">
                  This premium {product.category.toLowerCase()} is
                  professionally crafted to help you build amazing projects
                  faster. Includes comprehensive documentation, regular updates,
                  and dedicated support.
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="text-sm mb-3 text-orange-100">
                    Technologies & Features
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
                <h3 className="text-sm mb-3 text-orange-100">
                  What's Included
                </h3>
                <ul className="space-y-2 text-sm text-orange-200/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Full source code with comments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Comprehensive documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Lifetime updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>6 months premium support</span>
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
