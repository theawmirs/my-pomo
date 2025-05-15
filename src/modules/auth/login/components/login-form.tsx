"use client";

import Link from "next/link";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/ui-components/shadcn/ui/card";
import { useActionState, useEffect } from "react";
import { signIn } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      toast.success(`Welcome back`);
      router.push("/pomodoro");
    }
    if (!state?.success && state?.message) {
      toast.error(state.message);
    }
  }, [state?.success, state, router]);

  return (
    <Card className="w-full max-w-md shadow-md">
      <form action={formAction}>
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="Email address" />
            {state?.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-muted-foreground hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" placeholder="Password" />
            {state?.errors?.password && <p className="text-destructive text-xs mt-1">{state.errors.password}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-2">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
