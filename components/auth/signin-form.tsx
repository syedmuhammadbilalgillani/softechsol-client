"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import logger from "@/lib/logger";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      logger.info("User already authenticated, redirecting to dashboard");
      window.location.href = callbackUrl;
    }
  }, [status, session, callbackUrl]);

  // Show loading while checking session
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 px-4">
        <Card className="w-full max-w-md shadow-2xl border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">
                {status === "authenticated"
                  ? "Redirecting to Admin Portal..."
                  : "Checking authentication..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("[Auth Client] Attempting sign-in for:", email.trim());

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
        callbackUrl,
      });

      console.log("[Auth Client] Sign-in response received:", {
        status: res?.status,
        ok: res?.ok,
        error: res?.error,
        url: res?.url,
      });

      if (res?.error) {
        console.error("[Auth Client] Sign-in failed:", res.error);
        logger.error("Sign-in error", res.error);
        if (res.status === 401 || res.error === "CredentialsSignin") {
          setError("Invalid email or password. Please verify your login credentials.");
        } else {
          setError(res.error || "Authentication failed. Please check your credentials.");
        }
      } else if (res?.ok) {
        console.log("[Auth Client] Sign-in successful! Redirecting to:", callbackUrl);
        logger.info("Sign-in successful, redirecting to", callbackUrl);
        window.location.href = callbackUrl;
      }
    } catch (err) {
      console.error("[Auth Client] Sign-in exception:", err);
      logger.error("Sign-in exception", err);
      setError("An unexpected error occurred during sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/95">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-2 animate-in fade-in-50">
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Restricted access. Only authorized Softech Solutions administrators may log in.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
