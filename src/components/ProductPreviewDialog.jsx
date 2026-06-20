import PropTypes from 'prop-types';
import { ProductPreview } from './ProductPreview';
import { hasProductId } from '../features/products/productIdentity';

export function ProductPreviewDialog({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = [],
  allProducts = [],
  onProductClick,
}) {
  if (!product) return null;

  return (
    <ProductPreview
      product={product}
      isOpen
      onClose={onClose}
      onAddToCart={onAddToCart}
      onToggleWishlist={onToggleWishlist}
      isInWishlist={hasProductId(wishlistItems, product.id)}
      allProducts={allProducts}
      onProductClick={onProductClick}
    />
  );
}

ProductPreviewDialog.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.array,
  allProducts: PropTypes.array,
  onProductClick: PropTypes.func,
};
