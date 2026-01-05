import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, MapPin, Phone, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Association {
  id: string;
  name: string;
  city: string;
  type: string;
  phone: string;
  website: string;
}

const AssociationsSearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [results, setResults] = useState<Association[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    setResults([
      { id: "1", name: "جمعية البر الخيرية", city: "الرياض", type: "جمعية خيرية", phone: "0112345678", website: "www.albir.org.sa" },
      { id: "2", name: "جمعية إنسان", city: "الرياض", type: "رعاية أيتام", phone: "0112345679", website: "www.ensan.org.sa" },
      { id: "3", name: "جمعية تكافل", city: "جدة", type: "جمعية خيرية", phone: "0122345678", website: "www.takaful.org.sa" },
    ]);
    toast.success("تم البحث بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="البحث في الجمعيات"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">البحث في الجمعيات</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>معايير البحث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>اسم الجمعية أو رقم الهوية</Label>
                <Input 
                  placeholder="أدخل اسم الجمعية أو رقم هوية المستفيد..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر المدينة --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المدن</SelectItem>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="makkah">مكة المكرمة</SelectItem>
                    <SelectItem value="madinah">المدينة المنورة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="h-4 w-4 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((association) => (
              <Card key={association.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{association.name}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{association.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{association.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{association.website}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {association.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasSearched && results.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>لا توجد نتائج مطابقة للبحث</p>
            </CardContent>
          </Card>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default AssociationsSearchPage;
