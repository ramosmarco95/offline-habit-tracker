export function throttle<T extends (...args: any[]) => void>(fn: T, wait = 100) {
let last = 0;
let t: number | undefined;
return (...args: Parameters<T>) => {
const now = Date.now();
if (now - last >= wait) {
last = now;
fn(...args);
} else {
clearTimeout(t);
t = setTimeout(() => {
last = Date.now();
fn(...args);
}, wait) as unknown as number;
}
};
}