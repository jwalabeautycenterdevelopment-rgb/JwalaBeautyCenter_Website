"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useGuestId() {
  const [guestId, setGuestId] = useState(null);
  useEffect(() => {
    const generateGuestId = () => {
      let id = localStorage.getItem("guestId");
      if (!id) {
        id = uuidv4();
        localStorage.setItem("guestId", id);
      }
      setGuestId(id);
    };
    generateGuestId();
  }, []);

  return guestId;
}
