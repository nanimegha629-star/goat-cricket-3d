export type ChallengeObjective = { id:string; label:string; target:number; progress:number; completed:boolean };
export const defaultChallenges: ChallengeObjective[] = [
 {id:'powerplay',label:'Score 35 runs in the first 3 overs',target:35,progress:0,completed:false},
 {id:'defend',label:'Defend 8 runs or fewer in the final over',target:8,progress:0,completed:false},
 {id:'three_wickets',label:'Take 3 wickets in an innings',target:3,progress:0,completed:false},
];
