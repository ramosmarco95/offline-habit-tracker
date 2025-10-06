import type { Habit } from '../types';


export function habitItem(h: Habit) {
const li = document.createElement('li');
li.className = 'card';


const left = document.createElement('span');
left.innerHTML = `<strong>${h.name}</strong> · <small>${h.freq} · streak ${h.streak}</small>`;


const done = document.createElement('button');
done.textContent = '✓';
done.title = 'Mark complete';
done.setAttribute('aria-pressed', String(false));
done.dataset.action = 'complete';
done.dataset.id = h.id;


const remove = document.createElement('button');
remove.textContent = '✕';
remove.title = 'Remove';
remove.dataset.action = 'remove';
remove.dataset.id = h.id;


const right = document.createElement('span');
right.append(done, remove);
li.append(left, right);
return li;
}