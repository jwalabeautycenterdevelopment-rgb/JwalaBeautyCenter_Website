"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoginExpired } from "../utils/isLoginExpired";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (typeof window !== "undefined") {
      if (isLoginExpired()) {
        localStorage.clear();
        router.replace("/login");
      } else {
        if (isMounted) {
          setVerified(true);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (!verified) return null;

  return children;
};

export default ProtectedRoute;
