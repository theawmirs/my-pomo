import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { Task } from "@prisma/client";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui-components/shadcn/ui/select";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
}

export default function EditTaskDialog({ open, setOpen, task }: Props) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" placeholder="Enter task title" defaultValue={task.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" placeholder="Enter task description" defaultValue={task.description} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select defaultValue={task.priority}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className="text-green-500">
                  Low
                </SelectItem>
                <SelectItem value="medium" className="text-yellow-500">
                  Medium
                </SelectItem>
                <SelectItem value="high" className="text-red-500">
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              placeholder="Enter task due date"
              defaultValue={task.dueDate?.toISOString().split("T")[0]}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="w-full flex-1">
              Save
            </Button>
            <Button type="button" variant="destructive" className="w-full flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
