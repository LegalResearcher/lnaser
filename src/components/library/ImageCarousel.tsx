import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, X, Download } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));

  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative aspect-[3/4] md:aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${title || "صورة"} - صفحة ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    صفحة {index + 1} من {images.length}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-auto left-2" />
          <CarouselNext className="left-auto right-2" />
        </Carousel>
      </div>

      {/* Fullscreen Image Viewer */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full min-h-[80vh] flex flex-col">
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/20"
                disabled={zoom <= 50}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <span className="text-white text-sm w-12 text-center">{zoom}%</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/20"
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => selectedImage && handleDownload(selectedImage)}
                className="text-white hover:bg-white/20"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedImage(null)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center overflow-auto p-8">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="عرض مكبر"
                  className="max-w-none transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "center center",
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageCarousel;
