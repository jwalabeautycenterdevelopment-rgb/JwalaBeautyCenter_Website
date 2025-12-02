"use client";
import { useEffect, useState } from "react";

export default function useGuestId() {
  const [guestId, setGuestId] = useState(null);
  useEffect(() => {
    const generateGuestId = () => {
      let id = localStorage.getItem("guestId");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("guestId", id);
      }
      setGuestId(id);
    };
    generateGuestId();
  }, []);

  return guestId;
}
