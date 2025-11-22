import { motion } from "framer-motion";
import { Scale, Shield, FileText, Users, Award, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import lawyerPhoto from "@/assets/lawyer-photo.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      icon: Scale,
      title: "القضايا المدنية والتجارية",
      description: "تمثيل شامل في جميع أنواع القضايا المدنية والتجارية مع خبرة واسعة في تحقيق أفضل النتائج"
    },
    {
      icon: Shield,
      title: "القضايا الجنائية",
      description: "دفاع قوي ومحترف في القضايا الجنائية بكافة أنواعها مع حماية كاملة لحقوقك القانونية"
    },
    {
      icon: FileText,
      title: "الاستشارات القانونية",
      description: "استشارات قانونية متخصصة ودقيقة تساعدك على اتخاذ القرارات الصحيحة"
    },
    {
      icon: Users,
      title: "قضايا الأحوال الشخصية",
      description: "خبرة عميقة في قضايا الأسرة والأحوال الشخصية بتعامل راقٍ ومهني"
    }
  ];

  const features = [
    {
      icon: Award,
      title: "خبرة واسعة",
      description: "سنوات من الخبرة في مجال المحاماة والقانون"
    },
    {
      icon: Shield,
      title: "مصداقية عالية",
      description: "نلتزم بأعلى معايير الشفافية والمصداقية"
    },
    {
      icon: Users,
      title: "فريق محترف",
      description: "فريق من المحامين المتخصصين في كافة المجالات"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PWAInstallPrompt />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-navy/95 backdrop-blur-sm shadow-elegant z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="مكتب الناصر للمحاماة" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-white font-bold text-xl">مكتب الناصر للمحاماة</h1>
                <p className="text-accent-gold text-sm">أ. معين الناصر</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <Button variant="outline" className="bg-transparent border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-navy transition-smooth">
                تواصل معنا
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent-gold)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Scale className="w-24 h-24 text-accent-gold mx-auto mb-8 filter drop-shadow-lg" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              مكتب الناصر
              <br />
              <span className="text-gradient-gold">للمحاماة والاستشارات القانونية</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-2xl md:text-3xl text-white/90 font-bold mb-2">أ. معين الناصر</p>
              <p className="text-lg md:text-xl text-white/80">محامٍ ومستشار قانوني</p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
            >
              نقدم خدمات قانونية احترافية متكاملة بأعلى معايير الجودة والمصداقية
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg px-8 py-6 transition-elegant">
                استشارة قانونية مجانية
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-bold text-lg px-8 py-6 transition-elegant">
                تعرف على خدماتنا
              </Button>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              خدماتنا القانونية
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لخدمة عملائنا
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant hover:-translate-y-2 bg-white border-none">
                  <service.icon className="w-16 h-16 text-rich-blue mb-6" />
                  <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Lawyer Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              عن المحامي
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto" />
          </motion.div>
          
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12 shadow-elegant bg-white border-none">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-card border-4 border-accent-gold">
                    <img 
                      src={lawyerPhoto} 
                      alt="أ. معين الناصر" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-3">
                    أ. معين الناصر
                  </h3>
                  <p className="text-xl text-rich-blue font-bold mb-6">
                    محامٍ ومستشار قانوني
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    محامٍ متخصص في القضايا المدنية والجنائية والتجارية، مع خبرة واسعة في تقديم الاستشارات القانونية وتمثيل العملاء أمام المحاكم اليمنية. نلتزم بتقديم خدمات قانونية احترافية تتسم بالجودة والمصداقية.
                  </p>
                  <div className="flex flex-col gap-3 mt-8">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-rich-blue" />
                      <span className="font-bold">اليمن - صنعاء</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                      <Phone className="w-5 h-5 text-rich-blue" />
                      <a href="tel:+967772762090" className="font-bold hover:text-rich-blue transition-smooth">
                        772762090
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              لماذا تختار مكتب الناصر؟
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto" />
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-elegant hover:bg-white/20">
                  <feature.icon className="w-16 h-16 text-accent-gold mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              تواصل معنا
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">نحن هنا لخدمتك والإجابة على استفساراتك</p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Phone, title: "الهاتف", value: "772762090", link: "tel:+967772762090" },
              { icon: Mail, title: "البريد الإلكتروني", value: "info@alnasser-law.com", link: "mailto:info@alnasser-law.com" },
              { icon: MapPin, title: "العنوان", value: "اليمن - صنعاء" },
              { icon: Clock, title: "ساعات العمل", value: "السبت - الخميس، 9 صباحاً - 5 مساءً" }
            ].map((contact, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center shadow-card hover:shadow-card-hover transition-elegant hover:-translate-y-2 bg-white border-none">
                  <contact.icon className="w-12 h-12 text-rich-blue mx-auto mb-4" />
                  <h3 className="font-bold text-primary mb-2">{contact.title}</h3>
                  {contact.link ? (
                    <a 
                      href={contact.link}
                      className="text-muted-foreground text-sm hover:text-rich-blue transition-smooth"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{contact.value}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <Scale className="w-12 h-12 text-accent-gold mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">مكتب الناصر للمحاماة والاستشارات القانونية</h3>
            <p className="text-accent-gold text-lg mb-6">أ. معين الناصر</p>
            <p className="text-white/70 mb-8">احترافية • مصداقية • تميز</p>
            <p className="text-white/50 text-sm">
              جميع الحقوق محفوظة © {new Date().getFullYear()} مكتب الناصر للمحاماة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
