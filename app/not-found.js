"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <motion.div
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-9xl mb-4"
      >
        🤪
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold text-gray-800"
      >
        Oops! 404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-600 mt-2"
      >
        The page you’re looking for is as lost as my sleep schedule 😴
      </motion.p>
      <motion.div
      className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className=" px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
        >
          Take Me Home 🏠
        </Link>
      </motion.div>
    </div>
  );
}
