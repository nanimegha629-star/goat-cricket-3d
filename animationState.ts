export type AnimationState = 'idle'|'runup'|'delivery'|'bat'|'followThrough'|'sprint'|'dive'|'pickup'|'throw'|'catch'|'stump'|'appeal'|'celebrate';
export type AnimationClipMap = Record<AnimationState,string>;
export const defaultClips: AnimationClipMap = {
  idle:'idle', runup:'bowler_runup', delivery:'bowler_delivery', bat:'bat_shot',
  followThrough:'bat_follow_through', sprint:'fielder_sprint', dive:'fielder_dive',
  pickup:'fielder_pickup', throw:'fielder_throw', catch:'fielder_catch', stump:'keeper_stumping',
  appeal:'umpire_appeal', celebrate:'team_celebration'
};
