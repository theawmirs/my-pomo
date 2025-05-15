import { handlers } from "@/lib/auth/auth"; // Referring to the auth.ts we just created

export const runtime = "nodejs";

export const GET = handlers.GET;
export const POST = handlers.POST;
