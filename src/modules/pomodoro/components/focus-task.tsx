import { Edit, PlusIcon } from "lucide-react";
import { Button } from "../../ui-components/shadcn/ui/button";
import Link from "next/link";

export function FocusTask() {
  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      <h2 className="text-2xl font-bold whitespace-nowrap cursor-pointer">What do you want to focus on?</h2>

      <Link href="/tasks">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
      </Link>
    </div>
  );
}
