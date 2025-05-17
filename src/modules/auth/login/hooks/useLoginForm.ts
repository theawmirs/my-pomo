import { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "../actions/login.action";
import { useForm } from "react-hook-form";
import { signInSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom hook for handling login form logic
 * Manages form state, validation, submission, and success/error handling
 */
export const useLoginForm = () => {
  // Initialize form with zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  // Set up server action state and form reference
  const [state, formAction, isPending] = useActionState(signIn, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when login is successful
  useEffect(() => {
    if (state?.success) {
      reset();
    }
  }, [state, reset]);

  // Handle success/error states and navigation
  useEffect(() => {
    if (state?.success) {
      toast.success(`Logged in successfully`);
      router.push("/pomodoro");
    }
    if (!state?.success && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  // Handle form submission with transition
  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  // Return form utilities and state
  return { state, isPending, register, errors, handleSubmit: handleSubmit(onSubmit as any), formRef };
};
