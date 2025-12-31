import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, X, Save } from "lucide-react";
import { useState } from "react";

const MailPreferencesPage = () => {
  const [tags, setTags] = useState<string[]>(["هام", "عاجل", "للمتابعة"]);
  const [groups, setGroups] = useState<string[]>(["الإدارة العليا", "فريق العمل"]);
  const [signature, setSignature] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newGroup, setNewGroup] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addGroup = () => {
    if (newGroup.trim() && !groups.includes(newGroup.trim())) {
      setGroups([...groups, newGroup.trim()]);
      setNewGroup("");
    }
  };

  const removeGroup = (group: string) => {
    setGroups(groups.filter((g) => g !== group));
  };

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التواصل الداخلي"
      title="تفضيلات البريد"
    >
      <div className="space-y-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تفضيلات البريد</h2>
        </div>

        {/* Tags Section */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <Label className="text-base font-medium">إدارة العلامات</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 px-3 py-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="علامة جديدة..."
              className="max-w-xs text-right"
              onKeyDown={(e) => e.key === "Enter" && addTag()}
            />
            <Button onClick={addTag} size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              إضافة
            </Button>
          </div>
        </div>

        {/* Groups Section */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <Label className="text-base font-medium">إدارة المجموعات</Label>
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <Badge key={group} variant="outline" className="gap-1 px-3 py-1">
                {group}
                <button onClick={() => removeGroup(group)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="مجموعة جديدة..."
              className="max-w-xs text-right"
              onKeyDown={(e) => e.key === "Enter" && addGroup()}
            />
            <Button onClick={addGroup} size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              إضافة
            </Button>
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <Label htmlFor="signature" className="text-base font-medium">التوقيع الافتراضي</Label>
          <Textarea 
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="أدخل توقيعك هنا..."
            className="min-h-[120px] text-right"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            حفظ التفضيلات
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default MailPreferencesPage;
