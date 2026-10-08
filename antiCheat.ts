export type ValidationResult = { ok:boolean; reason?:string };
export function validateInput(input:{type:string; tick:number}, serverTick:number):ValidationResult {
  if (!Number.isInteger(input.tick)) return {ok:false,reason:'invalid tick'};
  if (Math.abs(input.tick-serverTick)>120) return {ok:false,reason:'stale/future input'};
  if (!input.type) return {ok:false,reason:'missing input type'};
  return {ok:true};
}
