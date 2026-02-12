import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CarouselContextProps {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextProps | undefined>(
  undefined
);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel provider');
  }
  return context;
};

interface CarouselProps {
  options?: EmblaOptionsType;
  children: React.ReactNode;
  className?: string;
}

export const Carousel = ({ options, children, className }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </CarouselContext.Provider>
  );
};

export const SliderContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { emblaRef } = useCarousel();
  return (
    <div className={cn('overflow-hidden', className)} ref={emblaRef}>
      <div className='flex'>{children}</div>
    </div>
  );
};

export const Slider = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex-[0_0_100%] min-w-0', className)}>{children}</div>
  );
};

export const SliderPrevButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { emblaApi } = useCarousel();
  const [disabled, setDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: any) => {
    setDisabled(!emblaApi.canScrollPrev());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <button
      className={className}
      onClick={() => emblaApi?.scrollPrev()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SliderNextButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { emblaApi } = useCarousel();
  const [disabled, setDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: any) => {
    setDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <button
      className={className}
      onClick={() => emblaApi?.scrollNext()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SliderDotButton = () => {
  const { scrollSnaps, selectedIndex, onDotButtonClick } = useCarousel();
  return (
    <div className='flex flex-wrap justify-center items-center gap-2'>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            index === selectedIndex
              ? 'bg-current w-6'
              : 'bg-current opacity-20 hover:opacity-40'
          )}
        />
      ))}
    </div>
  );
};
