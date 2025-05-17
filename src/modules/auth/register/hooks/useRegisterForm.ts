import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "../actions/register.action";

export const useRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/auth/login");
    }
    if (!state?.success && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return { state, formAction, isPending };
};
