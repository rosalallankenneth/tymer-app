"use client";

import { useFocusStore } from "@/store/useFocusStore";

export default function ThemeSwitcher() {
  const setTheme = useFocusStore((s) => s.setTheme);

  return (
    <div className="absolute top-4 right-4 space-x-2">
      <button onClick={() => setTheme("midnight")}>🌌</button>
      <button onClick={() => setTheme("forest")}>🌿</button>
    </div>
  );
}