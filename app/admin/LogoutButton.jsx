"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/login-admin/actions";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAdmin();
    router.push("/login-admin");
    router.refresh(); // force layout to re-evaluate cookies if needed
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="text-xs text-red-500 hover:text-red-400 mt-2 block transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
    >
      {isLoggingOut ? "Logging out..." : "Log out"}
    </button>
  );
}
