# GOAT Cricket 3D — Release Candidate 1

RC1 is the cleaned release package built from Production Phase E.

## Included
- Next.js + React + React Three Fiber project
- 10-over and 20-over match selection
- Toss and bat/bowl decision
- Playable prototype delivery loop
- Batting direction, power and timing controls
- Bowling control hooks
- Fielding/fielder selection
- Wicket/catch/run-out foundations
- Score, wickets, overs, CRR and RRR
- Broadcast camera controls
- Six supplied character reference images
- Production/multiplayer/mobile architecture from earlier phases

## Verification status
A clean dependency install/build could not be completed in the packaging environment because `npm install` timed out before dependencies were installed. Therefore this package is **not claimed as build-verified**.

## Local verification
```bash
npm install
npm run build
npm run start
```

Open the local app and test both 10-over and 20-over flows from toss through result.

## Vercel
Import the repository/project into Vercel. The project uses the standard Next.js build flow; no custom server is required for the single-player prototype. Multiplayer networking remains an architecture/foundation layer and requires a realtime backend for production.
