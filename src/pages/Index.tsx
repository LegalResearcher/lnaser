إليك الكود كاملاً بعد تعديل جميع النصوص، القوائم، والأقسام وفقاً للصيغة النهائية المعتمدة (الآمنة والمهنية)، مع تعديل هيكلية عرض البيانات لتتناسب مع المحتوى الجديد (مثل استبدال الأرقام بالنصوص النوعية في قسم ركائز الأداء).
import { motion } from "framer-motion";
import { Scale, Shield, FileText, Users, Award, Phone, Mail, MapPin, Clock, Target, Eye, Heart, CheckCircle, Briefcase, TrendingUp, Star, MessageSquare, ArrowRight, HelpCircle, Facebook, Twitter, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import logo from "@/assets/logo.png";
import founderImage from "@/assets/founder.jpg";

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

  // تم تعديل الخدمات لتطابق "نطاق خدماتنا"
  const services = [
    {
      icon: Briefcase,
      title: "قطاع الأعمال والشركات",
      items: ["هيكلة وتأسيس الكيانات التجارية", "حوكمة الشراكات واللوائح الداخلية", "الدعم النظامي المستمر للمنشآت", "تسوية المنازعات التجارية"]
    },
    {
      icon: FileText,
      title: "العقود والالتزامات",
      items: ["الصياغة القانونية للعقود التجارية", "تدقيق العقود وسد الثغرات", "تنظيم العلاقات العمالية", "عقود الاستثمار والشراكات الاستراتيجية"]
    },
    {
      icon: Scale,
      title: "الحقوق والمطالبات",
      items: ["دعاوى التعويض وجبر الضرر", "المنازعات العقارية والملكيات", "مباشرة القضايا الحقوقية", "تحصيل المطالبات المالية"]
    },
    {
      icon: Shield,
      title: "القضايا الجزائية",
      items: ["التمثيل النظامي في القضايا الجزائية", "الدفوع والمذكرات الدفاعية", "الحماية القانونية للمتضررين"]
    },
    {
      icon: Users,
      title: "التحكيم والتسويات الودية",
      items: ["التمثيل في منازعات التحكيم", "صياغة مشارطات التحكيم ومذكراتها", "الوساطة والمفاوضات الودية"]
    },
    {
      icon: Award,
      title: "الدراسات والأدلة",
      items: ["إعداد المذكرات والدراسات النافية للجهالة", "فحص المستندات والأسانيد النظامية", "دعم إجراءات التوثيق النظامي"]
    }
  ];

  // تم تعديل القيم
  const values = [
    { icon: Shield, title: "النزاهة", description: "التمسك بأعلى أخلاقيات المهنة، وتقديم المشورة بتجرد ومصداقية." },
    { icon: Heart, title: "الخصوصية والأمان", description: "التعامل مع معلومات العملاء كأمانة مهنية، وفق بروتوكولات صارمة تضمن الخصوصية." },
    { icon: Award, title: "التميز المهني", description: "تطبيق معايير الجودة المؤسسية في صياغة الحلول وإدارة الملفات." },
    { icon: CheckCircle, title: "المسؤولية", description: "بذل العناية اللازمة في المتابعة، والحرص الدائم على رعاية مصالح الموكل." },
    { icon: Eye, title: "الشفافية", description: "الوضوح التام في شرح المسار النظامي، والتقدير العادل للأتعاب." }
  ];

  // تم استبدال "سجل النجاحات الرقمي" بـ "ركائز الأداء والتميز المهني"
  const performancePillars = [
    { 
      icon: Briefcase, 
      category: "المنازعات التجارية والشراكات", 
      description: "إدارة ملفات النزاع التجاري بمنهجية تهدف إلى حماية الأصول واستمرارية الأعمال.",
      highlight: "حلول استراتيجية حاسمة"
    },
    { 
      icon: FileText, 
      category: "الصياغة التعاقدية", 
      description: "صياغة عقود محكمة تُغلق الثغرات القانونية وتحد من المخاطر المستقبلية.",
      highlight: "تحصين وقائي شامل"
    },
    { 
      icon: Scale, 
      category: "الحقوق والمطالبات", 
      description: "تمثيل نظامي فعّال يركز على تأصيل الحقوق والمطالبة بالتعويضات المستحقة.",
      highlight: "مسار مهني دقيق"
    },
    { 
      icon: Shield, 
      category: "الدفاع والتمثيل", 
      description: "مباشرة القضايا الجزائية وفق استراتيجيات دفاعية مبنية على دراسة الثغرات الإجرائية.",
      highlight: "دفاع مهني رصين"
    },
    { 
      icon: Users, 
      category: "الحلول البديلة", 
      description: "تسوية المنازعات عبر قنوات التحكيم والوساطة لتوفير الوقت والجهد.",
      highlight: "تسويات ودية وسريعة"
    },
    { 
      icon: TrendingUp, 
      category: "الرأي والمشورة", 
      description: "تقديم دراسات نافية للجهالة وتوصيات استباقية للأفراد والمنشآت.",
      highlight: "وقاية قبل العلاج"
    }
  ];

  // تم تعديل منهجية العمل
  const howWeWork = [
    { 
      step: "1", 
      title: "التشخيص والتحليل الأولي", 
      description: "دراسة الوقائع بعناية، وفهم أبعاد القضية، لتقديم تكييف نظامي مبدئي يوضح المركز القانوني للعميل." 
    },
    { 
      step: "2", 
      title: "رسم الاستراتيجية والخيارات", 
      description: "إعداد خطة عمل واضحة، واستعراض الخيارات النظامية المتاحة، مع توضيح الفرص والمخاطر المحتملة بشفافية." 
    },
    { 
      step: "3", 
      title: "المباشرة والمتابعة الدورية", 
      description: "البدء في اتخاذ الإجراءات اللازمة وفق الأصول المهنية، مع التزامنا بإبقاء العميل على اطلاع دائم بمستجدات سير العمل." 
    }
  ];

  // تم تعديل الأسئلة الشائعة بالكامل
  const faqItems = [
    { q: "كيف يمكنني حجز موعد للاستشارة؟", a: "يمكنك حجز موعد عبر التواصل المباشر معنا (اتصال أو واتساب). سيقوم فريق التنسيق بترتيب موعد مناسب لجدول أعمالكم لمناقشة تفاصيل الملف." },
    { q: "ما هي آلية تحديد تكلفة الاستشارة؟", a: "نعتمد مبدأ الشفافية؛ لذا نقدم جلسة أولية لتقييم الموقف القانوني، وبناءً على نوع القضية والجهد المقدر، يتم تقديم عرض أتعاب واضح ومفصل قبل البدء بأي إجراء." },
    { q: "ما هي أبرز المجالات التي يغطيها المكتب؟", a: "يشمل نطاق خدماتنا: قطاع الأعمال والشركات، الصياغة التعاقدية، القضايا الحقوقية (المدنية)، التمثيل في القضايا الجزائية (الجنائية)، بالإضافة إلى خدمات التحكيم والوساطة، وأعمال التدقيق القانوني." },
    { q: "هل خدماتكم موجهة للشركات أم الأفراد؟", a: "نقدم خدماتنا لكلا القطاعين. حيث نقدم الدعم المؤسسي للشركات في الجوانب التجارية، ونقدم الرعاية القانونية للأفراد في قضاياهم الخاصة، وفق منهجية تتناسب مع طبيعة كل عميل." },
    { q: "كم تستغرق القضية عادةً حتى تنتهي؟", a: "الإطار الزمني يعتمد على إجراءات المحاكم وطبيعة النزاع. دورنا يكمن في تسريع الإجراءات من جانبنا، ومتابعة سير القضية بدقة، مع التزامنا بوضع العميل في صورة التوقعات الزمنية التقريبية بكل صراحة." },
    { q: "هل معلوماتي محمية وسرية؟", a: "بكل تأكيد. الخصوصية هي ركيزة أساسية في ميثاق عملنا. نلتزم بحفظ كافة المعلومات والمستندات كأمانة مهنية، وعدم مشاركتها إلا في الحدود التي يقتضيها القانون أو بموافقة العميل." },
    { q: "ما هي المتطلبات لبدء العمل على قضية؟", a: "بشكل عام، يلزم توفر الهوية والمستندات ذات الصلة. وفي الجلسة الأولى، سنزودك بقائمة دقيقة للمتطلبات بناءً على التكييف النظامي للقضية لضمان اكتمال الملف." },
    { q: "هل يمكنني التواصل معكم في الحالات الطارئة؟", a: "نحن نقدر أهمية الوقت؛ لذا قمنا بتخصيص قنوات تواصل للحالات المستعجلة خارج ساعات العمل الرسمية، لضمان تقديم الدعم اللازم عند الحاجة القصوى." },
    { q: "كيف يتم تقدير أتعاب القضايا؟", a: "يتم التقدير بناءً على: حجم العمل، نوع الاختصاص، والمدة الزمنية المتوقعة. نحرص دائماً على تقديم عرض مالي عادل ومدروس يضمن حق العميل في معرفة التكاليف مسبقاً دون مفاجآت." },
    { q: "هل تضمنون سلامة العقود التي تقومون بصياغتها؟", a: "نحن نعمل على صياغة عقود محكمة تهدف إلى سد الثغرات القانونية وتقليل المخاطر المستقبلية إلى أدنى حد ممكن، بما يحفظ حقوق الأطراف ويعزز استقرار التعاملات." },
    { q: "ما هي خطوات رفع الدعوى لديكم؟", a: "نبدأ بدراسة جدوى الدعوى وتكييفها نظامياً، ثم إعداد المذكرات وصحيفة الدعوى، وصولاً لتمثيلك أمام الجهات القضائية، ومتابعة تنفيذ الأحكام الصادرة وفق الأصول المرعية." },
    { q: "هل الحل الودّي خيار متاح؟", a: "نعم، بل هو خيارنا الاستراتيجي الأول. نؤمن بفعالية التسويات الودية والتحكيم لتوفير الوقت والجهد، ولا نلجأ للقضاء إلا كخيار أخير لحماية الحقوق." }
  ];

  const testimonials = [
    {
      title: "دقة واحترافية عالية",
      quote: "تعاملهم مُريح جداً. كل التفاصيل القانونية ماشية بالملي، وما نتعب في مراجعتها أو متابعتها. صراحة، نعتبرهم شريك عمل مش محامي بس.",
      author: "أبو خالد، مدير شركة تجارية"
    },
    {
      title: "حلول ذكية وحاسمة",
      quote: "فكّوا تعقيدات القضية. كان نزاع مُتعب وأخذ من وقتي الكثير، وصدقاً، قدرتهم على إنهاء الموضوع بسرعة وبنتيجة مرضية جداً فاجأتني. شغل احترافي وبس.",
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
    <div className="min-h-screen bg-background" dir="rtl">
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
              <h1 className="text-white font-bold text-xl">مكتب الناصر للمحاماة</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <Button variant="outline" className="bg-transparent border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-navy transition-smooth font-bold">
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
              <img 
                src={logo} 
                alt="مكتب الناصر للمحاماة" 
                className="w-32 h-32 md:w-40 md:h-40 mx-auto object-contain filter drop-shadow-2xl"
              />
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
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-bold"
            >
              حلول نظامية برؤية متجددة.. عمادها المعرفة، النزاهة، والعمل المؤسسي.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto"
            >
              نؤمن بأن جودة الخدمة القانونية تبدأ من الفهم العميق والمدروس لمتطلبات العميل، لتقديم حلول استراتيجية مبتكرة تعتمد على دقة التحليل، وكفاءة الأداء، والاحترافية العالية.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg px-8 py-6 transition-elegant">
                طلب استشارة
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-bold text-lg px-8 py-6 transition-elegant">
                نطاق خدماتنا
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

      {/* Value Proposition Section (Why Choose Us) */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <Target className="w-20 h-20 text-accent-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              لأننا نتجاوز الدور التقليدي في تقديم الاستشارة، لنبتكر <span className="font-bold text-accent-gold">حلولاً نظامية واقعية</span>، تُبنى على فهم عميق لأبعاد القضية واستراتيجيات مدروسة، مع التزام تام بالدقة في التنفيذ سعياً لتحقيق أقصى مصلحة ممكنة للموكل.
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
                  الريادة في صياغة المشهد القانوني في اليمن، وتقديم نموذج مؤسسي يحتذى به يجمع بين العراقة النظامية وأحدث الممارسات المهنية العالمية.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 md:p-12 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none">
                <Target className="w-16 h-16 text-rich-blue mb-6" />
                <h3 className="text-3xl font-black text-primary mb-6">رسالتنا</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  تقديم حلول قانونية ذكية ومبتكرة، ترتكز على الكفاءة المعرفية والعمل الجماعي، لبناء شراكات استراتيجية مستدامة مع عملائنا تفوق مفهوم العلاقة التقليدية.
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
              قيمنا الراسخة
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

      {/* Performance Pillars Section (Replacement for Achievements/Numbers) */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Award className="w-16 h-16 text-accent-gold mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              ركائز الأداء والتميز المهني
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              معايير الجودة التي نبني عليها نجاحاتنا
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {performancePillars.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full shadow-card hover:shadow-card-hover transition-elegant bg-white border-none group hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-rich-blue/10 flex items-center justify-center group-hover:bg-rich-blue transition-elegant">
                      <item.icon className="w-7 h-7 text-rich-blue group-hover:text-white transition-elegant" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{item.category}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed h-20">{item.description}</p>
                  <div className="flex items-center gap-2 text-rich-blue font-bold border-t pt-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-accent-gold-dark">{item.highlight}</span>
                  </div>
                </Card>
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
              نطاق خدماتنا
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
              منهجية العمل
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نتبع مساراً مهنياً مدروساً يرتكز على الشفافية والدقة في الإنجاز.
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

      {/* Team/System Section */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              منظومة العمل
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto mb-6" />
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              نؤمن بأن العمل القانوني الناجح وليد العمل الجماعي؛ لذا يعتمد مكتب الناصر على منظومة من الكفاءات القانونية المؤهلة، مدعومة بمستشارين متخصصين وشراكات مهنية، لضمان تقديم الرأي النظامي السديد وحماية مصالح العملاء في مختلف القطاعات.
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
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex-shrink-0">
                  <img 
                    src={founderImage} 
                    alt="أ. معين الناصر" 
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-elegant border-4 border-accent-gold"
                  />
                </div>
                <div className="text-center md:text-right flex-1">
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-3">
                    أ. معين الناصر
                  </h3>
                  <p className="text-xl text-rich-blue font-bold mb-4">المؤسس والمدير التنفيذي</p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    نُقدم خدمات استشارية، ونولي اهتماماً استراتيجياً بمجال التحكيم وفض المنازعات. نلتزم بتقديم حلول قانونية مدروسة، تهدف إلى حماية مصالح العملاء وتعزيز موقفهم النظامي بأعلى معايير المهنية.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-3">الرؤية القيادية:</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      ترسيخ مفهوم العمل المؤسسي القائم على الدقة والنزاهة، وقيادة فريق العمل نحو تقديم حلول نظامية مبتكرة ترتقي بجودة الخدمات الاستشارية.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-rich-blue mb-3">الالتزام المهني:</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      تبني منهجية تعتمد على التحليل النظامي الدقيق، وبذل العناية المهنية اللازمة لتعزيز الموقف القانوني للعملاء والسعي الحثيث لحماية مصالحهم.
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
              </div>
            </Card>
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
              إجابات شفافة حول آلية عملنا وخدماتنا
            </p>
          </motion.div>
          
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl shadow-card border-none px-6">
                  <AccordionTrigger className="text-lg font-bold text-primary hover:text-rich-blue text-right">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              مسارك القانوني الآمن يبدأ بخطوة
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              احصل على تقييم قانوني مبدئي لملفك، ودعنا نتحمل عنك عبء الإجراءات النظامية بمنهجية احترافية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent-gold hover:bg-accent-gold-light text-navy font-bold text-lg px-10 py-6 transition-elegant">
                طلب استشارة
                <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-bold text-lg px-8 py-6 transition-elegant">
                تواصل معنا الآن
              </Button>
            </div>
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
            <p className="text-xl text-muted-foreground">فريقنا على أتم الاستعداد لتقديم الدعم والإجابة على استفساراتكم.</p>
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
      <footer className="bg-navy py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <img src={logo} alt="مكتب الناصر للمحاماة" className="w-16 h-16 object-contain mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">مكتب الناصر للمحاماة والاستشارات القانونية</h3>
            <p className="text-accent-gold text-lg mb-6">أ. معين الناصر - المؤسس والمدير التنفيذي</p>
            <p className="text-white/70 mb-8 font-bold tracking-wider">نزاهة • كفاءة • ريادة</p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mb-10">
              <a 
                href="https://www.facebook.com/share/17jmG5z1Zv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-smooth group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white group-hover:text-accent-gold transition-smooth" />
              </a>
              <a 
                href="https://x.com/Alnasr2024?t=0-fRC0kaJ6N15SWjOAbWwQ&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-smooth group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white group-hover:text-accent-gold transition-smooth" />
              </a>
              <a 
                href="https://t.me/+967772762090" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-smooth group"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 text-white group-hover:text-accent-gold transition-smooth" />
              </a>
            </div>

            {/* Divider */}
            <div className="w-full max-w-2xl h-px bg-white/20 mb-8" />

            {/* Copyright */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              © {new Date().getFullYear()} الناصر تِك للحلول الرقمية (Alnasser Tech Digital Solutions). جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


