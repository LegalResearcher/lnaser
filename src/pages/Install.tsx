import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm shadow-elegant">
          <div className="text-center mb-8">
            <motion.img
              src={logo}
              alt="مكتب الناصر"
              className="w-24 h-24 mx-auto mb-6 object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">
              ثبّت تطبيق مكتب الناصر
            </h1>
            <p className="text-lg text-muted-foreground">
              احصل على وصول سريع للخدمات القانونية من شاشتك الرئيسية
            </p>
          </div>

          {isInstalled ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4">
                تم التثبيت بنجاح! 🎉
              </h2>
              <p className="text-muted-foreground mb-6">
                يمكنك الآن استخدام التطبيق من شاشتك الرئيسية
              </p>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold"
              >
                العودة للصفحة الرئيسية
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Smartphone className="w-8 h-8 text-rich-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">يعمل بدون إنترنت</h3>
                    <p className="text-muted-foreground">
                      استخدم التطبيق حتى بدون اتصال بالإنترنت
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Download className="w-8 h-8 text-rich-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">سريع ومباشر</h3>
                    <p className="text-muted-foreground">
                      وصول فوري من شاشتك الرئيسية مثل التطبيقات العادية
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-rich-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">إشعارات فورية</h3>
                    <p className="text-muted-foreground">
                      تلقى إشعارات بالتحديثات والأخبار القانونية المهمة
                    </p>
                  </div>
                </div>
              </div>

              {isIOS ? (
                <div className="bg-accent-gold/10 p-6 rounded-lg border-2 border-accent-gold/30">
                  <h3 className="font-bold text-primary mb-4 text-center">
                    طريقة التثبيت على iPhone/iPad
                  </h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">1.</span>
                      <span>اضغط على زر المشاركة في أسفل المتصفح</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">2.</span>
                      <span>اختر "إضافة إلى الشاشة الرئيسية"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">3.</span>
                      <span>اضغط "إضافة" في الأعلى</span>
                    </li>
                  </ol>
                </div>
              ) : deferredPrompt ? (
                <Button
                  onClick={handleInstallClick}
                  size="lg"
                  className="w-full bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg py-6"
                >
                  <Download className="ml-2 h-6 w-6" />
                  ثبّت التطبيق الآن
                </Button>
              ) : (
                <div className="bg-accent-gold/10 p-6 rounded-lg border-2 border-accent-gold/30">
                  <h3 className="font-bold text-primary mb-4 text-center">
                    طريقة التثبيت على Android
                  </h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">1.</span>
                      <span>اضغط على القائمة (⋮) في أعلى المتصفح</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">2.</span>
                      <span>اختر "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rich-blue">3.</span>
                      <span>اضغط "تثبيت" أو "إضافة"</span>
                    </li>
                  </ol>
                </div>
              )}

              <div className="mt-6 text-center">
                <Button
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary"
                >
                  العودة للصفحة الرئيسية
                </Button>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Install;