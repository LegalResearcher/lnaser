import { motion } from "framer-motion";
import { Book, Scale, FileText, Globe, Calculator, Files, Download, Eye, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import logo from "@/assets/logo.png";
import InheritanceCalculator from "@/components/library/InheritanceCalculator";
import DocumentViewer from "@/components/library/DocumentViewer";
import DocumentCard from "@/components/library/DocumentCard";

type LibraryCategory = 'yemeni_laws' | 'legal_rulings' | 'research' | 'arab_laws' | 'legal_templates';

const categories = [
  { id: 'yemeni_laws' as LibraryCategory, title: 'التشريعات والقوانين اليمنية', icon: Scale, description: 'الدستور، القوانين، اللوائح، الاتفاقيات' },
  { id: 'legal_rulings' as LibraryCategory, title: 'قواعد وأحكام قانونية وقضائية', icon: FileText, description: 'أحكام قضائية ومبادئ قانونية' },
  { id: 'research' as LibraryCategory, title: 'بحوث ومراجع', icon: Book, description: 'دراسات وأبحاث قانونية' },
  { id: 'arab_laws' as LibraryCategory, title: 'تشريعات وقوانين عربية', icon: Globe, description: 'قوانين الدول العربية' },
  { id: 'legal_templates' as LibraryCategory, title: 'النماذج القانونية', icon: Files, description: 'عقود، مذكرات، نماذج قابلة للتحميل' },
];

const LegalLibrary = () => {
  const [activeCategory, setActiveCategory] = useState<LibraryCategory | 'calculator'>('yemeni_laws');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const { data: documents, isLoading } = useQuery({
    queryKey: ['library-documents', activeCategory, searchQuery],
    queryFn: async () => {
      if (activeCategory === 'calculator') return [];
      
      let query = supabase
        .from('library_documents')
        .select('*')
        .eq('category', activeCategory)
        .order('created_at', { ascending: false });
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: activeCategory !== 'calculator'
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingWhatsAppButton />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-navy/95 backdrop-blur-sm shadow-elegant z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                <img src={logo} alt="مكتب الناصر للمحاماة" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <h1 className="text-white font-bold text-xl">مكتب الناصر للمحاماة</h1>
            </Link>
            <Link to="/">
              <Button variant="outline" className="bg-transparent border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-navy transition-smooth gap-2">
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent-gold)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Book className="w-16 h-16 text-accent-gold" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              المكتبة القانونية
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              مرجعك الشامل للتشريعات والقوانين والأبحاث القانونية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث في المكتبة القانونية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 py-6 text-lg bg-white border-border"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-28 bg-white border-none shadow-card">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                  <Book className="w-5 h-5 text-accent-gold" />
                  أقسام المكتبة
                </h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl text-right transition-smooth ${
                        activeCategory === category.id
                          ? 'bg-accent-gold/10 text-rich-blue border-r-4 border-accent-gold'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <category.icon className={`w-5 h-5 ${activeCategory === category.id ? 'text-accent-gold' : ''}`} />
                      <span className="font-medium text-sm">{category.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveCategory('calculator')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-right transition-smooth ${
                      activeCategory === 'calculator'
                        ? 'bg-accent-gold/10 text-rich-blue border-r-4 border-accent-gold'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Calculator className={`w-5 h-5 ${activeCategory === 'calculator' ? 'text-accent-gold' : ''}`} />
                    <span className="font-medium text-sm">حاسبة المواريث</span>
                  </button>
                </nav>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {activeCategory === 'calculator' ? (
                <InheritanceCalculator />
              ) : (
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-primary">
                        {categories.find(c => c.id === activeCategory)?.title}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {categories.find(c => c.id === activeCategory)?.description}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {documents?.length || 0} وثيقة
                    </div>
                  </div>

                  {/* Documents Grid */}
                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="p-6 animate-pulse bg-white border-none">
                          <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                          <div className="h-4 bg-muted rounded w-full mb-2" />
                          <div className="h-4 bg-muted rounded w-2/3" />
                        </Card>
                      ))}
                    </div>
                  ) : documents && documents.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {documents.map((doc) => (
                        <DocumentCard 
                          key={doc.id} 
                          document={doc} 
                          onView={() => setSelectedDocument(doc.file_url)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-16 text-center bg-white border-none">
                      <Files className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-primary mb-2">لا توجد وثائق</h3>
                      <p className="text-muted-foreground">
                        سيتم إضافة المحتوى قريباً
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer 
          url={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}

      {/* Footer */}
      <footer className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">
            © {new Date().getFullYear()} الناصر تِك للحلول الرقمية. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalLibrary;
