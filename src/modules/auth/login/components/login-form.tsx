"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, MailIcon, LogInIcon } from "lucide-react";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const { isPending, register, errors, handleSubmit, formRef } = useLoginForm();

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
      <form ref={formRef} onSubmit={handleSubmit}>
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
            <Input {...register("email")} placeholder="name@example.com" className="bg-background/50" />
            {errors?.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
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
            <Input {...register("password")} type="password" placeholder="••••••••" className="bg-background/50" />
            {errors?.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-2">
          <Button className="w-full h-11 text-sm mt-4" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
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
}
