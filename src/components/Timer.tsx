"use client";

import { useEffect } from "react";
import { useFocusStore } from "@/store/useFocusStore";
import { motion } from "framer-motion";
import ControlButton from "./ControlButton";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer() {
  const { time, isRunning, start, pause, reset } = useFocusStore();

  const totalTime = 1500; // 25 mins (sync with store later)
  const progress = time / totalTime;

  const theme = useFocusStore((s) => s.theme);

  const strokeColor =
    theme === "midnight"
      ? "rgba(99,102,241,0.9)" // indigo glow
      : "rgba(34,197,94,0.9)"; // green glow

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      useFocusStore.setState((state) => ({
        time: state.time > 0 ? state.time - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex flex-col items-center gap-6">

      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg width="220" height="220">
            <circle
              cx="110"
              cy="110"
              r={RADIUS}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />

            {/* Animated progress ring */}
            <motion.circle
              cx="110"
              cy="110"
              r={RADIUS}
              stroke={strokeColor}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animate={{
                strokeDashoffset: CIRCUMFERENCE * (1 - progress),
              }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </svg>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center text-3xl font-mono">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="flex gap-4">
        <ControlButton onClick={start} label="Start" />
        <ControlButton onClick={pause} label="Pause" />
        <ControlButton onClick={reset} label="Reset" />
      </div>
    </div>
  );
}