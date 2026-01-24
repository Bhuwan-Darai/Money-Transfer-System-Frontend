import { Button } from "@/components/ui/button";
import { ArrowLeft, Crown, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthMutation from "@/hooks/auth/useAuth";

// import { useToast } from "@/hooks/use-toast";
// import { Crown, Loader2, ArrowLeft } from "lucide-react";

export const SuperAdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { superAdminLogin, superAdminLoginPending } = useAuthMutation();
  const navigate = useNavigate();
  //   const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("super admin credentials", email, password);
      await superAdminLogin({ email, password });
      // User and token are stored in zustand store via the hook's onSuccess callback
      // Navigate after successful login
      navigate("/super-admin");
    } catch (error) {
      toast.success("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-chart-4 flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl text-foreground">
            Super Admin
          </span>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Sign in to the platform administration panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={superAdminLoginPending}
              >
                {superAdminLoginPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to main login
              </Link>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Demo mode: Enter any email/password to login
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
