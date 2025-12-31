import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const SupportButton = () => {
  return (
    <Button
      className="fixed bottom-6 left-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-full px-6 py-3 flex items-center gap-2 z-50"
    >
      <Headphones className="h-5 w-5" />
      <span className="font-medium">الدعم</span>
    </Button>
  );
};

export default SupportButton;
