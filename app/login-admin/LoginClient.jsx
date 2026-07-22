"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAdmin } from "./actions";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInAdmin(email, password);
      
      if (result.success) {
        const nextUrl = searchParams.get("next") || "/admin";
        router.push(nextUrl);
        router.refresh(); 
      } else {
        // Generic error message for security
        setError("Invalid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-secondary-text">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-surface-secondary/50 border border-border/30 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-secondary-text/50"
              required
              autoFocus
              autoComplete="username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-secondary-text">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-secondary/50 border border-border/30 rounded-lg px-4 py-3 text-primary-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-secondary-text/50"
              required
              autoComplete="current-password"
            />
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 animate-in fade-in slide-in-from-top-1 text-center font-medium">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || !password || !email}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
