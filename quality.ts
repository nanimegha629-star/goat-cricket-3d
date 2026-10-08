export type QualityTier='low'|'medium'|'high'|'ultra';
export function qualityForDevice(isMobile:boolean, hardwareScore:number):QualityTier {
  if(isMobile) return hardwareScore>=0.8?'high':hardwareScore>=0.45?'medium':'low';
  return hardwareScore>=0.9?'ultra':hardwareScore>=0.65?'high':hardwareScore>=0.35?'medium':'low';
}
