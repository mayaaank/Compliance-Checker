"use client";

import { useState, useEffect } from "react";
import OnboardingForm from "./OnboardingForm";
import { usePathname } from "next/navigation";

export default function ProfileManager() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkProfile = () => {
      const profile = localStorage.getItem("userProfile");
      // Skip onboarding on landing page, but require it for simulation/dashboard
      const gatedPaths = ["/simulate", "/live-agents", "/dashboard", "/report"];
      const isGated = gatedPaths.some(path => pathname.startsWith(path));
      
      if (!profile && isGated) {
        setShowOnboarding(true);
        setInitialData(null);
      }
    };

    checkProfile();
    
    // Listen for custom edit profile events
    const handleEdit = (e: any) => {
      setInitialData(e.detail);
      setShowOnboarding(true);
    };
    
    window.addEventListener("editProfile", handleEdit);
    return () => window.removeEventListener("editProfile", handleEdit);
  }, [pathname]);

  if (!showOnboarding) return null;

  return (
    <OnboardingForm 
      onComplete={() => setShowOnboarding(false)} 
      initialData={initialData}
      onClose={localStorage.getItem("userProfile") ? () => setShowOnboarding(false) : undefined}
    />
  );
}
