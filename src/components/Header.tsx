import { useTimersContext } from "./store/timers-context.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const timerCtx = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timerCtx.isRunning ? timerCtx.stopTimers : timerCtx.startTimers
        }
      >
        {timerCtx.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
