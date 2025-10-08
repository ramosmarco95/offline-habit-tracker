import type { Habit } from '../types';
import { getHabits, putHabit, deleteHabit } from '../data/db';

export type State = { habits: Habit[] };
export type Listener = (state: Readonly<State>) => void;

function uid() {
  return crypto.randomUUID();
}

function samePeriod(aISO: string | undefined, bISO: string, freq: Habit['freq']) {
  if (!aISO) return false;
  const a = new Date(aISO), b = new Date(bISO);
  if (freq === 'daily') {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }
  // weekly: compare ISO week (Mon–Sun or Sun–Sat; pick one and keep consistent)
  const weekKey = (d: Date) => {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // get ISO week number
    const day = (t.getUTCDay() + 6) % 7; // Mon=0..Sun=6
    t.setUTCDate(t.getUTCDate() - day + 3);
    const firstThu = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(
      ((t.getTime() - firstThu.getTime()) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7
    );
    return `${t.getUTCFullYear()}-W${week}`;
  };
  return weekKey(a) === weekKey(b);
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
  const target = state.habits.find((h) => h.id === id);
  if (!target) return;

  // prevent double count within same period
  const shouldIncrement = !samePeriod(target.lastTick, dateISO, target.freq);

  const updated: Habit = {
    ...target,
    streak: shouldIncrement ? target.streak + 1 : target.streak,
    lastTick: dateISO,
  };

  // optimistic update
  state = {
    ...state,
    habits: state.habits.map((h) => (h.id === id ? updated : h)),
  };
  notify();

  try {
    await putHabit(updated);                 // 🔐 persist the new streak/lastTick
    // Optionally also record a completion entry for history:
    // await putEntry({ id: uid(), habitId: id, date: dateISO });
  } catch (err) {
    // rollback on failure (keeps UI/data consistent)
    state = {
      ...state,
      habits: state.habits.map((h) => (h.id === id ? target : h)),
    };
    notify();
    throw err;
  }
}

  return { subscribe, init, addHabit, removeHabit, markComplete };
}
