import { LucideIcon, Save, Plus, Trash2, Edit } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface SettingItem {
  name: string;
  label: string;
  description?: string;
  type: "toggle" | "text" | "list";
  defaultValue?: boolean | string;
}

interface GenericSettingsPageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  settings: SettingItem[];
}

const GenericSettingsPage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  settings,
}: GenericSettingsPageProps) => {
  return (
    <InnerPageLayout
      moduleId={moduleId}
      itemSlug={itemSlug}
      sectionTitle={sectionTitle}
      moduleTitle={moduleTitle}
      title={title}
    >
      <div className="space-y-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </div>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات</CardTitle>
            <CardDescription>إدارة إعدادات هذا القسم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.map((setting, index) => (
              <div key={setting.name}>
                {index > 0 && <Separator className="mb-6" />}
                
                {setting.type === "toggle" && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={setting.name}>{setting.label}</Label>
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                    <Switch id={setting.name} defaultChecked={setting.defaultValue as boolean} />
                  </div>
                )}
                
                {setting.type === "text" && (
                  <div className="space-y-2">
                    <Label htmlFor={setting.name}>{setting.label}</Label>
                    {setting.description && (
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    )}
                    <Input
                      id={setting.name}
                      defaultValue={setting.defaultValue as string}
                      className="max-w-md"
                    />
                  </div>
                )}
                
                {setting.type === "list" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{setting.label}</Label>
                        {setting.description && (
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus className="h-4 w-4" />
                        إضافة
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 text-center text-muted-foreground">
                      لا توجد عناصر
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GenericSettingsPage;
