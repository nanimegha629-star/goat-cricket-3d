export type MatchFormat = '10_OVERS' | '20_OVERS';
export type GameMode = 'QUICK_MATCH' | 'TOURNAMENT' | 'CAREER' | 'CHALLENGE' | 'FAN_CUP' | 'VILLAIN_CHALLENGE';

export interface MatchSetup { mode: GameMode; format: MatchFormat; difficulty: 'EASY'|'NORMAL'|'HARD'|'PRO'|'LEGEND'; userTeam: 'HERO_XI'|'VILLAIN_XI'; }
export const formatOvers = (format: MatchFormat) => format === '10_OVERS' ? 10 : 20;
export const legalBallsPerInnings = (format: MatchFormat) => formatOvers(format) * 6;
