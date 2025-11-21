import { Scale, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import lawyerPhoto from "@/assets/lawyer-photo.jpg";

const BusinessCardPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-8">
      {/* Print Button - Hidden when printing */}
      <div className="fixed top-4 right-4 print:hidden z-50">
        <Button
          onClick={handlePrint}
          size="lg"
          className="bg-gradient-accent text-white font-bold shadow-elegant hover:shadow-card-hover"
        >
          طباعة الكرت
        </Button>
      </div>

      <div className="fixed top-4 left-4 print:hidden z-50">
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          size="lg"
          className="font-bold"
        >
          العودة للرئيسية
        </Button>
      </div>

      {/* Business Cards Container */}
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        {/* Front Side */}
        <div className="business-card front-card">
          <div className="relative w-[400px] h-[240px] rounded-2xl shadow-card-hover overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-hero">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent-gold)) 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between">
              {/* Top Section - Logo and Title */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-10 h-10 text-accent-gold" />
                    <div>
                      <h3 className="text-white font-black text-xl leading-tight">
                        مكتب الناصر
                      </h3>
                      <p className="text-accent-gold text-xs font-bold">للمحاماة والاستشارات القانونية</p>
                    </div>
                  </div>
                </div>
                
                {/* Photo */}
                <div className="w-20 h-20 rounded-xl overflow-hidden border-3 border-accent-gold shadow-elegant">
                  <img
                    src={lawyerPhoto}
                    alt="أ. معين الناصر"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Section - Info */}
              <div>
                <h2 className="text-white font-black text-2xl mb-1">أ. معين الناصر</h2>
                <p className="text-accent-gold text-sm font-bold mb-4">محامٍ ومستشار قانوني</p>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Phone className="w-4 h-4 text-accent-gold" />
                    <span className="font-bold">772762090</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin className="w-4 h-4 text-accent-gold" />
                    <span>اليمن - صنعاء</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute inset-0 bg-accent-gold transform -rotate-45 translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="business-card back-card">
          <div className="relative w-[400px] h-[240px] rounded-2xl shadow-card-hover overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-white">
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--navy)) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between">
              {/* Services */}
              <div>
                <h3 className="text-navy font-black text-xl mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-gold"></div>
                  خدماتنا
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rich-blue"></span>
                    القضايا المدنية والتجارية
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rich-blue"></span>
                    القضايا الجنائية
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rich-blue"></span>
                    الاستشارات القانونية
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rich-blue"></span>
                    قضايا الأحوال الشخصية
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-rich-blue" />
                  <span className="font-bold">info@alnasser-law.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-rich-blue" />
                  <span className="font-bold">772762090</span>
                </div>
              </div>

              {/* Logo watermark */}
              <div className="absolute bottom-4 left-4 opacity-10">
                <Scale className="w-20 h-20 text-navy" />
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute top-0 right-0">
              <div className="w-24 h-24 bg-gradient-gold opacity-20 transform rotate-45 translate-x-[50%] translate-y-[-50%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          
          body * {
            visibility: hidden;
          }
          
          .business-card,
          .business-card * {
            visibility: visible;
          }
          
          .business-card {
            position: absolute;
            page-break-after: always;
          }
          
          .front-card {
            left: 10%;
            top: 25%;
          }
          
          .back-card {
            left: 55%;
            top: 25%;
          }
        }
        
        @media screen {
          .business-card {
            animation: fadeIn 0.6s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessCardPage;
