export type DeliveryType='pace'|'swing'|'seam'|'spin'|'yorker'|'bouncer'|'slower'|'cutter';
export type BallOutcome='DOT'|'ONE'|'TWO'|'THREE'|'FOUR'|'SIX'|'WIDE'|'NO_BALL'|'BYE'|'LEG_BYE'|'WICKET';
export type MatchState={score:number;wickets:number;legalBalls:number;totalBalls:number;target:number|null;freeHit:boolean;innings:1|2;lastOutcome:BallOutcome|null;striker:number;nonStriker:number;bowler:number};
export const maxLegalBalls=(overs:number)=>overs*6;
export function createMatchState():MatchState{return {score:0,wickets:0,legalBalls:0,totalBalls:0,target:null,freeHit:false,innings:1,lastOutcome:null,striker:0,nonStriker:1,bowler:0};}
export function applyOutcome(s:MatchState,o:BallOutcome,runs=0):MatchState{
 const n={...s}; n.lastOutcome=o; n.totalBalls++;
 if(o==='WIDE'||o==='NO_BALL'){n.score+=runs||1;n.freeHit=o==='NO_BALL';if(o==='WIDE')n.freeHit=false;return n;}
 if(o==='WICKET'){n.legalBalls++;n.wickets++;n.freeHit=false;return n;}
 n.score+=runs; n.legalBalls++; n.freeHit=false;
 if([1,3].includes(runs)) [n.striker,n.nonStriker]=[n.nonStriker,n.striker];
 return n;
}
export function overComplete(s:MatchState,overs:number){return s.legalBalls>=maxLegalBalls(overs)||s.wickets>=10;}
export function requiredRate(s:MatchState,overs:number){if(!s.target)return null;const remain=maxLegalBalls(overs)-s.legalBalls;return remain>0?Math.max(0,(s.target-s.score)/(remain/6)):0;}
export function outcomeFromRuns(r:number):BallOutcome{ return r===6?'SIX':r===4?'FOUR':r===3?'THREE':r===2?'TWO':r===1?'ONE':'DOT'; }
