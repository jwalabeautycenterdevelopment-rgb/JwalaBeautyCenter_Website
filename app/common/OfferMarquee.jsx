"use client";
import { motion } from "framer-motion";
const OfferMarquee = ({ text }) => {
  return (
    <div className="w-full bg-primary text_primary py-8 overflow-hidden">
      <motion.div
        className="text-sm whitespace-nowrap font-semibold"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default OfferMarquee;
