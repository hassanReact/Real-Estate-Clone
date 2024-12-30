import { useCallback, useEffect, useState } from "react";
import { Card } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion';
export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Default to `true`
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const loadImages = useCallback(() => {
    setLoading(true); // Show the loading state
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
        setLoading(false); // Hide the loading state
      })
      .catch((error) => {
        console.error("Failed to load images", error);
        setLoading(false); // Hide the loading state even on failure
      });
  }, [images]); // Dependency on `images`

  useEffect(() => {
    loadImages();
  }, [loadImages]); // Add `loadImages` to dependencies

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    // Autoplay
    let interval: ReturnType<typeof setInterval> | undefined;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]); // Add the missing dependencies
  
  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <Card
      className={`overflow-hidden h-full w-full relative flex items-center justify-center ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Show loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Render children only if images are loaded */}
      {!loading && areImagesLoaded && children}
      {!loading && areImagesLoaded && overlay && (
        <div
          className={`absolute inset-0 bg-black/60 z-40 ${overlayClassName}`}
        />
      )}

      {!loading && areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </Card>
  );
};
