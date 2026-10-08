export interface StadiumShowConfig { signs:string[]; crowdHome:string; floodlights:boolean; entranceMusic:string; }
export const stadiumShow: StadiumShowConfig = {
 signs:['WANTED — SUDHEER','GOAT','NOVEMBER 12'], crowdHome:'SUDHEER FANS', floodlights:true, entranceMusic:'GOAT_MAIN_THEME'
};
export const crowdReaction = (cue:string) => ({cue, intensity: cue==='SIX'||cue==='MATCH_WIN' ? 1 : cue==='WICKET' ? .7 : .4});
