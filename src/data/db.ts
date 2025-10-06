import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Habit, Entry } from '../types';

interface HabitDB extends DBSchema {
  habits: {
    value: Habit;
    key: string;
    indexes: { 'by-name': string };
  };
  entries: {
    value: Entry;
    key: string;
    indexes: { 'by-habit': string; 'by-date': string };
  };
}

let dbPromise: Promise<IDBPDatabase<HabitDB>> | null = null;

/* Initialize and get the IndexedDB database */
function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<HabitDB>('habit-tracker', 1, {
      upgrade(db) {
        const habits = db.createObjectStore('habits', { keyPath: 'id' });
        habits.createIndex('by-name', 'name', { unique: false });
        const entries = db.createObjectStore('entries', { keyPath: 'id' });
        entries.createIndex('by-habit', 'habitId', { unique: false });
        entries.createIndex('by-date', 'date', { unique: false });
      },
    });
  }
  return dbPromise;
}

/*  CRUD operations for Habits and Entries */
export async function getHabits(): Promise<Habit[]> {
  const db = await getDB();
  return db.getAll('habits');
}

export async function putHabit(habit: Habit) {
  const db = await getDB();
  await db.put('habits', habit);
}

export async function deleteHabit(id: string) {
  const db = await getDB();
  await db.delete('habits', id);
}

export async function getEntriesByHabit(habitId: string): Promise<Entry[]> {
  const db = await getDB();
  return db.getAllFromIndex('entries', 'by-habit', habitId);
}

export async function putEntry(entry: Entry) {
  const db = await getDB();
  await db.put('entries', entry);
}

export async function deleteEntriesForHabit(habitId: string) {
  const db = await getDB();
  const tx = db.transaction('entries', 'readwrite');
  const idx = tx.store.index('by-habit');
  for await (const cursor of idx.iterate(habitId)) {
    await cursor.delete();
  }
  await tx.done;
}
