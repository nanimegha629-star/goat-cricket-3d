# Production character asset pipeline

1. Model each character as a game-ready humanoid mesh.
2. Preserve the six supplied reference images only as identity/appearance references.
3. Create separate original designs for the 16 additional players.
4. Rig with a consistent humanoid skeleton.
5. Add facial blendshapes/expressions where licensed and technically appropriate.
6. Retarget the cricket animation library onto the common skeleton.
7. Create LOD0/LOD1/LOD2 meshes and texture budgets for mobile.
8. Validate silhouette, hands, feet, bat grip, helmet and uniform intersections.
9. Export GLB/GLTF with animations separated into reusable clips.

Required animation groups: idle, walk, sprint, run-between-wickets, bat-defend, drive,
cut, pull, sweep, loft, bowl-fast, bowl-spin, appeal, pickup, throw, dive, catch,
stumping, wicket celebration, disappointment, umpire signals.
