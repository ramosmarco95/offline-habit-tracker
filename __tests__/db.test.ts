import { describe, it, expect } from 'vitest';
import { getHabits, putHabit } from '../src/data/db';


describe('db', () => {
it('stores and reads habits', async () => {
await putHabit({ id: '1', name: 'Water', freq: 'daily', streak: 0 });
const habits = await getHabits();
expect(habits.find(h => h.id === '1')?.name).toBe('Water');
});
});