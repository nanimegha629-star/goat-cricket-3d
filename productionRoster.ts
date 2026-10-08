import { CharacterSpec } from './characterSpec';

// Production asset manifest. The six supplied reference images remain identity sources;
// they are not automatically converted into 3D models by this code.
export const productionRoster: CharacterSpec[] = [
  { id:'hero', displayName:'Sudheer', team:'HERO_XI', role:'BATTER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/hero.jpg', jersey:7,
    attributes:{batting:92,bowling:52,pace:45,spin:35,swing:40,seam:35,stamina:88,fielding:84,catching:86,wicketkeeping:20,aggression:86,composure:90}},
  { id:'heroine', displayName:'Heroine', team:'HERO_XI', role:'ALL_ROUNDER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/heroine.jpg', jersey:18,
    attributes:{batting:84,bowling:78,pace:58,spin:70,swing:62,seam:55,stamina:90,fielding:88,catching:90,wicketkeeping:25,aggression:76,composure:84}},
  { id:'hero-friend', displayName:"Hero's Friend", team:'HERO_XI', role:'ALL_ROUNDER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/hero-friend.jpg', jersey:12,
    attributes:{batting:79,bowling:74,pace:68,spin:42,swing:64,seam:70,stamina:87,fielding:82,catching:84,wicketkeeping:20,aggression:72,composure:78}},
  { id:'villain-1', displayName:'Villain 1', team:'VILLAIN_XI', role:'BATTER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/villain-1.jpg', jersey:1,
    attributes:{batting:94,bowling:45,pace:40,spin:30,swing:35,seam:30,stamina:86,fielding:80,catching:82,wicketkeeping:20,aggression:94,composure:82}},
  { id:'villain-2', displayName:'Villain 2', team:'VILLAIN_XI', role:'ALL_ROUNDER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/villain-2.jpg', jersey:8,
    attributes:{batting:82,bowling:82,pace:72,spin:60,swing:68,seam:62,stamina:91,fielding:86,catching:88,wicketkeeping:20,aggression:80,composure:86}},
  { id:'villain-3', displayName:'Villain 3', team:'VILLAIN_XI', role:'ALL_ROUNDER', identitySource:'REFERENCE_PHOTO', referenceAsset:'/characters/villain-3.jpg', jersey:9,
    attributes:{batting:78,bowling:80,pace:88,spin:25,swing:74,seam:72,stamina:84,fielding:78,catching:80,wicketkeeping:20,aggression:92,composure:70}},
];
