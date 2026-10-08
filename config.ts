export const RELEASE_CONFIG={
 matchFormats:[10,20],
 difficulty:['easy','normal','hard','pro','legend'],
 features:{drs:true,career:true,tournament:true,multiplayer:true},
 network:{tickRate:30,maxPlayers:2,reconnectWindowMs:30000}
} as const;
