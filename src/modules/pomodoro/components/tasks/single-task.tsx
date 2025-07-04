import { Card, CardContent, CardDescription } from "@/modules/ui-components/shadcn/ui/card";
import { CardHeader } from "@/modules/ui-components/shadcn/ui/card";
import { CardTitle } from "@/modules/ui-components/shadcn/ui/card";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
import { CheckIcon, EditIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  task: {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    dueDate: Date | null;
    priority: string;
  };
}

export function SingleTask({ task }: Props) {
  // Format the due date if it exists
  const formattedDueDate = task.dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(task.dueDate)
    : null;

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Card
      className={cn(
        "border-l-4 transition-all hover:shadow-md",
        task.completed ? "border-l-green-500 opacity-70" : `border-l-${getPriorityColor(task.priority)}`
      )}
    >
      <CardHeader className="p-4 pb-2">
        <CardContent className="flex justify-between items-start p-0">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className={cn(task.completed ? "line-through text-muted-foreground" : "")}>
                {task.title}
              </CardTitle>
              <Badge
                variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}
              >
                {task.priority}
              </Badge>
            </div>
            {task.description && <CardDescription className="mt-1">{task.description}</CardDescription>}
            {formattedDueDate && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <CalendarIcon size={12} />
                <span>{formattedDueDate}</span>
              </div>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              variant={task.completed ? "default" : "outline"}
              size="icon"
              className={task.completed ? "bg-green-500 hover:bg-green-600" : ""}
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-red-100 hover:text-red-600">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
