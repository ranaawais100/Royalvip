import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedCarouselProps {
  children: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  slidesToShow?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  gap?: string;
  showArrows?: boolean;
  arrowsClassName?: string;
  rtl?: boolean;
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({
  children,
  className = '',
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  slidesToShow = { desktop: 3, tablet: 2, mobile: 1 },
  gap = '1rem',
  showArrows = true,
  arrowsClassName = '',
  rtl = true
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      direction: rtl ? 'rtl' : 'ltr',
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      containScroll: 'trimSnaps'
    },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Touch/swipe support is built into Embla Carousel

  return (
    <div className={cn('relative', className)}>
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full',
              'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600',
              'text-black hover:text-gray-900 shadow-lg hover:shadow-xl',
              'transition-all duration-300 transform hover:scale-110',
              'border-2 border-amber-300 hover:border-amber-400',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              'flex items-center justify-center',
              arrowsClassName
            )}
            onClick={scrollPrev}
            disabled={!loop && prevBtnDisabled}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full',
              'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600',
              'text-black hover:text-gray-900 shadow-lg hover:shadow-xl',
              'transition-all duration-300 transform hover:scale-110',
              'border-2 border-amber-300 hover:border-amber-400',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              'flex items-center justify-center',
              arrowsClassName
            )}
            onClick={scrollNext}
            disabled={!loop && nextBtnDisabled}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div 
          className="flex"
          style={{ 
            gap,
            direction: rtl ? 'rtl' : 'ltr'
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                'flex-none',
                // Responsive sizing
                `w-full sm:w-1/${slidesToShow.tablet} lg:w-1/${slidesToShow.desktop}`,
                // Custom responsive classes for better control
                'min-w-0' // Prevents flex items from overflowing
              )}
              style={{
                flex: `0 0 ${100 / slidesToShow.mobile}%`,
                '@media (min-width: 640px)': {
                  flex: `0 0 ${100 / slidesToShow.tablet}%`
                },
                '@media (min-width: 1024px)': {
                  flex: `0 0 ${100 / slidesToShow.desktop}%`
                }
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator (optional) */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === selectedIndex
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedCarousel;