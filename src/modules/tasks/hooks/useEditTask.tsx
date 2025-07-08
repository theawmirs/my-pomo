import { startTransition, useActionState, useEffect, useRef } from "react";
import { editTaskAction } from "../actions/tasks.action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schema/task.schema";
import { FormState } from "../actions/tasks.action";

export const useEditTask = (taskId: string, setOpen: (open: boolean) => void) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const boundAction = (prevState: FormState | null, formData: FormData) => {
    return editTaskAction(prevState, formData, taskId);
  };

  const [state, formAction, isPending] = useActionState(boundAction, null);

  useEffect(() => {
    if (state?.success) {
      reset();
      toast.success(state.message);
      setOpen(false);
    }
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, reset, setOpen]);

  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    onSubmit,
    formRef,
  };
};
