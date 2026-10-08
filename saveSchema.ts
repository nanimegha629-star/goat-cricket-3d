export interface SaveData { version:1; career:{xp:number;level:number;matches:number;runs:number;wickets:number;trophies:number}; settings:{difficulty:string;format:'10_OVERS'|'20_OVERS';camera:string;audio:number}; unlocked:string[]; }
export const SAVE_VERSION = 1;
export function migrateSave(input: Partial<SaveData>): SaveData { return {version:1,career:{xp:0,level:1,matches:0,runs:0,wickets:0,trophies:0,...input.career},settings:{difficulty:'NORMAL',format:'10_OVERS',camera:'BROADCAST',audio:1,...input.settings},unlocked:input.unlocked??[]}; }
