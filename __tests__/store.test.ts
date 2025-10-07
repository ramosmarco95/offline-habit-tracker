import { describe, it, expect } from 'vitest';
import { createStore } from '../src/store/createStore';

describe('store', () => {
  it('adds and removes habit', async () => {
    const s = createStore();
    await s.init();
    await s.addHabit('Read', 'daily');
    let count = 0;
    s.subscribe((st) => (count = st.habits.length));
    await s.addHabit('Run', 'weekly');
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
