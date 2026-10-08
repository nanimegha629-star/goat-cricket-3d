export interface RunoutCheck { runnerDistance:number; throwDistance:number; releaseDelay:number; keeperReaction:number; }
export function resolveRunout(c:RunoutCheck): 'OUT'|'SAFE' {
  const arrival = c.releaseDelay + c.throwDistance * 0.035 + c.keeperReaction;
  return arrival < c.runnerDistance ? 'OUT' : 'SAFE';
}
