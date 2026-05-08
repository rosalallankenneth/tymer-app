"use client";

import { useRef, useState } from "react";
import { useFocusStore } from "@/store/useFocusStore";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const [input, setInput] = useState("");
  const { tasks, addTask, toggleTask } = useFocusStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (!input.trim()) return;

    addTask(input);
    setInput("");

    inputRef.current?.focus();
  };
  return (
    <div className="w-full">
      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 p-2 bg-transparent outline-none text-sm placeholder:text-white/40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            placeholder="What deserves your focus?"
          />

          <button
            onClick={handleAddTask}
            className="px-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            +
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                onClick={() => toggleTask(task.id)}
                className={`
                  p-2 rounded-lg cursor-pointer
                  flex items-center justify-between
                  bg-white/5 hover:bg-white/10
                  transition
                  ${task.done ? "opacity-40" : ""}
                `}
              >
                <motion.span
                  animate={{
                    opacity: task.done ? 0.5 : 1,
                  }}
                >
                  {task.text}
                </motion.span>

                {/* Check indicator */}
                <div
                  className={`
                    w-3 h-3 rounded-full border
                    ${task.done ? "bg-white" : "border-white/30"}
                  `}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}