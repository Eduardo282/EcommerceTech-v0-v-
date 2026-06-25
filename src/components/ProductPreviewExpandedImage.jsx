import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export function ProductPreviewExpandedImage({
  currentImage,
  images,
  onClose,
  onNext,
  onPrevious,
  productName,
}) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded image of ${productName}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close expanded image"
        className="absolute right-5 top-5 z-20 rounded-full bg-[#2c2c30] p-3 text-[#E4D9AF] shadow-lg transition-transform hover:scale-110 cursor-pointer"
      >
        ✕
      </button>

      <img
        src={currentImage}
        alt={productName}
        className="max-h-[94vh] max-w-[94vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-[#2c2c30]/90 p-3 text-[#E4D9AF] shadow-lg transition-transform hover:scale-110 cursor-pointer"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-[#2c2c30]/90 p-3 text-[#E4D9AF] shadow-lg transition-transform hover:scale-110 cursor-pointer"
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body
  );
}

ProductPreviewExpandedImage.propTypes = {
  currentImage: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
