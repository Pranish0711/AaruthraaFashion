"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("callbackUrl", callbackUrl);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      // NextAuth redirect throws — expected on success
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required className="mt-1.5" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-display text-2xl uppercase">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
