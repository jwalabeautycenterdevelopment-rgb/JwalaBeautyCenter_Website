"use client";
import { useEffect, useState } from "react";
export default function useGuestId() {
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    let storedId = localStorage.getItem("guestId");

    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("guestId", storedId);
    }
    setGuestId(storedId);
  }, []);

  return guestId;
}
