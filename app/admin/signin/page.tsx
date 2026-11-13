import SignInForm from "@/components/auth/signin-form";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Sign In - Softech Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-gray-500">Loading sign in...</p>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

