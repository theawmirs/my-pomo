"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, MailIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { useRegisterForm } from "../hooks/useRegisterForm";

export function RegisterForm() {
  const { state, isPending, register, errors, handleSubmit, formRef } = useRegisterForm();

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardHeader className="space-y-2 pb-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
            <UserPlusIcon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Join us to boost your productivity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                First Name
              </label>
              <Input
                {...register("firstName")}
                // id="firstName"
                // name="firstName"
                placeholder="John"
                className="bg-background/50"
                defaultValue={state?.inputs?.firstName}
              />
              {/* {state?.errors?.firstName && <p className="text-destructive text-xs mt-1">{state.errors.firstName}</p>} */}
              {errors?.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                {...register("lastName")}
                // id="lastName"
                // name="lastName"
                placeholder="Doe"
                className="bg-background/50"
                defaultValue={state?.inputs?.lastName}
              />
              {/* {state?.errors?.lastName && <p className="text-destructive text-xs mt-1">{state.errors.lastName}</p>} */}
              {errors?.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-muted-foreground" />
              Email
            </label>
            <Input
              {...register("email")}
              // id="email"
              // name="email"
              type="email"
              placeholder="name@example.com"
              className="bg-background/50"
              defaultValue={state?.inputs?.email}
            />
            {/* {state?.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email}</p>} */}
            {errors?.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
              <LockIcon className="h-4 w-4 text-muted-foreground" />
              Password
            </label>
            <Input
              {...register("password")}
              // id="password"
              // name="password"
              type="password"
              placeholder="••••••••"
              className="bg-background/50"
              defaultValue={state?.inputs?.password}
            />
            {/* {state?.errors?.password && <p className="text-destructive text-xs mt-1">{state.errors.password}</p>} */}
            {errors?.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
              <LockIcon className="h-4 w-4 text-muted-foreground" />
              Confirm Password
            </label>
            <Input
              {...register("confirmPassword")}
              // id="confirmPassword"
              // name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="bg-background/50"
              defaultValue={state?.inputs?.confirmPassword}
            />
            {/* {state?.errors?.confirmPassword && (
              <p className="text-destructive text-xs mt-1">{state.errors.confirmPassword}</p>
            )} */}
            {errors?.confirmPassword && (
              <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 pt-2">
          <Button className="w-full h-11 text-sm" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
