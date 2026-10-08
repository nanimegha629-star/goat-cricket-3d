import {DeliveryType, BallOutcome, MatchState, applyOutcome, outcomeFromRuns} from './matchEngine';
import {resolveBatContact} from './stage8Runtime';
export type DeliveryRequest={type:DeliveryType;pace:number;line:number;length:number;timing:number;direction:number;power:number;batSkill:number;bowlingSkill:number;freeHit:boolean};
export type DeliveryResult={state:MatchState;outcome:BallOutcome;runs:number;contact:'miss'|'contact'|'edge'|'loft';ballSpeed:number;message:string;boundary:boolean;wicket:boolean};
export function simulateDelivery(state:MatchState,d:DeliveryRequest):DeliveryResult{
 const difficulty=Math.max(0,Math.min(1,d.bowlingSkill*.55+d.pace/10*.2+Math.abs(d.line)*.1));
 const timingShift=d.type==='yorker'?.05:d.type==='bouncer'?.08:d.type==='slower'?.-0.04:0;
 const timing=Math.max(0,Math.min(1,d.timing+timingShift));
 const contact=resolveBatContact({x:d.line*.6,y:.55,z:9.85},{position:{x:0,y:1,z:10},swing:1,direction:d.direction,power:d.power},timing,d.batSkill);
 let runs=0; let outcome:BallOutcome='DOT';
 if(contact.result.hit){const quality=contact.result.quality; if(contact.result.loft&&contact.result.speed>19&&quality>.65)runs=6; else if(contact.result.speed>16&&quality>.52)runs=4; else if(contact.result.speed>12&&quality>.45)runs=2; else if(contact.result.speed>8&&quality>.30)runs=1;}
 const edgeWicket=contact.phase==='edge'&&Math.random()<(.12+difficulty*.25);
 const missWicket=!contact.result.hit&&!d.freeHit&&Math.random()<(.05+difficulty*.18);
 if(edgeWicket||missWicket){outcome='WICKET';runs=0}else outcome=outcomeFromRuns(runs);
 const next=applyOutcome(state,outcome,runs);
 const msg=outcome==='WICKET'?(edgeWicket?'OUT! Thick edge and a sharp catch.':'BOWLED! The delivery beats the bat.') : outcome==='SIX'?'SIX! Maximum.':outcome==='FOUR'?'FOUR!':outcome==='DOT'?'Dot ball.':`${runs} run${runs>1?'s':''}.`;
 return {state:next,outcome,runs,contact:contact.phase,ballSpeed:contact.result.speed,message:msg,boundary:runs===4||runs===6,wicket:outcome==='WICKET'};
}
