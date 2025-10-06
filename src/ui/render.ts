import type { State } from '../state/createStore';
import { habitItem } from './components';


const list = document.getElementById('habit-list')!;


export function render(state: Readonly<State>) {
// throttle this in main when subscribing if needed
list.replaceChildren(...state.habits.map(habitItem));
}