import { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "../actions/login.action";
import { useForm } from "react-hook-form";
import { signInSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authStore } from "../../stores/auth.store";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });
  const { setIsAuthenticated } = authStore();

  // Set up server action state and form reference
  const [state, formAction, isPending] = useActionState(signIn, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when login is successful
  useEffect(() => {
    if (state?.success) {
      reset();
      setIsAuthenticated(true);
      toast.success(`Logged in successfully`);
      router.push("/pomodoro");

      setTimeout(() => {
        setIsAuthenticated(false);
      }, 1000);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state, reset, router, setIsAuthenticated]);

  // Handle form submission with transition
  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  // Return form utilities and state
  return { state, isPending, register, errors, handleSubmit: handleSubmit(onSubmit), formRef };
};
