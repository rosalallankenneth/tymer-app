import AmbientBackground from "@/components/AmbientBackground";
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="min-h-full mt-32 flex flex-col items-center justify-center text-white">
      <AmbientBackground />
      <ThemeSwitcher />

      <div className="flex flex-row justify-between items-start w-full h-full p-5">
        <div className="w-[320px]"></div>
        <div className="space-y-10 text-center flex-col">
          <Timer />
        </div>
        <div className="space-y-10 text-center w-[320px]">
          <TaskList />
        </div>
      </div>
    </main>
  );
}