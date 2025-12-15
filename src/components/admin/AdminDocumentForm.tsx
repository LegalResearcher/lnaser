import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Save, X, FileText } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Document = Tables<"library_documents">;
type DocumentCategory = "yemeni_laws" | "legal_rulings" | "research" | "arab_laws" | "legal_templates";
type DocumentType = "constitution" | "law" | "regulation" | "agreement" | "ruling" | "research_paper" | "reference" | "contract_template" | "memo_template" | "other";

interface AdminDocumentFormProps {
  document?: Document;
  onSuccess: () => void;
}

const categories: { value: DocumentCategory; label: string }[] = [
  { value: "yemeni_laws", label: "التشريعات اليمنية" },
  { value: "legal_rulings", label: "الأحكام القضائية" },
  { value: "research", label: "البحوث والمراجع" },
  { value: "arab_laws", label: "القوانين العربية" },
  { value: "legal_templates", label: "النماذج القانونية" },
];

const documentTypes: { value: DocumentType; label: string }[] = [
  { value: "constitution", label: "دستور" },
  { value: "law", label: "قانون" },
  { value: "regulation", label: "لائحة" },
  { value: "agreement", label: "اتفاقية" },
  { value: "ruling", label: "حكم قضائي" },
  { value: "research_paper", label: "بحث" },
  { value: "reference", label: "مرجع" },
  { value: "contract_template", label: "نموذج عقد" },
  { value: "memo_template", label: "نموذج مذكرة" },
  { value: "other", label: "أخرى" },
];

const AdminDocumentForm = ({ document, onSuccess }: AdminDocumentFormProps) => {
  const [title, setTitle] = useState(document?.title || "");
  const [description, setDescription] = useState(document?.description || "");
  const [category, setCategory] = useState<DocumentCategory>(document?.category as DocumentCategory || "yemeni_laws");
  const [documentType, setDocumentType] = useState<DocumentType>(document?.document_type as DocumentType || "other");
  const [content, setContent] = useState(document?.content || "");
  const [tags, setTags] = useState(document?.tags?.join(", ") || "");
  const [isDownloadable, setIsDownloadable] = useState(document?.is_downloadable ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("يرجى اختيار ملف PDF أو Word فقط");
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 50 ميجابايت");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("يرجى إدخال عنوان الوثيقة");
      return;
    }

    setLoading(true);

    try {
      let fileUrl = document?.file_url || null;
      let fileName = document?.file_name || null;
      let fileSize = document?.file_size || null;

      // Upload file if new file selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('legal-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('legal-documents')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
        fileName = file.name;
        fileSize = file.size;

        // Delete old file if exists
        if (document?.file_url) {
          const oldFilePath = document.file_url.split('/').pop();
          if (oldFilePath) {
            await supabase.storage.from('legal-documents').remove([oldFilePath]);
          }
        }
      }

      const documentData = {
        title: title.trim(),
        description: description.trim() || null,
        category,
        document_type: documentType,
        content: content.trim() || null,
        tags: tags.trim() ? tags.split(',').map(t => t.trim()).filter(Boolean) : null,
        is_downloadable: isDownloadable,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize,
      };

      if (document) {
        // Update existing document
        const { error } = await supabase
          .from("library_documents")
          .update(documentData)
          .eq("id", document.id);

        if (error) throw error;
        toast.success("تم تحديث الوثيقة بنجاح");
      } else {
        // Create new document
        const { error } = await supabase
          .from("library_documents")
          .insert(documentData);

        if (error) throw error;
        toast.success("تم إضافة الوثيقة بنجاح");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حفظ الوثيقة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-rich-blue">
          <FileText className="w-5 h-5 text-accent-gold" />
          {document ? "تعديل الوثيقة" : "إضافة وثيقة جديدة"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان الوثيقة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">التصنيف *</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as DocumentCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentType">نوع الوثيقة *</Label>
              <Select value={documentType} onValueChange={(v) => setDocumentType(v as DocumentType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">الكلمات المفتاحية</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="قانون, تجاري, شركات (مفصولة بفواصل)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر للوثيقة"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">المحتوى النصي</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="نص الوثيقة أو ملخصها"
              rows={6}
            />
          </div>

          <div className="space-y-4">
            <Label>الملف المرفق (PDF أو Word)</Label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-accent-gold/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {file ? file.name : document?.file_name || "اضغط لاختيار ملف أو اسحب الملف هنا"}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </label>
              {(file || document?.file_url) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                  className="text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="downloadable"
              checked={isDownloadable}
              onCheckedChange={setIsDownloadable}
            />
            <Label htmlFor="downloadable">السماح بتحميل الملف</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onSuccess}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="bg-accent-gold text-rich-blue hover:bg-accent-gold/90"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-rich-blue/30 border-t-rich-blue rounded-full animate-spin"></span>
                  جاري الحفظ...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {document ? "تحديث" : "حفظ"}
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminDocumentForm;
