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
import { signUp } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/auth/login");
    }
    if (state?.errors) {
      toast.error(state.message);
    }
  }, [state, router]);
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </label>
            <Input id="firstName" name="firstName" placeholder="First name" defaultValue={state?.inputs?.firstName} />
            {state?.errors?.firstName && <p className="text-red-500">{state.errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </label>
            <Input id="lastName" name="lastName" placeholder="Last name" defaultValue={state?.inputs?.lastName} />
            {state?.errors?.lastName && <p className="text-red-500">{state.errors.lastName}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              defaultValue={state?.inputs?.email}
            />
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              defaultValue={state?.inputs?.password}
            />
            {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              defaultValue={state?.inputs?.confirmPassword}
            />
            {state?.errors?.confirmPassword && <p className="text-red-500">{state.errors.confirmPassword}</p>}
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
