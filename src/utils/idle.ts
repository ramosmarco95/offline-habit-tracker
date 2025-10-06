export function onIdle(cb: () => void) {
if ('requestIdleCallback' in window) {
(window as any).requestIdleCallback(cb);
} else {
setTimeout(cb, 1);
}
}