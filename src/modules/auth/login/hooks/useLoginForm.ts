import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signIn } from "../actions/login.action";
import { toast } from "sonner";

export const useLoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(`Logged in successfully`);
      router.push("/pomodoro");
    }
    if (!state?.success && state?.message) {
      toast.error(state.message);
    }
  }, [state?.success, state, router]);

  return { state, formAction, isPending };
};
