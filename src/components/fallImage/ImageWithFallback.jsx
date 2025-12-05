import { useState } from "react";

// Simple inline SVG fallback (base64) for failed image loads.
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/**
 * ImageWithFallback
 * Replaces a broken image with an accessible fallback figure.
 * Semantics:
 * - Uses <figure>/<figcaption> when showing the fallback for better context.
 * - Preserves original alt as figcaption (if provided) and notes the failure.
 * - Adds data-original-url for debugging.
 */
export function ImageWithFallback({
  src,
  alt = "",
  style,
  className,
  fallbackAlt = "Image failed to load",
  onError,
  ...rest
}) {
  const [didError, setDidError] = useState(false);

  const handleError = (e) => {
    setDidError(true);
    if (onError) onError(e);
  };

  if (!didError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={handleError}
        loading="lazy"
        {...rest}
      />
    );
  }

  return (
    <figure
      className={`inline-block text-center align-middle ${
        className ?? ""
      }`}
      style={style}
      data-original-url={src}
      aria-describedby={alt ? `${src}-caption` : undefined}>
      <img
        src={ERROR_IMG_SRC}
        alt={fallbackAlt}
        className="mx-auto"
        aria-live="polite"
        {...rest}
      />
      {alt && (
        <figcaption
          id={`${src}-caption`}
          className="text-xs text-[#2c2c30] mt-2 px-2">
          {alt} – failed to load
        </figcaption>
      )}
    </figure>
  );
}
