import AmbientBackground from "@/components/AmbientBackground";
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">
      <AmbientBackground />
      <ThemeSwitcher />

      <div className="space-y-10 text-center">
        <Timer />
        <TaskList />
      </div>
    </main>
  );
}