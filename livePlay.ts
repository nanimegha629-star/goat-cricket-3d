export type Vec3 = { x:number; y:number; z:number };
export type PlayOutcome = { runs:number; wicket:boolean; dismissal?:string; contactQuality:number };

export function lerp(a:number,b:number,t:number){ return a+(b-a)*t; }
export function bezier3(a:Vec3,b:Vec3,c:Vec3,t:number):Vec3{
  const u=1-t;
  return {x:u*u*a.x+2*u*t*b.x+t*t*c.x,y:u*u*a.y+2*u*t*b.y+t*t*c.y,z:u*u*a.z+2*u*t*b.z+t*t*c.z};
}
export function contactQuality(timing:number,skill:number){
  const timingScore=Math.max(0,1-Math.abs(timing-.5)*2);
  return Math.max(0,Math.min(1,timingScore*.7+skill*.3));
}
export function chooseFielder(ball:Vec3, fielders:Vec3[]){
  let best=0,bestD=Infinity;
  fielders.forEach((p,i)=>{const d=(p.x-ball.x)**2+(p.z-ball.z)**2;if(d<bestD){bestD=d;best=i;}});
  return best;
}
