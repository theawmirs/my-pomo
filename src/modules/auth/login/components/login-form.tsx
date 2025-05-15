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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "../actions/login.action";
import { LockIcon, MailIcon, LogInIcon } from "lucide-react";

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
    <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
      <form action={formAction}>
        <CardHeader className="space-y-2 pb-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
            <LogInIcon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" className="bg-background/50" />
            {state?.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-muted-foreground" />
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                <span className="line-through">Forgot password?</span>
              </Link>
            </div>
            <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-background/50" />
            {state?.errors?.password && <p className="text-destructive text-xs mt-1">{state.errors.password}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-2">
          <Button className="w-full h-11 text-sm" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
          {/* <div className="relative my-4 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full h-11 text-sm bg-background/50" type="button">
            Continue with Google
          </Button> */}
          <div className="text-center text-sm text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
