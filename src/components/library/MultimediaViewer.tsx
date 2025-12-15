import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, ZoomIn, ZoomOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UniversalVideoPlayer from "./UniversalVideoPlayer";
import ImageCarousel from "./ImageCarousel";
import ShareButtons from "./ShareButtons";
import SEOHead from "./SEOHead";

interface MultimediaViewerProps {
  document: {
    id: string;
    title: string;
    description?: string | null;
    file_url?: string | null;
    external_url?: string | null;
    media_type?: string | null;
    image_urls?: string[] | null;
    video_source?: string | null;
    cover_image_url?: string | null;
    og_title?: string | null;
    og_description?: string | null;
  };
  onClose: () => void;
}

const MultimediaViewer = ({ document, onClose }: MultimediaViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [showShare, setShowShare] = useState(false);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));

  const url = document.external_url || document.file_url || "";
  const mediaType = document.media_type || "document";
  const documentUrl = `/library/document/${document.id}`;

  // Convert Google Drive view links to preview
  const getEmbedUrl = (link: string): string => {
    if (link.includes("drive.google.com")) {
      // Extract file ID from various Google Drive URL formats
      const fileIdMatch = link.match(/\/d\/([^\/]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
      // Handle /view or /sharing patterns
      return link.replace(/\/(view|sharing).*$/, "/preview");
    }
    return link;
  };

  const handleDownload = () => {
    window.open(url, "_blank");
  };

  const handleOpenExternal = () => {
    window.open(url, "_blank");
  };

  // Check content type
  const isPDF = url.toLowerCase().includes(".pdf") || url.includes("pdf");
  const isGoogleDrive = url.includes("drive.google.com");
  const isWord = url.includes(".doc") || url.includes(".docx");
  const isVideo = mediaType === "video";
  const isImageCollection = mediaType === "image" && document.image_urls && document.image_urls.length > 0;

  return (
    <>
      <SEOHead
        title={document.og_title || document.title}
        description={document.og_description || document.description || undefined}
        image={document.cover_image_url || undefined}
        url={documentUrl}
      />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="flex items-center justify-between p-4 bg-navy/90 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>
              <span className="text-white font-medium truncate max-w-[300px]">
                {document.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Share Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShare(!showShare)}
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>

              {/* Zoom controls for documents */}
              {!isVideo && !isImageCollection && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleZoomOut}
                    className="text-white hover:bg-white/10"
                    disabled={zoom <= 50}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </Button>
                  <span className="text-white text-sm w-16 text-center">{zoom}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleZoomIn}
                    className="text-white hover:bg-white/10"
                    disabled={zoom >= 200}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </>
              )}

              <div className="w-px h-6 bg-white/20 mx-2" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenExternal}
                className="text-white hover:bg-white/10"
              >
                <ExternalLink className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-white hover:bg-white/10"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Share Panel */}
          <AnimatePresence>
            {showShare && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-navy/80 backdrop-blur-sm border-b border-white/10 overflow-hidden"
              >
                <div className="p-4 flex justify-center">
                  <ShareButtons
                    title={document.title}
                    description={document.description || undefined}
                    url={documentUrl}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 overflow-auto p-4"
          >
            {/* Video Content */}
            {isVideo && (
              <div className="max-w-5xl mx-auto">
                <UniversalVideoPlayer url={url} videoSource={document.video_source} />
              </div>
            )}

            {/* Image Collection */}
            {isImageCollection && document.image_urls && (
              <ImageCarousel images={document.image_urls} title={document.title} />
            )}

            {/* Document Content (PDF, Google Drive, Word) */}
            {!isVideo && !isImageCollection && (
              <div
                className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
                style={{
                  width: `${Math.min(zoom, 100)}%`,
                  transform: `scale(${zoom > 100 ? zoom / 100 : 1})`,
                  transformOrigin: "top center",
                }}
              >
                {isPDF || isGoogleDrive || isWord ? (
                  <iframe
                    src={`${getEmbedUrl(url)}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-[calc(100vh-140px)] border-0"
                    title={document.title}
                    allow="autoplay"
                  />
                ) : (
                  <div className="p-8 min-h-[calc(100vh-140px)] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">
                        لا يمكن عرض هذا النوع من الملفات مباشرة
                      </p>
                      <Button
                        onClick={handleDownload}
                        className="bg-accent-gold hover:bg-accent-gold-light text-navy"
                      >
                        <Download className="w-4 h-4 ml-2" />
                        تحميل الملف
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MultimediaViewer;
