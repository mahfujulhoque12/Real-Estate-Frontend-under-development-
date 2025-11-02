"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    // if not logged in, redirect to sign-in page
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [currentUser, router]);

  // Prevent flashing of protected content before redirect
  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
