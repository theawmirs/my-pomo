import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editUserProfileSchema } from "../schemas/user.schemas";
import { editUserProfileAction } from "../actions/user.actions";
import { useActionState, useEffect, useRef, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useEditUserProfile = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUserProfileSchema),
    mode: "onChange",
  });

  const boundAction = (prevState: unknown, formData: FormData) => {
    return editUserProfileAction(prevState, formData, userId);
  };

  const [state, formAction, isPending] = useActionState(boundAction, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCancelClick = () => {
    router.back();
  };

  useEffect(() => {
    if (state?.success) {
      reset();
      toast.success(state.message);
      router.back();
    }
    if (!state?.success && state?.message) {
      toast.error(state.message);
    }
  }, [state, reset, router]);

  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    handleCancelClick,
    formRef,
  };
};
