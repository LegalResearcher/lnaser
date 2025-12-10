import { motion } from "framer-motion";
import { Scale, Shield, FileText, Users, Award, Phone, Mail, MapPin, Clock, Target, Eye, Heart, CheckCircle, Briefcase, TrendingUp, Star, MessageSquare, ArrowRight, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import logo from "@/assets/logo.png";
import lawyerPhoto from "@/assets/lawyer-photo.jpg";

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
      icon: Briefcase,
      title: "قانون الشركات والأعمال",
      items: ["تأسيس الشركات", "إعداد عقود الشراكات", "المتابعة القانونية للشركات", "حل النزاعات التجارية"]
    },
    {
      icon: FileText,
      title: "العقود والاتفاقيات",
      items: ["صياغة العقود التجارية", "مراجعة العقود وحمايتها قانونياً", "عقود العمل", "عقود الاستثمار والتطوير"]
    },
    {
      icon: Scale,
      title: "القانون المدني",
      items: ["التعويضات", "الدعاوى المدنية", "النزاعات العقارية", "حماية الحقوق المدنية"]
    },
    {
      icon: Shield,
      title: "القانون الجنائي",
      items: ["الترافع في القضايا الجنائية", "الدفاع والتحقيق", "تقديم الاستشارات للمتهمين والمجني عليهم"]
    },
    {
      icon: Users,
      title: "التحكيم وتسوية المنازعات",
      items: ["إدارة جلسات التحكيم", "إعداد مذكرات التحكيم", "الحلول الودية الفعّالة"]
    },
    {
      icon: Award,
      title: "التوثيق والتحقيقات القانونية",
      items: ["توثيق العقود", "إعداد الإقرارات", "جمع الأدلة", "تحليل المستندات"]
    }
  ];

  const values = [
    { icon: Shield, title: "النزاهة", description: "أساس عملنا وجوهر تعاملنا" },
    { icon: Heart, title: "السرية", description: "حماية كاملة لبيانات عملائنا وأسرار قضاياهم" },
    { icon: Award, title: "الاحترافية", description: "خدمات وفق أعلى معايير الجودة" },
    { icon: CheckCircle, title: "الالتزام", description: "المتابعة الدقيقة والتنفيذ المتقن" },
    { icon: Eye, title: "الشفافية", description: "وضوح في الإجراءات والتكاليف" }
  ];

  const achievements = [
    { number: "10+", label: "سنوات من الخبرة" },
    { number: "300+", label: "عقد واتفاقية" },
    { number: "100+", label: "قضية ناجحة" },
    { number: "50+", label: "عميل راضٍ" }
  ];

  const howWeWork = [
    { 
      step: "1", 
      title: "استشارة قانونية شخصية", 
      description: "نستمع إليك بعناية، نفهم تفاصيل قضيتك، ونقدم تحليلاً قانونياً واضحاً" 
    },
    { 
      step: "2", 
      title: "إعداد استراتيجية قانونية", 
      description: "نعد خطة قانونية مكتملة تعتمد على تحليل شامل وتوقعات دقيقة" 
    },
    { 
      step: "3", 
      title: "التنفيذ والمتابعة", 
      description: "نتخذ جميع الإجراءات اللازمة ونتابع سير القضية بشكل مستمر" 
    }
  ];

  const testimonials = [
    {
      title: "دقة واحترافية عالية",
      quote: "تعاملهم مُريح جداً. كل التفاصيل القانونية ماشية بالملي، وما نتعب في مراجعتها أو متابعتها. صراحة، نعتبرهم شريك عمل مش محامي بس.",
      author: "أبو خالد، مدير شركة تجارية"
    },
    {
      title: "حلول ذكية وحاسمة",
      quote: "فكّوا تعقيدات القضية. كان نزاع مُتعب وأخذ من وقتي الكثير، وصدقاً، قدرتهم على إنهاء الموضوع بسرعة وبنتيجة مضمونة فاجأتني. شغل احترافي وبس.",
      author: "أ. ن، مستثمر عقاري"
    },
    {
      title: "حماية واستثمار آمن",
      quote: "النظرة الثاقبة تفرق. استشارتهم المبكرة وفرت عليّ مبلغ كبير وقضية كنت داخل عليها بدون ما أدري. ما يضيع لك حق، وأنصح بالوقاية قبل العلاج معهم.",
      author: "ناصر العمري (صاحب مشروع ناشئ)"
    },
    {
      title: "دعم مستمر وأمان",
      quote: "كلمة الحق، أمان وراحة بال. سرعة الرد والتجاوب كانت تريحني جداً، خاصة في القضايا الحساسة. في فترة التوتر، ما حسيت إني لوحدي أبدًا.",
      author: "س.أ (قضايا الأحوال الشخصية)"
    },
    {
      title: "دفاع حاسم ومهنية مطلقة",
      quote: "في أصعب لحظاتي، كانوا سند. صار تدخلهم في الوقت الحرج، والحمد لله، الشغل النظيف والمهني حمى موقفي وطلعت منها بأقل الخسائر الممكنة.",
      author: "أحد الموكلين السابقين (قضية جنائية)"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <PWAInstallPrompt />
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
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-accent-gold shadow-elegant mx-auto">
                  <img 
                    src={lawyerPhoto} 
                    alt="أ. معين الناصر" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-navy" />
                </div>
              </div>
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
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-bold"
            >
              حلول قانونية بمعايير عالمية… مبنية على الخبرة، النزاهة، والدقة
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto"
            >
              نؤمن بأن العدالة تبدأ بفهمٍ عميق لاحتياجات العميل، وتقديم حلول قانونية مبتكرة تعتمد على الاحترافية والدقة والخبرة المتخصصة
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg px-8 py-6 transition-elegant">
                استشارة قانونية
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

      {/* Value Proposition Section */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <Target className="w-20 h-20 text-accent-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              نحن لا نكتفي بتقديم الاستشارات… بل نقدّم <span className="font-bold text-accent-gold">حلولًا قانونية حقيقية</span> تُبنى على فهم شامل للقضية، واستراتيجيات مدروسة، وتنفيذ فعّال يضمن تحقيق أفضل النتائج
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 md:p-12 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none">
                <Eye className="w-16 h-16 text-rich-blue mb-6" />
                <h3 className="text-3xl font-black text-primary mb-6">رؤيتنا</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  أن نكون واحدًا من أبرز وأقوى المكاتب القانونية في اليمن والمنطقة، من خلال تقديم خدمات قانونية بمعايير عالمية تُسهم في حماية الحقوق وتحقيق العدالة.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 md:p-12 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none">
                <Target className="w-16 h-16 text-rich-blue mb-6" />
                <h3 className="text-3xl font-black text-primary mb-6">رسالتنا</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  تقديم خدمات قانونية عالية الجودة تعتمد على النزاهة، الشفافية، الكفاءة، والخبرة، مع التركيز على بناء علاقة مستمرة وثقة طويلة الأمد مع عملائنا.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              قيمنا
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              المبادئ التي نلتزم بها في كل ما نقوم به
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center h-full shadow-card hover:shadow-card-hover transition-elegant hover:-translate-y-2 bg-white border-none">
                  <value.icon className="w-12 h-12 text-rich-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              إنجازاتنا
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto" />
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-elegant hover:bg-white/20">
                  <TrendingUp className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                  <h3 className="text-4xl md:text-5xl font-black text-accent-gold mb-2">{achievement.number}</h3>
                  <p className="text-white/90 font-bold">{achievement.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              مجالات التخصص
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم خدمات احترافية تغطي أهم المجالات القانونية
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant hover:-translate-y-2 bg-white border-none">
                  <service.icon className="w-16 h-16 text-rich-blue mb-6" />
                  <h3 className="text-xl font-bold text-primary mb-6">{service.title}</h3>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              كيف نعمل
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نتبع منهجية احترافية لضمان تحقيق أفضل النتائج
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {howWeWork.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant hover:-translate-y-2 bg-white border-none relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-gold opacity-10 rounded-bl-full" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-6">
                      <span className="text-3xl font-black text-accent-gold">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              فريقنا
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto mb-6" />
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              يضم مكتب الناصر نخبة من المحامين والمستشارين القانونيين المتخصصين في مختلف فروع القانون، بخبرة تتراوح بين <span className="font-bold text-accent-gold">10 إلى 20 عامًا</span>، ويتمتع كل منهم بخبرة عميقة في مجاله
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Lawyer Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              المؤسس والمدير التنفيذي
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto" />
          </motion.div>
          
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12 shadow-elegant bg-white border-none">
              <div className="text-center md:text-right">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-3">
                    أ. معين الناصر – محامٍ ومستشار قانوني
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    حاصل على بكالوريوس شريعة وقانون من جامعة صنعاء، ويقود مكتب الناصر لتقديم خدمات قانونية مهنية ترتكز على الجودة والالتزام والمعايير العالمية في الأداء القانوني.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-4">مجالات التخصص:</h4>
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>محامٍ ومستشار قانوني لعدد من الشركات التجارية المحلية</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>محكّم قانوني مشارك في عدد من القضايا التجارية والمدنية</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>متخصص في القضايا التجارية، الضريبية، المصرفية، إضافة إلى القضايا المدنية والجنائية والعمالية</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>إعداد وصياغة العقود التجارية والعمالية والمدنية وتفسيرها وتكييفها</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-rich-blue flex-shrink-0 mt-0.5" />
                        <span>مشارك في عدد من الندوات والفعاليات القانونية والحقوقية</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-3">رؤيته القيادية:</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      الارتقاء بالخدمات القانونية في المكتب من خلال الدقة، النزاهة، والعمل المؤسسي، وتقديم حلول قانونية مبتكرة وفعّالة.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-3">التزامه الشخصي:</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      تقديم خدمات قانونية تعتمد على التحليل الدقيق والاستراتيجية المحكمة، مع متابعة مستمرة لضمان حماية حقوق العملاء وتحقيق أفضل النتائج.
                    </p>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-4">التواصل:</h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-rich-blue" />
                        <span className="font-bold">اليمن - صنعاء</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                        <Phone className="w-5 h-5 text-rich-blue" />
                        <a href="tel:+967772762090" className="font-bold hover:text-rich-blue transition-smooth">
                          +967772762090
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Successful Cases Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Award className="w-16 h-16 text-accent-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              سجل النجاحات القانونية
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              إنجازات تعكس خبرتنا وتفانينا في حماية حقوق عملائنا
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          >
            {[
              { 
                icon: Briefcase, 
                category: "القضايا التجارية", 
                count: "45+", 
                description: "نزاعات تجارية وشراكات تم حلها بنجاح",
                highlight: "نسبة نجاح 92%"
              },
              { 
                icon: FileText, 
                category: "العقود والاتفاقيات", 
                count: "300+", 
                description: "عقد تجاري ومدني تمت صياغته ومراجعته",
                highlight: "حماية قانونية كاملة"
              },
              { 
                icon: Scale, 
                category: "القضايا المدنية", 
                count: "35+", 
                description: "قضية مدنية وتعويضات تم الفصل فيها",
                highlight: "استرداد الحقوق"
              },
              { 
                icon: Shield, 
                category: "القضايا الجنائية", 
                count: "20+", 
                description: "قضية جنائية تم الدفاع فيها بنجاح",
                highlight: "دفاع قوي ومهني"
              },
              { 
                icon: Users, 
                category: "التحكيم والوساطة", 
                count: "25+", 
                description: "نزاع تم حله عبر التحكيم والوساطة",
                highlight: "حلول سريعة وفعّالة"
              },
              { 
                icon: TrendingUp, 
                category: "الاستشارات القانونية", 
                count: "500+", 
                description: "استشارة قانونية قدمت للشركات والأفراد",
                highlight: "وقاية قبل العلاج"
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none group hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-rich-blue/10 flex items-center justify-center group-hover:bg-rich-blue transition-elegant">
                      <item.icon className="w-7 h-7 text-rich-blue group-hover:text-white transition-elegant" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{item.category}</h3>
                      <span className="text-3xl font-black text-accent-gold">{item.count}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2 text-rich-blue font-bold">
                    <CheckCircle className="w-5 h-5" />
                    <span>{item.highlight}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats */}
          <motion.div {...fadeInUp} className="bg-gradient-hero rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "925+", label: "قضية ومعاملة" },
                { number: "90%", label: "نسبة النجاح" },
                { number: "50+", label: "عميل راضٍ" },
                { number: "10+", label: "سنوات خبرة" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-black text-accent-gold mb-2">{stat.number}</div>
                  <div className="text-white/90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              شهادات العملاء
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              آراء عملائنا تعكس التزامنا بالجودة والاحترافية
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none">
                  <MessageSquare className="w-12 h-12 text-rich-blue mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-4">{testimonial.title}</h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                  </div>
                  <p className="text-primary font-bold text-sm">— {testimonial.author}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <HelpCircle className="w-16 h-16 text-rich-blue mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              الأسئلة الشائعة
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              إجابات على أكثر الأسئلة شيوعاً حول خدماتنا القانونية
            </p>
          </motion.div>
          
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  كيف يمكنني حجز استشارة قانونية؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  يمكنك حجز استشارة قانونية عبر التواصل معنا مباشرة عبر الواتساب أو الاتصال بنا على الرقم المخصص. سنقوم بتحديد موعد مناسب لمناقشة قضيتك بالتفصيل.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  ما هي تكلفة الاستشارة القانونية الأولية؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  تختلف تكلفة الاستشارة حسب نوع القضية وتعقيدها. نقدم استشارة أولية لتقييم القضية، وبعدها يتم تحديد التكلفة بشكل شفاف وواضح قبل البدء في أي إجراءات.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  ما هي مجالات القانون التي تتخصصون فيها؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  نتخصص في مجالات متعددة تشمل: قانون الشركات والأعمال، العقود والاتفاقيات، القانون المدني، القانون الجنائي، التحكيم وتسوية المنازعات، بالإضافة إلى التوثيق والتحقيقات القانونية.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  هل تقدمون خدمات للشركات والأفراد؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  نعم، نقدم خدماتنا القانونية لكل من الشركات والأفراد. لدينا خبرة واسعة في التعامل مع القضايا التجارية للشركات وكذلك القضايا الشخصية والأحوال المدنية للأفراد.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  كم من الوقت تستغرق القضية عادةً؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  تختلف مدة القضية حسب نوعها وتعقيدها. بعض القضايا قد تُحل في أسابيع، بينما قد تستغرق قضايا أخرى شهوراً. نحرص على إبقائك على اطلاع دائم بتطورات قضيتك ونعمل على إنهائها في أسرع وقت ممكن.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  هل معلوماتي ستبقى سرية؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  بالتأكيد، السرية التامة هي من أهم قيمنا. جميع المعلومات التي تشاركها معنا محمية بالكامل ولا يتم الإفصاح عنها لأي طرف ثالث تحت أي ظرف من الظروف.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  ما هي المستندات المطلوبة لبدء القضية؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  تختلف المستندات المطلوبة حسب نوع القضية. بشكل عام، ستحتاج إلى الهوية الشخصية، والعقود أو الوثائق ذات الصلة بالقضية. سنرشدك خلال الاستشارة الأولية إلى كافة المستندات اللازمة.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  هل يمكنني التواصل معكم في أي وقت؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  نعم، نحرص على التواصل المستمر مع عملائنا. يمكنك التواصل معنا خلال ساعات العمل الرسمية، وفي الحالات الطارئة يمكنك التواصل عبر الواتساب وسنرد عليك في أقرب وقت ممكن.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  كيف يتم تحديد أتعاب المحاماة؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  يتم تحديد الأتعاب بناءً على عدة عوامل منها: نوع القضية، درجة تعقيدها، الوقت والجهد المتوقع، ومرحلة التقاضي. نقدم لك عرض أتعاب واضح ومفصل قبل البدء في العمل مع ضمان الشفافية التامة.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  هل تقدمون خدمة صياغة العقود؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  نعم، نقدم خدمات متكاملة في صياغة ومراجعة العقود التجارية والمدنية والعمالية. نحرص على حماية حقوقك وضمان سلامة العقد من الناحية القانونية قبل التوقيع.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-11" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  ما هي إجراءات رفع دعوى قضائية؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  تبدأ الإجراءات بدراسة القضية وتقييم فرص النجاح، ثم إعداد صحيفة الدعوى وتقديمها للمحكمة المختصة. نتولى جميع الإجراءات نيابة عنك من التسجيل حتى صدور الحكم ومتابعة التنفيذ.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-12" className="bg-white rounded-xl shadow-card border-none px-6">
                <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                  هل يمكن حل النزاع دون اللجوء للمحكمة؟
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  نعم، نسعى دائماً للحلول الودية أولاً من خلال التفاوض أو الوساطة أو التحكيم. هذه الطرق غالباً ما تكون أسرع وأقل تكلفة. في حال فشل الحلول الودية، نلجأ للقضاء لحماية حقوقك.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              حماية حقوقك تبدأ هنا
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              احصل على استشارة قانونية أولية، ودعنا نتولى كل التفاصيل
            </p>
            <Button size="lg" className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg px-10 py-6 transition-elegant">
              استشارة قانونية
              <ArrowRight className="mr-2 w-5 h-5" />
            </Button>
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
              { icon: Phone, title: "الجوال", value: "+967772762090", link: "tel:+967772762090" },
              { icon: Phone, title: "واتس آب", value: "+967772762090", link: "https://wa.me/967772762090" },
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
