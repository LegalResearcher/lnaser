import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Edit, Trash2, Eye, FileText, Download } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Document = Tables<"library_documents">;

interface AdminDocumentListProps {
  onEdit: (document: Document) => void;
}

const categoryLabels: Record<string, string> = {
  yemeni_laws: "التشريعات اليمنية",
  legal_rulings: "الأحكام القضائية",
  research: "البحوث والمراجع",
  arab_laws: "القوانين العربية",
  legal_templates: "النماذج القانونية",
};

const documentTypeLabels: Record<string, string> = {
  constitution: "دستور",
  law: "قانون",
  regulation: "لائحة",
  agreement: "اتفاقية",
  ruling: "حكم قضائي",
  research_paper: "بحث",
  reference: "مرجع",
  contract_template: "نموذج عقد",
  memo_template: "نموذج مذكرة",
  other: "أخرى",
};

const AdminDocumentList = ({ onEdit }: AdminDocumentListProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("library_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("خطأ في جلب الوثائق");
      console.error(error);
    } else {
      setDocuments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (document: Document) => {
    try {
      // Delete file from storage if exists
      if (document.file_url) {
        const filePath = document.file_url.split('/').pop();
        if (filePath) {
          await supabase.storage.from('legal-documents').remove([filePath]);
        }
      }

      // Delete document record
      const { error } = await supabase
        .from("library_documents")
        .delete()
        .eq("id", document.id);

      if (error) throw error;

      toast.success("تم حذف الوثيقة بنجاح");
      fetchDocuments();
    } catch (error) {
      toast.error("خطأ في حذف الوثيقة");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">لا توجد وثائق</h3>
          <p className="text-sm text-muted-foreground/70">ابدأ بإضافة وثيقة جديدة للمكتبة القانونية</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-rich-blue">الوثائق ({documents.length})</h2>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-rich-blue line-clamp-1">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{doc.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {categoryLabels[doc.category] || doc.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {documentTypeLabels[doc.document_type] || doc.document_type}
                        </Badge>
                        {doc.view_count && doc.view_count > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Eye className="w-3 h-3 ml-1" />
                            {doc.view_count} مشاهدة
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {doc.file_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(doc)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد من حذف هذه الوثيقة؟ لا يمكن التراجع عن هذا الإجراء.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-row-reverse gap-2">
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(doc)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDocumentList;
