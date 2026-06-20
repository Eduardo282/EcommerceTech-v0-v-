import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCT_ENGAGEMENT_QUERY } from '../../graphql/queries';

export function useProductPreview({ product, isOpen, onAddToCart, onClose, allProducts = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [quantity, setQuantity] = useState(() => Math.max(1, Number(product.quantity) || 1));
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const imageContainerRef = useRef(null);
  const similarScrollRef = useRef(null);
  const { data: engagementData } = useQuery(PRODUCT_ENGAGEMENT_QUERY, {
    variables: { productId: String(product?.id || '') },
    skip: !isOpen || !product?.id,
  });

  useEffect(() => {
    if (!isImageExpanded) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsImageExpanded(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageExpanded]);

  const images = [
    ...new Set([
      ...(Array.isArray(product.images) ? product.images : []),
      product.image,
    ].filter(Boolean)),
  ];
  const safeCurrentImageIndex = Math.min(currentImageIndex, images.length - 1);
  const currentImage = images[safeCurrentImageIndex];

  const expandImage = async (event) => {
    event.stopPropagation();
    setShowMagnifier(false);
    setIsImageExpanded(true);

    const imageElement = imageContainerRef.current;
    const requestFullscreen =
      imageElement?.requestFullscreen ||
      imageElement?.webkitRequestFullscreen ||
      imageElement?.msRequestFullscreen;

    if (requestFullscreen) {
      try {
        await requestFullscreen.call(imageElement);
        setIsImageExpanded(false);
      } catch {
        // The full-window viewer is already visible as a fallback.
      }
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const magnifierSize = 160;
  const zoomLevel = 2.5;

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    setMagnifierPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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

  const handleMouseLeave = () => setShowMagnifier(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const similarProducts = allProducts
    .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .slice(0, 10);

  const scrollSimilarLeft = () => {
    similarScrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollSimilarRight = () => {
    similarScrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  return {
    containerDimensions,
    currentImage,
    currentImageIndex,
    decrementQuantity,
    discount,
    engagementData,
    expandImage,
    handleBuyNow,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    imageContainerRef,
    images,
    incrementQuantity,
    isImageExpanded,
    magnifierPosition,
    magnifierSize,
    nextImage,
    prevImage,
    quantity,
    safeCurrentImageIndex,
    scrollSimilarLeft,
    scrollSimilarRight,
    setCurrentImageIndex,
    setIsImageExpanded,
    setQuantity,
    showMagnifier,
    similarProducts,
    similarScrollRef,
    zoomLevel,
  };
}
