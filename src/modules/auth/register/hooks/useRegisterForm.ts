// Import necessary dependencies
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "../actions/register.action";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      reset();
      toast.success(state.message);
      router.push("/auth/login");
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state, reset, router]);

  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  return { state, isPending, register, errors, handleSubmit: handleSubmit(onSubmit), formRef };
};
