import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Check if user is admin
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          if (roles) {
            navigate('/admin');
          }
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (roles) {
          navigate('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("بيانات الدخول غير صحيحة");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        // Check if user is admin
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (roles) {
          toast.success("تم تسجيل الدخول بنجاح");
          navigate('/admin');
        } else {
          toast.error("ليس لديك صلاحيات الوصول للوحة التحكم");
          await supabase.auth.signOut();
        }
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-blue via-rich-blue/95 to-rich-blue flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md border-accent-gold/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-gold/80 rounded-2xl flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-rich-blue" />
          </div>
          <CardTitle className="text-2xl font-bold text-rich-blue">لوحة التحكم</CardTitle>
          <CardDescription className="text-muted-foreground">
            تسجيل الدخول لإدارة المكتبة القانونية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-rich-blue font-medium">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 text-left"
                  placeholder="admin@example.com"
                  dir="ltr"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-rich-blue font-medium">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 text-left"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-accent-gold to-accent-gold/90 text-rich-blue font-bold hover:from-accent-gold/90 hover:to-accent-gold/80 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-rich-blue/30 border-t-rich-blue rounded-full animate-spin"></span>
                  جاري تسجيل الدخول...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  دخول
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
