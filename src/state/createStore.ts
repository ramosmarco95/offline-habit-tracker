import type { Habit } from '../types';
import { getHabits, putHabit, deleteHabit } from '../data/db';

export type State = { habits: Habit[] };
export type Listener = (state: Readonly<State>) => void;

function uid() {
  return crypto.randomUUID();
}

export function createStore() {
  let state: State = { habits: [] };
  const listeners = new Set<Listener>();

  function notify() {
    const snapshot = Object.freeze({
      ...state,
      habits: state.habits.map((h) => ({ ...h })),
    });
    listeners.forEach((l) => l(snapshot));
  }

  async function init() {
    state.habits = await getHabits();
    notify();
  }

  function subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  }

  async function addHabit(name: string, freq: Habit['freq']) {
    const habit: Habit = { id: uid(), name, freq, streak: 0 };
    state = { ...state, habits: [...state.habits, habit] };
    notify();
    await putHabit(habit);
  }

  async function removeHabit(id: string) {
    state = { ...state, habits: state.habits.filter((h) => h.id !== id) };
    notify();
    await deleteHabit(id);
  }

  async function markComplete(id: string, dateISO: string) {
    state = {
      ...state,
      habits: state.habits.map((h) =>
        h.id === id ? { ...h, streak: h.streak + 1, lastTick: dateISO } : h,
      ),
    };
    notify();
    // entries persisted in db layer by UI when needed
  }

  return { subscribe, init, addHabit, removeHabit, markComplete };
}
