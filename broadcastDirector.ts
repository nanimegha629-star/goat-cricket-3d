export type CameraMode='BROADCAST'|'BOWLER'|'BATTER'|'KEEPER'|'BOUNDARY'|'CLOSE_UP'|'SIX'|'WICKET_REPLAY';
export const cameraModes: CameraMode[]=['BROADCAST','BOWLER','BATTER','KEEPER','BOUNDARY','CLOSE_UP','SIX','WICKET_REPLAY'];
export function cameraPosition(mode:CameraMode){
 switch(mode){
  case 'BOWLER': return [0,4,-15] as const; case 'BATTER': return [5,3,13] as const;
  case 'KEEPER': return [0,3,15] as const; case 'BOUNDARY': return [11,5,-5] as const;
  case 'CLOSE_UP': return [4,2,10] as const; case 'SIX': return [7,8,4] as const;
  case 'WICKET_REPLAY': return [-5,4,8] as const; default:return [0,7,17] as const;
 }
}
