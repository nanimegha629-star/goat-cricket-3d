import { AnimationState } from '../animation/animationState';
export type RuntimeEvent={state:AnimationState; message:string};
export function fieldingEvent(runs:number,wicket:boolean):RuntimeEvent{
 if(wicket) return {state:runs===0?'catch':'throw',message:runs===0?'FIELDING: wicket attempt':'FIELDING: run-out attempt'};
 return {state:runs>0?'throw':'pickup',message:runs>0?'FIELDING: return throw':'FIELDING: clean pickup'};
}
