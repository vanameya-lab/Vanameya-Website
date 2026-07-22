import LoginClient from "./LoginClient";
import { Suspense } from "react";
export const metadata = {
  title: "Admin Portal",
  description: "Secure login for VANAMÉYA admin portal",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary-text font-body p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-semibold tracking-widest text-accent mb-2">VANAMÉYA</h1>
          <p className="text-sm text-secondary-text uppercase tracking-widest">Admin Portal</p>
        </div>
        
        <div className="bg-surface border border-border/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <Suspense fallback={<div>Loading...</div>}>
              <LoginClient />
            </Suspense>
          </div>
          <div className="bg-surface-secondary/30 p-4 text-center border-t border-border/20">
            <p className="text-xs text-secondary-text flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
