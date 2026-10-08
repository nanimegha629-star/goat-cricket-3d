export type ControlAction = 'MOVE_LEFT'|'MOVE_RIGHT'|'MOVE_FORWARD'|'MOVE_BACK'|'SHOT_DEFEND'|'SHOT_DRIVE'|'SHOT_CUT'|'SHOT_PULL'|'SHOT_SWEEP'|'SHOT_LOFT'|'SPRINT'|'DIVE'|'THROW'|'CATCH'|'BOWL_RELEASE';
export interface TouchBinding { action:ControlAction; label:string; x:number; y:number; radius:number; }
export const defaultTouchLayout: TouchBinding[] = [
  {action:'MOVE_LEFT',label:'←',x:.10,y:.78,radius:.06},{action:'MOVE_RIGHT',label:'→',x:.22,y:.78,radius:.06},
  {action:'SHOT_DEFEND',label:'DEF',x:.72,y:.78,radius:.055},{action:'SHOT_DRIVE',label:'DRIVE',x:.84,y:.72,radius:.055},
  {action:'SHOT_LOFT',label:'LOFT',x:.86,y:.84,radius:.055},{action:'SPRINT',label:'RUN',x:.64,y:.88,radius:.055},
];
