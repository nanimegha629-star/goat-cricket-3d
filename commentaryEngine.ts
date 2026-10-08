import type {BallOutcome} from '../runtime/matchEngine';
export function commentary(outcome:BallOutcome,runs:number,score:number,wickets:number,required:number|null):string{
 if(outcome==='WICKET')return wickets>=9?'WICKET! Only one wicket remains.':'WICKET! The fielding side strikes.';
 if(outcome==='SIX')return 'That is huge! SIX! The crowd erupts.';
 if(outcome==='FOUR')return 'FOUR! Crashed through the gap.';
 if(outcome==='NO_BALL')return 'No-ball! Free hit coming.';
 if(outcome==='WIDE')return 'Wide ball. Extra run.';
 if(outcome==='DOT')return required&&required>10?'Dot ball — pressure rises in the chase.':'Dot ball. Excellent bowling.';
 if(required!==null&&required<6)return `${runs} run${runs>1?'s':''}. The required rate is under control.`;
 return `${runs} run${runs>1?'s':''}. Good running between the wickets.`;
}
