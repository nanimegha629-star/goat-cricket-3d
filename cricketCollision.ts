export type Vec3 = {x:number;y:number;z:number};
export type BatPose = {position:Vec3; swing:number; direction:number; power:number};
export type CollisionResult = {hit:boolean; quality:number; launch:Vec3; speed:number; edge:boolean; loft:boolean};

export function distance(a:Vec3,b:Vec3){return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)}
export function batBallCollision(ball:Vec3, bat:BatPose, timing:number, skill:number):CollisionResult{
  const reach=0.95+skill*.25;
  const d=distance(ball,bat.position);
  const timingError=Math.abs(timing-.5)*2;
  const quality=Math.max(0,Math.min(1,(1-timingError)*.7+skill*.3));
  const hit=d<reach && quality>.18;
  const angle=bat.direction;
  const power=Math.max(.2,Math.min(1,bat.power*.55+quality*.45));
  const edge=hit && quality<.38;
  const loft=hit && power>.68;
  return {hit,quality,launch:{x:Math.sin(angle)*power*13,y:loft?2.5+power*4:.55+power,z:Math.cos(angle)*power*13},speed:7+power*16,edge,loft};
}

export function advanceBall(position:Vec3,velocity:Vec3,dt:number,gravity=14){
  const v={...velocity}; v.y-=gravity*dt;
  const p={x:position.x+v.x*dt,y:position.y+v.y*dt,z:position.z+v.z*dt};
  if(p.y<.12){p.y=.12;v.y=Math.abs(v.y)*.48;v.x*=.86;v.z*=.86}
  return {position:p,velocity:v};
}
