export interface TournamentTeam { id: string; name: string; }
export interface TournamentMatch { id: string; home: string; away: string; completed: boolean; winner?: string; }
export interface TournamentState { name: string; teams: TournamentTeam[]; matches: TournamentMatch[]; points: Record<string, number>; }
export function awardWin(state: TournamentState, winner: string, loser: string) {
  return { ...state, points: { ...state.points, [winner]: (state.points[winner] ?? 0) + 2, [loser]: state.points[loser] ?? 0 } };
}
