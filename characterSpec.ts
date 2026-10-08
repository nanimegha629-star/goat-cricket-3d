export type CharacterIdentitySource = 'REFERENCE_PHOTO' | 'ORIGINAL_DESIGN';
export type CharacterRole = 'BATTER' | 'ALL_ROUNDER' | 'BOWLER' | 'WICKETKEEPER';

export interface CharacterSpec {
  id: string;
  displayName: string;
  team: 'HERO_XI' | 'VILLAIN_XI';
  role: CharacterRole;
  identitySource: CharacterIdentitySource;
  referenceAsset?: string;
  jersey: number;
  attributes: {
    batting: number; bowling: number; pace: number; spin: number;
    swing: number; seam: number; stamina: number; fielding: number;
    catching: number; wicketkeeping: number; aggression: number; composure: number;
  };
}
