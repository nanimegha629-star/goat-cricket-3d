export type PresentationCue = 'WALKOUT'|'TOSS'|'FIRST_BALL'|'FOUR'|'SIX'|'WICKET'|'DRS'|'OVER_END'|'INNINGS_BREAK'|'FINAL_OVER'|'RESULT';
export interface Scorebug { team:string; runs:number; wickets:number; overs:number; balls:number; target?:number; crr:number; rrr?:number; }
export interface ReplayClip { cue: PresentationCue; camera:'BROADCAST'|'CLOSE_UP'|'SIX_CAM'|'WICKET_CAM'|'SLOW_MOTION'; durationMs:number; }
export function buildScorebug(runs:number,wickets:number,legalBalls:number,target?:number):Scorebug {
 const overs=Math.floor(legalBalls/6), balls=legalBalls%6, crr=legalBalls ? runs/(legalBalls/6) : 0;
 const rrr=target!==undefined && legalBalls<120 ? (target-runs)/Math.max((120-legalBalls)/6,0.1) : undefined;
 return {team:'',runs,wickets,overs,balls,target,crr,rrr};
}
