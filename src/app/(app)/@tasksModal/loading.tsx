import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
