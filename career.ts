export interface CareerProfile { playerId: string; xp: number; level: number; matches: number; runs: number; wickets: number; trophies: number; unlocked: string[]; }
export function addCareerResult(p: CareerProfile, result: {runs:number; wickets:number; won:boolean}) {
  const xp = p.xp + result.runs + result.wickets * 25 + (result.won ? 100 : 25);
  return { ...p, xp, level: Math.floor(xp / 1000) + 1, matches: p.matches + 1, runs: p.runs + result.runs, wickets: p.wickets + result.wickets, trophies: p.trophies + (result.won ? 1 : 0) };
}
