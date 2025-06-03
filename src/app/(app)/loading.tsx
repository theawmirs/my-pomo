"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Loading spinner */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-spin-slow"></div>

            {/* Inner spinner */}
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>

          {/* Loading text */}
          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-foreground">Loading</p>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
