"use client";

import { useFocusStore } from "@/store/useFocusStore";
import { motion } from "framer-motion";

export default function AmbientBackground() {
  const theme = useFocusStore((s) => s.theme);

  const isMidnight = theme === "midnight";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      
      {/* 🌈 Base Gradient */}
      <motion.div
        className={`absolute inset-0 ${
          isMidnight
            ? "bg-gradient-to-br from-black via-zinc-900 to-black"
            : "bg-gradient-to-br from-green-900 via-black to-green-950"
        }`}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* 🔵 Glow Blob 1 */}
      <motion.div
        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl ${
          isMidnight ? "bg-indigo-500/20" : "bg-green-400/20"
        }`}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🟣 Glow Blob 2 */}
      <motion.div
        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl ${
          isMidnight ? "bg-purple-500/20" : "bg-emerald-300/20"
        }`}
        animate={{
          x: [200, -100, 50, 200],
          y: [-100, 100, 0, -100],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🌊 Optional subtle overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl" />
    </div>
  );
}