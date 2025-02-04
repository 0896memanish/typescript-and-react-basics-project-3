import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);
const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("Something went wrong!");
  }

  return timersCtx;
}

//Creating a provider component
type TimersContextProviderProps = {
  children: ReactNode;
};

type AddTimerType = {
  type: "ADD_TIMER";
  payload: Timer;
};

type StartTimerType = {
  type: "START_TIMER";
};

type StopTimerType = {
  type: "STOP_TIMER";
};

type ActionType = AddTimerType | StartTimerType | StopTimerType;

function timersReducer(state: TimersState, action: ActionType): TimersState {
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [...state.timers, action.payload],
    };
  }

  if (action.type === "START_TIMER") {
    return {
      ...state,
      isRunning: true,
    };
  }

  if (action.type === "STOP_TIMER") {
    return {
      ...state,
      isRunning: false,
    };
  }

  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMER" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
