"use client";

import { useEffect, useState } from "react";
import { useFocusStore } from "@/store/useFocusStore";
import { motion } from "framer-motion";
import ControlButton from "./ControlButton";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PRESETS = [5, 15, 25, 45];

export default function Timer() {
  const { time, isRunning, start, pause, reset } = useFocusStore();
  const duration = useFocusStore((s) => s.duration);
  const setDuration = useFocusStore((s) => s.setDuration);
  const [customMinutes, setCustomMinutes] = useState("");

  const totalTime = duration;
  const progress = time / totalTime;

  const theme = useFocusStore((s) => s.theme);

  const strokeColor =
    theme === "midnight"
      ? "rgba(99,102,241,0.9)" // indigo glow
      : "rgba(34,197,94,0.9)"; // green glow

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const hasStarted = time !== duration;
  
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      useFocusStore.setState((state) => ({
        time: state.time > 0 ? state.time - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-start gap-6">
      <div className="flex flex-col items-center justify-center gap-2 mb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {/* Presets */}
          {PRESETS.map((min) => (
            <button
              key={min}
              onClick={() => setDuration(min * 60)}
              className="
                px-3 py-1 rounded-lg
                bg-white/10 hover:bg-white/20
                text-sm transition
              "
            >
              {min}m
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="flex items-center gap-2 ml-2">
          <input
            type="number"
            min={1}
            placeholder="Custom"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const minutes = Number(customMinutes);

                if (!minutes || minutes < 1) return;

                setDuration(minutes * 60);
                setCustomMinutes("");
              }
            }}
            className="
              w-24 px-3 py-1
              rounded-lg
              bg-white/10
              border border-white/10
              outline-none
              text-sm
              placeholder:text-white/30
            "
          />

          <button
            onClick={() => {
              const minutes = Number(customMinutes);

              if (!minutes || minutes < 1) return;

              setDuration(minutes * 60);
              setCustomMinutes("");
            }}
            className="
              px-3 py-1 rounded-lg
              bg-white/10 hover:bg-white/20
              text-sm transition
            "
          >
            Set
          </button>
        </div>
      </div>

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
        {!isRunning && !hasStarted && (
          <ControlButton onClick={start} label="Start" />
        )}

        {isRunning && (
          <>
            <ControlButton onClick={pause} label="Pause" />
            <ControlButton
              onClick={() => {
                useFocusStore.setState({
                  isRunning: false,
                  time: duration,
                });
              }}
              label="Stop"
            />
            <ControlButton onClick={reset} label="Reset" />
          </>
        )}

        {!isRunning && hasStarted && (
          <>
            <ControlButton onClick={start} label="Resume" />
            <ControlButton
              onClick={() => {
                useFocusStore.setState({
                  time: duration,
                });
              }}
              label="Reset"
            />
          </>
        )}
      </div>
    </div>
  );
}