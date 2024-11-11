import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthHandler() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Set the mounted state to true once the component has rendered
  useEffect(() => {
    setMounted(true); // Set mounted to true once the component has rendered
  }, []);

  // Redirect based on user state only after the layout has mounted
  useEffect(() => {
    console.log({ mounted, isAuthenticated });
    if (mounted) {
      // Ensure navigation only after mounted
      if (!isAuthenticated) {
        router.replace("/(unlogged)/login"); // Redirect to login if unauthenticated
      } else {
        router.replace("/(logged)/home"); // Redirect to main tabs if authenticated
      }
    }
  }, [isAuthenticated, router, mounted]); // Depend on mounted to avoid early navigation

  return null; // No UI for this component, it only handles navigation
}
