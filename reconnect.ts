export type ConnectionState = 'offline'|'connecting'|'connected'|'reconnecting';
export function nextRetryMs(attempt:number){ return Math.min(10000, 500 * 2 ** Math.max(0, attempt-1)); }
export function shouldResume(lastServerTick:number, localTick:number){ return lastServerTick >= 0 && localTick >= lastServerTick; }
