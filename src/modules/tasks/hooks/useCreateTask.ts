import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { createTaskAction } from "../actions/tasks.action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schema/task.schema";
import { FormState } from "../actions/tasks.action";

export const useCreateTask = (userId?: string) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });
  const [activeTab, setActiveTab] = useState<"tasks" | "add">("tasks");
  const formRef = useRef<HTMLFormElement>(null);

  const boundAction = (prevState: FormState | any, formData: FormData) => {
    return createTaskAction(prevState, formData, userId!);
  };

  const [state, formAction, isPending] = useActionState(boundAction, null);

  useEffect(() => {
    if (state?.success) {
      reset();
      toast.success(state.message);
      setActiveTab("tasks");
    }
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, reset]);

  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    activeTab,
    setActiveTab,
    onSubmit,
    formRef,
  };
};
