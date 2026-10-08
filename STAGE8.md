# GOAT Cricket 3D — Stage 8

Stage 8 connects the Stage 6 physics foundation and Stage 7 presentation to a procedural player-motor and bat/ball collision layer.

## Added
- Bat-ball collision calculation using timing, bat reach, skill, direction and power.
- Launch vector, edge/loft classification and distance-based run estimation.
- Ball integration with gravity and pitch bounce.
- Procedural player motor for running/sprinting/dive/pickup/throw/catch states.
- Runtime contact resolver used by the playable scene.
- Keyboard/touch-friendly batting controls can feed direction, power and timing into the runtime.

## Scope honesty
This stage uses procedural geometry and math; it does not claim production motion-capture clips, photorealistic rigs, or licensed likeness models. Those assets can be plugged into these state hooks later.
