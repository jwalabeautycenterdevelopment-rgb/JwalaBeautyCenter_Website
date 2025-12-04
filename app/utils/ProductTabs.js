"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProductTabs() {
  const [active, setActive] = useState("details");

  useEffect(() => {
    const ids = ["details", "reviews", "related"];
    const observers = [];

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { threshold: 0.4 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const tabs = [
    { id: "details", label: "Details" },
    { id: "reviews", label: "Reviews" },
    { id: "related", label: "Related" },
  ];

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 mt-6 md:mt-20">
      <div className="relative flex gap-8 text-sm font-semibold">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab.id)}
            className={`relative pb-2 ${
              active === tab.id ? "text-purple-600" : "text-gray-600"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute left-0 bottom-0 w-full h-1 bg-purple-600"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
