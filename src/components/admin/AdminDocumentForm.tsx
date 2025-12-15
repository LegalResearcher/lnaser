import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Upload, Save, X, FileText, Image, Video, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Document = Tables<"library_documents">;
type DocumentCategory = "yemeni_laws" | "legal_rulings" | "research" | "arab_laws" | "legal_templates";
type DocumentType = "constitution" | "law" | "regulation" | "agreement" | "ruling" | "research_paper" | "reference" | "contract_template" | "memo_template" | "other";
type MediaType = "document" | "image" | "video";
type VideoSource = "youtube" | "facebook" | "vimeo" | "tiktok" | "instagram" | "twitter" | "telegram" | "direct";

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

const videoSources: { value: VideoSource; label: string }[] = [
  { value: "youtube", label: "يوتيوب" },
  { value: "facebook", label: "فيسبوك" },
  { value: "vimeo", label: "فيميو" },
  { value: "tiktok", label: "تيك توك" },
  { value: "instagram", label: "انستغرام" },
  { value: "twitter", label: "تويتر" },
  { value: "telegram", label: "تيليجرام" },
  { value: "direct", label: "رابط مباشر" },
];

const AdminDocumentForm = ({ document, onSuccess }: AdminDocumentFormProps) => {
  const [title, setTitle] = useState(document?.title || "");
  const [description, setDescription] = useState(document?.description || "");
  const [category, setCategory] = useState<DocumentCategory>((document?.category as DocumentCategory) || "yemeni_laws");
  const [documentType, setDocumentType] = useState<DocumentType>((document?.document_type as DocumentType) || "other");
  const [content, setContent] = useState(document?.content || "");
  const [tags, setTags] = useState(document?.tags?.join(", ") || "");
  const [isDownloadable, setIsDownloadable] = useState(document?.is_downloadable ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // New multimedia fields
  const [mediaType, setMediaType] = useState<MediaType>(((document as any)?.media_type as MediaType) || "document");
  const [sourceType, setSourceType] = useState<"upload" | "external">(document?.external_url ? "external" : "upload");
  const [externalUrl, setExternalUrl] = useState((document as any)?.external_url || "");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState((document as any)?.cover_image_url || "");
  const [videoSource, setVideoSource] = useState<VideoSource>(((document as any)?.video_source as VideoSource) || "youtube");
  const [imageUrls, setImageUrls] = useState<string[]>((document as any)?.image_urls || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [ogTitle, setOgTitle] = useState((document as any)?.og_title || "");
  const [ogDescription, setOgDescription] = useState((document as any)?.og_description || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (mediaType === "document") {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error("يرجى اختيار ملف PDF أو Word فقط");
          return;
        }
      } else if (mediaType === "video") {
        if (!selectedFile.type.startsWith('video/')) {
          toast.error("يرجى اختيار ملف فيديو");
          return;
        }
      } else if (mediaType === "image") {
        if (!selectedFile.type.startsWith('image/')) {
          toast.error("يرجى اختيار ملف صورة");
          return;
        }
      }
      
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 100 ميجابايت");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast.error("يرجى اختيار صورة للغلاف");
        return;
      }
      setCoverImage(selectedFile);
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("يرجى إدخال عنوان الوثيقة");
      return;
    }

    if (!coverImageUrl && !coverImage) {
      toast.error("يرجى إضافة صورة الغلاف (مطلوبة للمشاركة)");
      return;
    }

    setLoading(true);

    try {
      let fileUrl = document?.file_url || null;
      let fileName = document?.file_name || null;
      let fileSize = document?.file_size || null;
      let finalCoverImageUrl = coverImageUrl;

      // Upload cover image if new
      if (coverImage) {
        const coverExt = coverImage.name.split('.').pop();
        const coverPath = `covers/${crypto.randomUUID()}.${coverExt}`;

        const { error: coverUploadError } = await supabase.storage
          .from('legal-documents')
          .upload(coverPath, coverImage);

        if (coverUploadError) throw coverUploadError;

        const { data: { publicUrl: coverPublicUrl } } = supabase.storage
          .from('legal-documents')
          .getPublicUrl(coverPath);

        finalCoverImageUrl = coverPublicUrl;
      }

      // Upload file if new file selected and sourceType is upload
      if (file && sourceType === "upload") {
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

      const documentData: Record<string, unknown> = {
        title: title.trim(),
        description: description.trim() || null,
        category,
        document_type: documentType,
        content: content.trim() || null,
        tags: tags.trim() ? tags.split(',').map(t => t.trim()).filter(Boolean) : null,
        is_downloadable: isDownloadable,
        file_url: sourceType === "upload" ? fileUrl : null,
        file_name: sourceType === "upload" ? fileName : null,
        file_size: sourceType === "upload" ? fileSize : null,
        media_type: mediaType,
        external_url: sourceType === "external" ? externalUrl.trim() : null,
        cover_image_url: finalCoverImageUrl,
        video_source: mediaType === "video" ? videoSource : null,
        image_urls: mediaType === "image" ? imageUrls : null,
        og_title: ogTitle.trim() || title.trim(),
        og_description: ogDescription.trim() || description.trim() || null,
      };

      if (document) {
        const { error } = await supabase
          .from("library_documents")
          .update(documentData as any)
          .eq("id", document.id);

        if (error) throw error;
        toast.success("تم تحديث الوثيقة بنجاح");
      } else {
        const { error } = await supabase
          .from("library_documents")
          .insert(documentData as any);

        if (error) throw error;
        toast.success("تم تحديث الوثيقة بنجاح");
      } else {
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
          {/* Basic Info */}
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

          {/* Media Type Selection */}
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <Label className="text-base font-semibold">نوع المحتوى</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={mediaType === "document" ? "default" : "outline"}
                onClick={() => setMediaType("document")}
                className={mediaType === "document" ? "bg-accent-gold text-navy" : ""}
              >
                <FileText className="w-4 h-4 ml-2" />
                مستند
              </Button>
              <Button
                type="button"
                variant={mediaType === "image" ? "default" : "outline"}
                onClick={() => setMediaType("image")}
                className={mediaType === "image" ? "bg-accent-gold text-navy" : ""}
              >
                <Image className="w-4 h-4 ml-2" />
                صور
              </Button>
              <Button
                type="button"
                variant={mediaType === "video" ? "default" : "outline"}
                onClick={() => setMediaType("video")}
                className={mediaType === "video" ? "bg-accent-gold text-navy" : ""}
              >
                <Video className="w-4 h-4 ml-2" />
                فيديو
              </Button>
            </div>
          </div>

          {/* Cover Image (Required for OG Tags) */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">صورة الغلاف * (مطلوبة للمشاركة)</Label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center hover:border-accent-gold/50 transition-colors">
                  <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {coverImage ? coverImage.name : coverImageUrl ? "صورة موجودة" : "اختر صورة الغلاف"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                </div>
              </label>
              {coverImageUrl && (
                <img src={coverImageUrl} alt="الغلاف" className="w-24 h-24 object-cover rounded-lg" />
              )}
            </div>
          </div>

          {/* Source Type Toggle */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">مصدر المحتوى</Label>
            <Tabs value={sourceType} onValueChange={(v) => setSourceType(v as "upload" | "external")}>
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="upload">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع ملف
                </TabsTrigger>
                <TabsTrigger value="external">
                  <LinkIcon className="w-4 h-4 ml-2" />
                  رابط خارجي
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-accent-gold/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : document?.file_name || "اضغط لاختيار ملف"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mediaType === "document" && "PDF, Word"}
                      {mediaType === "image" && "JPG, PNG, WebP"}
                      {mediaType === "video" && "MP4, WebM"}
                    </p>
                    <input
                      type="file"
                      accept={
                        mediaType === "document" ? ".pdf,.doc,.docx" :
                        mediaType === "image" ? "image/*" :
                        "video/*"
                      }
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </label>
              </TabsContent>

              <TabsContent value="external" className="mt-4 space-y-4">
                <Input
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://..."
                  dir="ltr"
                />
                
                {mediaType === "video" && (
                  <div className="space-y-2">
                    <Label>منصة الفيديو</Label>
                    <Select value={videoSource} onValueChange={(v) => setVideoSource(v as VideoSource)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {videoSources.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Image Collection for Image Type */}
          {mediaType === "image" && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">مجموعة الصور (للعقود والوثائق الممسوحة)</Label>
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="رابط الصورة"
                  dir="ltr"
                  className="flex-1"
                />
                <Button type="button" onClick={addImageUrl} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {imageUrls.length > 0 && (
                <div className="space-y-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <img src={url} alt="" className="w-12 h-12 object-cover rounded" />
                      <span className="flex-1 text-sm truncate" dir="ltr">{url}</span>
                      <Button type="button" onClick={() => removeImageUrl(index)} size="icon" variant="ghost" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SEO / OG Tags */}
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <Label className="text-base font-semibold">إعدادات المشاركة (SEO)</Label>
            <p className="text-sm text-muted-foreground">اتركها فارغة لاستخدام العنوان والوصف تلقائياً</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">عنوان المشاركة</Label>
                <Input
                  id="ogTitle"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder={title || "العنوان"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ogDescription">وصف المشاركة</Label>
                <Input
                  id="ogDescription"
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder={description || "الوصف"}
                />
              </div>
            </div>
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
