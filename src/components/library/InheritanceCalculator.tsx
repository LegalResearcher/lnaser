import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Users, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Heir {
  id: string;
  name: string;
  nameAr: string;
  count: number;
  enabled: boolean;
}

interface InheritanceResult {
  heir: string;
  share: string;
  amount: number;
  explanation: string;
}

const InheritanceCalculator = () => {
  const [estateValue, setEstateValue] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);
  const [wasiyyah, setWasiyyah] = useState<number>(0);
  const [results, setResults] = useState<InheritanceResult[]>([]);
  const [calculated, setCalculated] = useState(false);

  const [heirs, setHeirs] = useState<Heir[]>([
    { id: 'husband', name: 'Husband', nameAr: 'الزوج', count: 0, enabled: false },
    { id: 'wife', name: 'Wife', nameAr: 'الزوجة/الزوجات', count: 0, enabled: false },
    { id: 'father', name: 'Father', nameAr: 'الأب', count: 0, enabled: false },
    { id: 'mother', name: 'Mother', nameAr: 'الأم', count: 0, enabled: false },
    { id: 'son', name: 'Son', nameAr: 'الابن/الأبناء', count: 0, enabled: false },
    { id: 'daughter', name: 'Daughter', nameAr: 'البنت/البنات', count: 0, enabled: false },
    { id: 'brother', name: 'Full Brother', nameAr: 'الأخ الشقيق', count: 0, enabled: false },
    { id: 'sister', name: 'Full Sister', nameAr: 'الأخت الشقيقة', count: 0, enabled: false },
    { id: 'grandfather', name: 'Grandfather', nameAr: 'الجد', count: 0, enabled: false },
    { id: 'grandmother', name: 'Grandmother', nameAr: 'الجدة', count: 0, enabled: false },
  ]);

  const toggleHeir = (id: string) => {
    setHeirs(heirs.map(h => 
      h.id === id ? { ...h, enabled: !h.enabled, count: !h.enabled ? 1 : 0 } : h
    ));
  };

  const updateHeirCount = (id: string, count: number) => {
    setHeirs(heirs.map(h => 
      h.id === id ? { ...h, count: Math.max(0, count) } : h
    ));
  };

  const calculateInheritance = () => {
    const netEstate = estateValue - debts - Math.min(wasiyyah, estateValue / 3);
    if (netEstate <= 0) {
      setResults([{ heir: 'خطأ', share: '0', amount: 0, explanation: 'صافي التركة يجب أن يكون أكبر من الصفر' }]);
      setCalculated(true);
      return;
    }

    const newResults: InheritanceResult[] = [];
    let remainingEstate = netEstate;

    const enabledHeirs = heirs.filter(h => h.enabled && h.count > 0);
    const hasSon = enabledHeirs.some(h => h.id === 'son');
    const hasDaughter = enabledHeirs.some(h => h.id === 'daughter');
    const hasChildren = hasSon || hasDaughter;
    const hasFather = enabledHeirs.some(h => h.id === 'father');
    const hasMother = enabledHeirs.some(h => h.id === 'mother');

    // Spouse shares (فرض)
    const husband = enabledHeirs.find(h => h.id === 'husband');
    const wife = enabledHeirs.find(h => h.id === 'wife');

    if (husband) {
      const share = hasChildren ? 1/4 : 1/2;
      const amount = netEstate * share;
      newResults.push({
        heir: 'الزوج',
        share: hasChildren ? '¼' : '½',
        amount,
        explanation: hasChildren ? 'الربع لوجود الفرع الوارث' : 'النصف لعدم وجود الفرع الوارث'
      });
      remainingEstate -= amount;
    }

    if (wife && wife.count > 0) {
      const share = hasChildren ? 1/8 : 1/4;
      const totalAmount = netEstate * share;
      const perWife = totalAmount / wife.count;
      newResults.push({
        heir: wife.count > 1 ? `الزوجات (${wife.count})` : 'الزوجة',
        share: hasChildren ? '⅛' : '¼',
        amount: totalAmount,
        explanation: hasChildren 
          ? `الثمن لوجود الفرع الوارث${wife.count > 1 ? ` (يقسم بينهن بالتساوي - ${perWife.toFixed(2)} لكل واحدة)` : ''}`
          : `الربع لعدم وجود الفرع الوارث${wife.count > 1 ? ` (يقسم بينهن بالتساوي - ${perWife.toFixed(2)} لكل واحدة)` : ''}`
      });
      remainingEstate -= totalAmount;
    }

    // Parents shares
    const father = enabledHeirs.find(h => h.id === 'father');
    const mother = enabledHeirs.find(h => h.id === 'mother');

    if (mother) {
      const siblings = enabledHeirs.filter(h => ['brother', 'sister'].includes(h.id))
        .reduce((sum, h) => sum + h.count, 0);
      const share = hasChildren || siblings >= 2 ? 1/6 : 1/3;
      const amount = netEstate * share;
      newResults.push({
        heir: 'الأم',
        share: hasChildren || siblings >= 2 ? '⅙' : '⅓',
        amount,
        explanation: hasChildren 
          ? 'السدس لوجود الفرع الوارث' 
          : siblings >= 2 
            ? 'السدس لوجود إخوة' 
            : 'الثلث لعدم وجود فرع وارث أو إخوة'
      });
      remainingEstate -= amount;
    }

    if (father && hasChildren) {
      const amount = netEstate * (1/6);
      newResults.push({
        heir: 'الأب',
        share: '⅙',
        amount,
        explanation: 'السدس فرضاً لوجود الفرع الوارث'
      });
      remainingEstate -= amount;
    }

    // Children (تعصيب)
    const sons = enabledHeirs.find(h => h.id === 'son');
    const daughters = enabledHeirs.find(h => h.id === 'daughter');

    if (sons || daughters) {
      const sonCount = sons?.count || 0;
      const daughterCount = daughters?.count || 0;
      
      if (sonCount > 0) {
        // Sons and daughters share: male gets double female share
        const totalParts = (sonCount * 2) + daughterCount;
        const perPart = remainingEstate / totalParts;
        
        if (sonCount > 0) {
          newResults.push({
            heir: sonCount > 1 ? `الأبناء (${sonCount})` : 'الابن',
            share: 'تعصيب',
            amount: perPart * 2 * sonCount,
            explanation: `للذكر مثل حظ الأنثيين - ${(perPart * 2).toFixed(2)} لكل ابن`
          });
        }
        
        if (daughterCount > 0) {
          newResults.push({
            heir: daughterCount > 1 ? `البنات (${daughterCount})` : 'البنت',
            share: 'تعصيب',
            amount: perPart * daughterCount,
            explanation: `للذكر مثل حظ الأنثيين - ${perPart.toFixed(2)} لكل بنت`
          });
        }
        remainingEstate = 0;
      } else if (daughterCount > 0) {
        // Only daughters
        if (daughterCount === 1) {
          const amount = netEstate * (1/2);
          newResults.push({
            heir: 'البنت',
            share: '½',
            amount,
            explanation: 'النصف للبنت الواحدة'
          });
          remainingEstate -= amount;
        } else {
          const amount = netEstate * (2/3);
          newResults.push({
            heir: `البنات (${daughterCount})`,
            share: '⅔',
            amount,
            explanation: `الثلثان للبنتين فأكثر - ${(amount/daughterCount).toFixed(2)} لكل بنت`
          });
          remainingEstate -= amount;
        }
      }
    }

    // Father as asabah (if no sons)
    if (father && !hasSon && remainingEstate > 0) {
      newResults.push({
        heir: 'الأب (تعصيب)',
        share: 'الباقي',
        amount: remainingEstate,
        explanation: 'الباقي تعصيباً لعدم وجود ابن'
      });
      remainingEstate = 0;
    }

    // Brothers/Sisters if no children and no father
    if (!hasChildren && !hasFather && remainingEstate > 0) {
      const brothers = enabledHeirs.find(h => h.id === 'brother');
      const sisters = enabledHeirs.find(h => h.id === 'sister');
      
      if (brothers || sisters) {
        const brotherCount = brothers?.count || 0;
        const sisterCount = sisters?.count || 0;
        
        if (brotherCount > 0) {
          const totalParts = (brotherCount * 2) + sisterCount;
          const perPart = remainingEstate / totalParts;
          
          newResults.push({
            heir: brotherCount > 1 ? `الإخوة الأشقاء (${brotherCount})` : 'الأخ الشقيق',
            share: 'تعصيب',
            amount: perPart * 2 * brotherCount,
            explanation: `للذكر مثل حظ الأنثيين - ${(perPart * 2).toFixed(2)} لكل أخ`
          });
          
          if (sisterCount > 0) {
            newResults.push({
              heir: sisterCount > 1 ? `الأخوات الشقيقات (${sisterCount})` : 'الأخت الشقيقة',
              share: 'تعصيب',
              amount: perPart * sisterCount,
              explanation: `للذكر مثل حظ الأنثيين - ${perPart.toFixed(2)} لكل أخت`
            });
          }
          remainingEstate = 0;
        } else if (sisterCount > 0) {
          if (sisterCount === 1) {
            const amount = Math.min(remainingEstate, netEstate * (1/2));
            newResults.push({
              heir: 'الأخت الشقيقة',
              share: '½',
              amount,
              explanation: 'النصف للأخت الواحدة'
            });
            remainingEstate -= amount;
          } else {
            const amount = Math.min(remainingEstate, netEstate * (2/3));
            newResults.push({
              heir: `الأخوات الشقيقات (${sisterCount})`,
              share: '⅔',
              amount,
              explanation: `الثلثان للأختين فأكثر - ${(amount/sisterCount).toFixed(2)} لكل أخت`
            });
            remainingEstate -= amount;
          }
        }
      }
    }

    if (newResults.length === 0) {
      newResults.push({
        heir: 'تنبيه',
        share: '-',
        amount: 0,
        explanation: 'الرجاء تحديد الورثة لحساب الميراث'
      });
    }

    setResults(newResults);
    setCalculated(true);
  };

  const resetCalculator = () => {
    setEstateValue(0);
    setDebts(0);
    setWasiyyah(0);
    setResults([]);
    setCalculated(false);
    setHeirs(heirs.map(h => ({ ...h, count: 0, enabled: false })));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-white border-none shadow-card">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center">
            <Calculator className="w-8 h-8 text-accent-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">حاسبة المواريث الشرعية</h2>
            <p className="text-muted-foreground">احسب توزيع الإرث وفقاً للشريعة الإسلامية</p>
          </div>
        </div>

        <div className="bg-accent-gold/10 border border-accent-gold/20 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent-gold mt-0.5" />
            <p className="text-sm text-muted-foreground">
              هذه الحاسبة تعطي نتائج تقريبية وفقاً للحالات الأساسية. للحالات المعقدة أو النادرة، يُنصح باستشارة متخصص في الفرائض.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <span className="w-8 h-8 bg-rich-blue text-white rounded-full flex items-center justify-center text-sm">1</span>
              بيانات التركة
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="estate">إجمالي التركة (ريال)</Label>
                <Input
                  id="estate"
                  type="number"
                  value={estateValue || ''}
                  onChange={(e) => setEstateValue(Number(e.target.value))}
                  placeholder="أدخل قيمة التركة"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="debts">الديون والمصاريف (ريال)</Label>
                <Input
                  id="debts"
                  type="number"
                  value={debts || ''}
                  onChange={(e) => setDebts(Number(e.target.value))}
                  placeholder="أدخل الديون والمصاريف"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="wasiyyah">الوصية - بحد أقصى ⅓ (ريال)</Label>
                <Input
                  id="wasiyyah"
                  type="number"
                  value={wasiyyah || ''}
                  onChange={(e) => setWasiyyah(Number(e.target.value))}
                  placeholder="أدخل قيمة الوصية"
                  className="mt-2"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-primary flex items-center gap-2 pt-4">
              <span className="w-8 h-8 bg-rich-blue text-white rounded-full flex items-center justify-center text-sm">2</span>
              الورثة
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {heirs.map((heir) => (
                <div key={heir.id} className={`p-3 rounded-xl border transition-smooth ${
                  heir.enabled ? 'border-accent-gold bg-accent-gold/5' : 'border-border'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={heir.enabled}
                        onCheckedChange={() => toggleHeir(heir.id)}
                      />
                      <span className="text-sm font-medium">{heir.nameAr}</span>
                    </label>
                  </div>
                  {heir.enabled && (
                    <Input
                      type="number"
                      min="1"
                      value={heir.count || ''}
                      onChange={(e) => updateHeirCount(heir.id, Number(e.target.value))}
                      placeholder="العدد"
                      className="h-8 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={calculateInheritance}
                className="flex-1 bg-accent-gold hover:bg-accent-gold-light text-navy font-bold"
              >
                <Calculator className="w-4 h-4 ml-2" />
                حساب الميراث
              </Button>
              <Button 
                onClick={resetCalculator}
                variant="outline"
                className="border-border"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <span className="w-8 h-8 bg-accent-gold text-navy rounded-full flex items-center justify-center text-sm">3</span>
              نتائج التوزيع
            </h3>

            {calculated ? (
              <div className="space-y-4">
                <div className="bg-gradient-accent text-white p-4 rounded-xl">
                  <p className="text-sm opacity-80">صافي التركة</p>
                  <p className="text-2xl font-bold">
                    {(estateValue - debts - Math.min(wasiyyah, estateValue / 3)).toLocaleString()} ريال
                  </p>
                </div>

                <div className="space-y-3">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-primary">{result.heir}</span>
                        <span className="bg-accent-gold/20 text-rich-blue px-3 py-1 rounded-full text-sm font-bold">
                          {result.share}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-rich-blue mb-1">
                        {result.amount.toLocaleString()} ريال
                      </p>
                      <p className="text-sm text-muted-foreground">{result.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-muted/50 rounded-xl p-12">
                <div className="text-center">
                  <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">أدخل البيانات واختر الورثة لحساب التوزيع</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default InheritanceCalculator;
