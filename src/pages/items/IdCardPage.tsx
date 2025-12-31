import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Building2 } from "lucide-react";
import { useState } from "react";
import salasahLogo from "@/assets/salasah-logo.jpeg";

const IdCardPage = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(true);

  const statistics = [
    { label: "عدد أعضاء مجلس الإدارة", value: "7" },
    { label: "عدد أعضاء الجمعية العمومية", value: "45" },
    { label: "عدد الموظفين", value: "32" },
    { label: "عدد المتطوعين", value: "156" },
    { label: "عدد مشاريع هذا العام", value: "12" },
    { label: "عدد مشاريع العام السابق", value: "18" },
  ];

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="id-card"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="بطاقة التعريف"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Organization Logo Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
              <img 
                src={salasahLogo} 
                alt="شعار الجمعية" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              جمعية صلاصل الخيرية
            </h2>
          </CardContent>
        </Card>

        {/* About Section */}
        <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-primary font-medium">نبذة عن الجمعية</span>
                <ChevronDown className={`h-5 w-5 text-primary transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 px-4 text-muted-foreground text-sm leading-relaxed">
                جمعية صلاصل الخيرية هي منظمة غير ربحية تأسست بهدف خدمة المجتمع وتقديم المساعدات للفئات المحتاجة. 
                تعمل الجمعية على تنفيذ العديد من البرامج والمشاريع التنموية التي تهدف إلى تحسين حياة الأفراد والأسر.
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Vision & Mission Section */}
        <Collapsible open={visionOpen} onOpenChange={setVisionOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-primary font-medium">الرؤية والرسالة</span>
                <ChevronDown className={`h-5 w-5 text-primary transition-transform ${visionOpen ? "rotate-180" : ""}`} />
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 px-4 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">الرؤية</h4>
                  <p className="text-muted-foreground text-sm">أن نكون الجمعية الرائدة في العمل الخيري والتنموي على مستوى المنطقة.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">الرسالة</h4>
                  <p className="text-muted-foreground text-sm">تقديم خدمات اجتماعية وتنموية متميزة للفئات المستهدفة بكفاءة وفاعلية.</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Statistics Section */}
        <Collapsible open={statsOpen} onOpenChange={setStatsOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-primary font-medium">إحصائيات</span>
                <ChevronDown className={`h-5 w-5 text-primary transition-transform ${statsOpen ? "rotate-180" : ""}`} />
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 px-4">
                <div className="grid grid-cols-2 gap-4">
                  {statistics.map((stat, index) => (
                    <div 
                      key={index} 
                      className="bg-muted/50 rounded-lg p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </InnerPageLayout>
  );
};

export default IdCardPage;
