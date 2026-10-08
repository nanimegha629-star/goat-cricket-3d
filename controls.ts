export type MobileAction='move'|'aim'|'shot'|'sprint'|'dive'|'switchFielder'|'throw';
export const DEFAULT_LAYOUT:Record<MobileAction,{x:number;y:number;size:number}>={
 move:{x:.14,y:.78,size:.18}, aim:{x:.50,y:.72,size:.14}, shot:{x:.82,y:.72,size:.16}, sprint:{x:.72,y:.86,size:.10}, dive:{x:.86,y:.86,size:.10}, switchFielder:{x:.92,y:.18,size:.08}, throw:{x:.82,y:.52,size:.12}
};
