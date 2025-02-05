import { useEffect, useRef, useState } from "react";
import Container from "./UI/Container.tsx";
import {
  Timer as TimerProps,
  useTimersContext,
} from "./store/timers-context.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(duration * 1000);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && timeRef.current) {
    clearInterval(timeRef.current);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(function () {
        setRemainingTime((prev) => (prev <= 0 ? 0 : prev - 50));
      }, 50);
      timeRef.current = timer;
    } else if (timeRef.current) {
      clearInterval(timeRef.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const fomattedTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{fomattedTime}</p>
    </Container>
  );
}
