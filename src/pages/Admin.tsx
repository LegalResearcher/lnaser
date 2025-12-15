import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Plus, Library, FileText, Settings } from "lucide-react";
import { User } from "@supabase/supabase-js";
import AdminDocumentList from "@/components/admin/AdminDocumentList";
import AdminDocumentForm from "@/components/admin/AdminDocumentForm";
import { Tables } from "@/integrations/supabase/types";

type Document = Tables<"library_documents">;

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      // Verify admin role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        toast.error("ليس لديك صلاحيات الوصول");
        await supabase.auth.signOut();
        navigate('/auth');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate('/auth');
  };

  const handleEdit = (document: Document) => {
    setEditingDocument(document);
    setView("edit");
  };

  const handleFormSuccess = () => {
    setView("list");
    setEditingDocument(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      {/* Header */}
      <header className="bg-rich-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-gold rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-rich-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold">لوحة التحكم</h1>
              <p className="text-sm text-white/70">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-3">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              onClick={() => { setView("list"); setEditingDocument(null); }}
              className={view === "list" ? "bg-accent-gold text-rich-blue hover:bg-accent-gold/90" : ""}
            >
              <Library className="w-4 h-4 ml-2" />
              الوثائق
            </Button>
            <Button
              variant={view === "add" ? "default" : "ghost"}
              onClick={() => { setView("add"); setEditingDocument(null); }}
              className={view === "add" ? "bg-accent-gold text-rich-blue hover:bg-accent-gold/90" : ""}
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة وثيقة
            </Button>
            <div className="flex-1"></div>
            <Button
              variant="outline"
              onClick={() => navigate('/library')}
              className="border-rich-blue/30 text-rich-blue"
            >
              <FileText className="w-4 h-4 ml-2" />
              عرض المكتبة
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {view === "list" && (
          <AdminDocumentList onEdit={handleEdit} />
        )}
        {view === "add" && (
          <AdminDocumentForm onSuccess={handleFormSuccess} />
        )}
        {view === "edit" && editingDocument && (
          <AdminDocumentForm document={editingDocument} onSuccess={handleFormSuccess} />
        )}
      </main>
    </div>
  );
};

export default Admin;
