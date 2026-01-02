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
      {/* Add Post Bar with Shadow */}
      <div className="bg-muted border-b border-border shadow-md">
        <div className="flex justify-end px-4 py-3">
          <Button 
            onClick={() => setIsPostDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded px-6 py-2 shadow-sm"
          >
            إضافة منشور
          </Button>
        </div>
      </div>

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
