import {batBallCollision,type BatPose,type Vec3,type CollisionResult} from '../physics/cricketCollision';
export type ContactDecision={result:CollisionResult;phase:'miss'|'contact'|'edge'|'loft'};
export function resolveBatContact(ball:Vec3,bat:BatPose,timing:number,skill:number):ContactDecision{
 const result=batBallCollision(ball,bat,timing,skill);
 return {result,phase:!result.hit?'miss':result.edge?'edge':result.loft?'loft':'contact'};
}
export function runsFromLaunch(c:CollisionResult):number{
 if(!c.hit)return 0; if(c.loft&&c.speed>19)return 6; if(c.speed>16)return 4; if(c.speed>11)return 2; if(c.speed>8)return 1; return 0;
}
