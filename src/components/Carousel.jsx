'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import useEmblaCarousel from 'embla-carousel-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!emblaApi || !setApi) {
      return;
    }

    setApi(emblaApi);
  }, [emblaApi, setApi]);

  React.useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi?.off('reInit', onSelect);
      emblaApi?.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef: emblaRef,
        api: emblaApi,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDown={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

Carousel.propTypes = {
  opts: PropTypes.object,
  plugins: PropTypes.array,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  setApi: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
}

CarouselContent.propTypes = {
  className: PropTypes.string,
};

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
}

CarouselItem.propTypes = {
  className: PropTypes.string,
};

function CarouselPrevious({ className, ...props }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      className={cn(
        'absolute size-8 rounded-full flex items-center justify-center border border-white/20 bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
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
        className="h-4 w-4"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

CarouselPrevious.propTypes = {
  className: PropTypes.string,
};

function CarouselNext({ className, ...props }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      className={cn(
        'absolute size-8 rounded-full flex items-center justify-center border border-white/20 bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
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
        className="h-4 w-4"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <span className="sr-only">Next slide</span>
    </button>
  );
}

CarouselNext.propTypes = {
  className: PropTypes.string,
};

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
