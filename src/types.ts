export type HabitId = string;
export type EntryId = string;


export interface Habit {
id: HabitId;
name: string;
freq: 'daily' | 'weekly';
streak: number;
lastTick?: string; // ISO date of last completion
}


export interface Entry {
id: EntryId;
habitId: HabitId;
date: string; // ISO date
}