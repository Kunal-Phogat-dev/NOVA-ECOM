"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useSearchParams, useRouter } from "next/navigation";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Mock successful login
    const redirect = searchParams.get('redirect');
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative bg-muted">
        <img 
          src="/images/hero_image.png" 
          alt="Luxury Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-md">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4 text-white">Join the Elite</h2>
          <p className="text-white/80 text-lg">Gain exclusive access to limited drops, personalized cyber-styling, and luxury member benefits.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-4 border border-accent/30 bg-accent/10 text-accent text-xs tracking-widest uppercase font-bold rounded-full">
              Mock Authentication
            </div>
            <h1 className="text-3xl font-bold tracking-widest uppercase mb-4">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to access your NOVA account." : "Register to join the future of luxury fashion."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-white placeholder:text-muted-foreground/50"
                  placeholder="Alex Rivera"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-white placeholder:text-muted-foreground/50"
                placeholder="alex@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs text-muted-foreground hover:text-accent underline transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-accent transition-colors text-white placeholder:text-muted-foreground/50"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full mt-8" size="lg">
              {isLogin ? "Sign In" : "Register"}
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-accent uppercase tracking-widest font-bold underline transition-colors"
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
