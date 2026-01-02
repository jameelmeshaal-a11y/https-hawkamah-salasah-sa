import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AddPostBar = () => {
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handleAddPost = () => {
    // يمكن إضافة منطق حفظ المنشور هنا لاحقاً
    setPostContent("");
    setIsPostDialogOpen(false);
  };

  return (
    <>
      <Button 
        variant="ghost"
        size="sm"
        onClick={() => setIsPostDialogOpen(true)}
        className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3"
      >
        <span className="text-sm">إضافة منشور</span>
      </Button>

      {/* Add Post Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة منشور جديد</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="اكتب منشورك هنا..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[150px] text-right"
            />
          </div>
          <DialogFooter className="flex gap-2 justify-start">
            <Button onClick={handleAddPost} className="bg-primary hover:bg-primary/90">
              إضافة
            </Button>
            <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPostBar;
