export type AudioCue = 'BAT_CONTACT'|'BOUNDARY'|'SIX'|'WICKET'|'APPEAL'|'UMPIRE'|'CROWD_CHEER'|'CROWD_GROAN'|'FOOTSTEP'|'BALL_BOUNCE';
export interface AudioEvent { cue:AudioCue; intensity:number; variation?:number; }
export function gameplayAudio(cue:AudioCue, intensity=1):AudioEvent { return {cue, intensity:Math.max(0,Math.min(1,intensity)), variation:Math.floor(Math.random()*3)}; }
