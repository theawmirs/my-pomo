import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["bcryptjs"],
  // Set the runtime to nodejs for routes dealing with auth
  serverRuntimeConfig: {
    runtime: "nodejs",
  },
};

export default nextConfig;
