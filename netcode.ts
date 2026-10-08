export type NetRole = 'host' | 'client' | 'spectator';
export type MatchMessage = { tick:number; type:'INPUT'|'STATE'|'EVENT'|'PING'; payload:unknown };
export type AuthoritativeState = { tick:number; phase:string; score:number; wickets:number; legalBalls:number; seed:number };
export function makeInput(tick:number, input:unknown):MatchMessage { return {tick,type:'INPUT',payload:input}; }
export function makeState(tick:number, state:AuthoritativeState):MatchMessage { return {tick,type:'STATE',payload:state}; }
