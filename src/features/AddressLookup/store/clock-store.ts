import { create } from 'zustand';

interface ClockStoreState {
  readonly time: number;
  readonly interval: number | null;
  readonly enableInterval: () => void;
  readonly clearInterval: () => void;
}

const INTERVAL_MS = 1000;

export const useClockStore = create<ClockStoreState>((set, get) => ({
  time: Date.now(),
  interval: null,

  enableInterval: () => {
    const interval = setInterval(() => {
      const time = Date.now();

      return set((state) => ({ ...state, time }));
    }, INTERVAL_MS);

    set((state) => ({ ...state, interval }));
  },

  clearInterval: (): void => {
    const interval = get().interval;

    if (interval) {
      clearInterval(interval);
    }
  },
}));
