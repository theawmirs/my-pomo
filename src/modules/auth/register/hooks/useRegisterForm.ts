// Import necessary dependencies
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "../actions/register.action";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom hook for handling registration form logic
 * Manages form state, validation, submission, and success/error handling
 */
export const useRegisterForm = () => {
  // Initialize form with zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  // Set up server action state and form reference
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when registration is successful
  useEffect(() => {
    if (state?.success) {
      reset();
    }
  }, [state, reset]);

  // Handle success/error states and navigation
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/auth/login");
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
