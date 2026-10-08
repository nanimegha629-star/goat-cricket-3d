export type MotorState='idle'|'run'|'sprint'|'dive'|'pickup'|'throw'|'catch'|'bat'|'followThrough'|'bowl';
export type Motor={position:{x:number;y:number;z:number};velocity:{x:number;z:number};state:MotorState;stamina:number};
export function moveToward(m:Motor,target:{x:number;z:number},dt:number,sprint=false):Motor{
 const dx=target.x-m.position.x,dz=target.z-m.position.z,d=Math.hypot(dx,dz)||1; const speed=(sprint?7:4.5)*(0.65+0.35*m.stamina);
 const step=Math.min(d,speed*dt); const stamina=Math.max(0,m.stamina-(sprint?.045:.015)*dt);
 return {...m,position:{x:m.position.x+dx/d*step,y:m.position.y,z:m.position.z+dz/d*step},velocity:{x:dx/d*speed,z:dz/d*speed},state:sprint?'sprint':'run',stamina};
}
export function resetMotor(position:{x:number;y:number;z:number}):Motor{return {position,velocity:{x:0,z:0},state:'idle',stamina:1}}
