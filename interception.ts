export interface Vector3 { x:number; y:number; z:number }
export interface InterceptionCandidate { playerId:string; point:Vector3; distance:number; catchWindow:number; }

export function chooseFielder(candidates: InterceptionCandidate[]): InterceptionCandidate | null {
  if (!candidates.length) return null;
  return [...candidates].sort((a,b) => (a.distance + a.catchWindow*0.35) - (b.distance + b.catchWindow*0.35))[0];
}

export function canCatch(catchSkill:number, timingError:number, difficulty:number): boolean {
  const skill = Math.max(0, Math.min(100, catchSkill));
  const margin = 0.38 + skill / 250 - difficulty * 0.08;
  return timingError <= Math.max(0.05, margin);
}
