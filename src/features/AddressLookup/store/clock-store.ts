import { create } from 'zustand';

export interface ClockStoreState {
  readonly date: Date;
  readonly interval: number | null;
  readonly enableInterval: () => void;
  readonly clearInterval: () => void;
}

const INTERVAL_MS = 1000;

export const useClockStore = create<ClockStoreState>((set, get) => ({
  date: new Date(),
  interval: null,

  enableInterval: () => {
    const interval = setInterval(() => {
      const date = new Date();

      return set((state) => ({ ...state, date }));
    }, INTERVAL_MS);

    set((state) => ({ ...state, interval }));
  },

  clearInterval: (): void => {
    const interval = get().interval;

    if (interval) {
      clearInterval(interval);
      set((state) => ({ ...state, interval: null }));
    }
  },
}));
