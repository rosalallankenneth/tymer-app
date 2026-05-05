"use client";

import { motion } from "framer-motion";

export default function ControlButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="
        px-4 py-2 rounded-xl
        bg-white/10 backdrop-blur-md
        border border-white/10
        text-sm tracking-wide
        shadow-lg
        hover:bg-white/20
        transition
      "
    >
      {label}
    </motion.button>
  );
}