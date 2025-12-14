import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DocumentViewerProps {
  url: string;
  onClose: () => void;
}

const DocumentViewer = ({ url, onClose }: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));

  const handleDownload = () => {
    window.open(url, '_blank');
  };

  const handleOpenExternal = () => {
    window.open(url, '_blank');
  };

  // Check if URL is a PDF
  const isPDF = url.toLowerCase().endsWith('.pdf') || url.includes('pdf');

  return (
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
            <span className="text-white font-medium">عرض الوثيقة</span>
          </div>
          
          <div className="flex items-center gap-2">
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

        {/* Document Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 overflow-auto p-4"
        >
          <div 
            className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ 
              width: `${Math.min(zoom, 100)}%`,
              transform: `scale(${zoom > 100 ? zoom / 100 : 1})`,
              transformOrigin: 'top center'
            }}
          >
            {isPDF ? (
              <iframe
                src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-[calc(100vh-120px)]"
                title="PDF Viewer"
              />
            ) : (
              <div className="p-8 min-h-[calc(100vh-120px)] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    لا يمكن عرض هذا النوع من الملفات مباشرة
                  </p>
                  <Button onClick={handleDownload} className="bg-accent-gold hover:bg-accent-gold-light text-navy">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل الملف
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentViewer;
