import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  is_downloadable: boolean | null;
  view_count: number | null;
  created_at: string;
  document_type: string;
}

interface DocumentCardProps {
  document: Document;
  onView: () => void;
}

const documentTypeLabels: Record<string, string> = {
  constitution: 'دستور',
  law: 'قانون',
  regulation: 'لائحة',
  agreement: 'اتفاقية',
  ruling: 'حكم قضائي',
  research_paper: 'بحث',
  reference: 'مرجع',
  contract_template: 'نموذج عقد',
  memo_template: 'نموذج مذكرة',
  other: 'أخرى'
};

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentCard = ({ document, onView }: DocumentCardProps) => {
  const handleDownload = () => {
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 h-full bg-white border-none shadow-card hover:shadow-card-hover transition-elegant">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-accent-gold" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-rich-blue/10 text-rich-blue px-2 py-1 rounded-full font-medium">
                {documentTypeLabels[document.document_type] || 'أخرى'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">
              {document.title}
            </h3>
            
            {document.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {document.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(document.created_at).toLocaleDateString('ar-YE')}
              </span>
              {document.file_size && (
                <span className="flex items-center gap-1">
                  <File className="w-3 h-3" />
                  {formatFileSize(document.file_size)}
                </span>
              )}
              {document.view_count !== null && document.view_count > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {document.view_count} مشاهدة
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              {document.file_url && (
                <>
                  <Button 
                    size="sm" 
                    onClick={onView}
                    className="flex-1 bg-rich-blue hover:bg-navy text-white"
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    قراءة
                  </Button>
                  {document.is_downloadable && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleDownload}
                      className="border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-navy"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DocumentCard;
