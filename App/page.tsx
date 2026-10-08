"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { cameraModes, cameraPosition, type CameraMode } from "../game/camera/broadcastDirector";
import { chooseFielder } from "../game/runtime/livePlay";
import { fieldingEvent } from "../game/runtime/stage7Runtime";
import { resolveBatContact, runsFromLaunch } from "../game/runtime/stage8Runtime";

type Phase = "toss" | "choice" | "ready" | "play" | "inningsBreak" | "result";
type Mode = 10 | 20;
type Team = "HERO XI" | "VILLAIN XI";
type BallResult = "dot" | "1" | "2" | "3" | "4" | "6" | "W";
type Dismissal = "bowled" | "caught" | "run out" | "stumped";

const oversOptions: Mode[] = [10, 20];
const fieldPositions: [number, number, number][] = [
  [-6, 0, -5], [6, 0, -5], [-8, 0, 2], [8, 0, 2], [-6, 0, 7], [6, 0, 7], [-3, 0, -12], [3, 0, -12], [-10, 0, -8], [10, 0, -8], [0, 0, -14]
];

function Pitch() {
  return <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[70, 70]} /><meshStandardMaterial color="#214d2b" /></mesh>
    <mesh position={[0, .03, 0]}><boxGeometry args={[3.7, .08, 24]} /><meshStandardMaterial color="#c9ae79" /></mesh>
    {[-10, 10].map((z) => <group key={z}><mesh position={[0, .075, z]}><boxGeometry args={[3.7, .02, .06]} /><meshStandardMaterial color="white" /></mesh><mesh position={[-1.7,.22,z]}><boxGeometry args={[.06,.44,.08]} /><meshStandardMaterial color="white" /></mesh><mesh position={[1.7,.22,z]}><boxGeometry args={[.06,.44,.08]} /><meshStandardMaterial color="white" /></mesh></group>)}
  </>;
}

function Stadium() {
  return <>
    <ambientLight intensity={1.25} /><directionalLight position={[8,16,8]} intensity={3.5} castShadow /><Environment preset="night" /><Pitch />
    <mesh position={[0,1.5,-18]}><cylinderGeometry args={[13,13,1,64,1,true]} /><meshStandardMaterial color="#111827" side={THREE.DoubleSide} /></mesh>
    <Text position={[-7,3.2,-17.35]} fontSize={.85} color="#fff" anchorX="center">WANTED — SUDHEER</Text>
    <Text position={[7,3.2,-17.35]} fontSize={.8} color="#f59e0b" anchorX="center">GOAT</Text>
    <Text position={[0,2.15,-17.35]} fontSize={.65} color="#fff" anchorX="center">NOVEMBER 12</Text>
  </>;
}

function Player({ position, color = "#e5e7eb", scale = 1, selected = false }: { position:[number,number,number]; color?:string; scale?:number; selected?:boolean }) {
  return <group position={position} scale={scale}>
    <mesh position={[0,.8,0]} castShadow><capsuleGeometry args={[.27,.75,8,16]} /><meshStandardMaterial color={selected ? "#fbbf24" : color} /></mesh>
    <mesh position={[0,1.55,0]} castShadow><sphereGeometry args={[.22,16,16]} /><meshStandardMaterial color="#a9684b" /></mesh>
  </group>;
}

function Fielders({ selectedFielder, fielding, target }: { selectedFielder:number; fielding:boolean; target:[number,number,number] }) {
  return <group>{fieldPositions.map((p,i)=>{
    const move=fielding&&i===selectedFielder;
    const x=move?p[0]+(target[0]-p[0])*.45:p[0]; const z=move?p[2]+(target[2]-p[2])*.45:p[2];
    return <Player key={i} position={[x,0,z]} color={i===10 ? "#0f172a" : "#334155"} selected={i===selectedFielder} scale={move?1.08:1}/>;
  })}</group>;
}

function MovingBall({ active, target, cameraMode, onDone }: { active:boolean; target:"batter"|"field"|"boundary"; cameraMode:CameraMode; onDone:()=>void }) {
  const ref=useRef<THREE.Mesh>(null); const t=useRef(0);
  useFrame((_,delta)=>{
    if(!active||!ref.current)return;
    t.current=Math.min(1,t.current+delta*1.35);
    const end=target==='batter'?{x:0,y:.5,z:9}:{x:target==='boundary'?7:5,y:.55,z:target==='boundary'?-10:-2};
    const p=target==='batter'?{x:0,y:2.0,z:10}:{x:end.x/2,y:5,z:4};
    const u=target==='batter'?t.current:Math.min(1,t.current*1.15);
    const x=(1-u)*(1-u)*0+2*(1-u)*u*p.x+u*u*end.x;
    const y=(1-u)*(1-u)*.42+2*(1-u)*u*p.y+u*u*end.y;
    const z=(1-u)*(1-u)*10+2*(1-u)*u*p.z+u*u*end.z;
    ref.current.position.set(x,y,z); ref.current.rotation.x+=delta*18;
    if(t.current>=1){t.current=0;onDone();}
  });
  return <mesh ref={ref} position={[0,.42,10]} visible={active} castShadow><sphereGeometry args={[.095,16,16]}/><meshStandardMaterial color="#8b1e1e"/></mesh>;
}

function AppScene({ ballActive, ballTarget, swing, selectedFielder, fielding, cameraMode, fieldTarget }: { ballActive:boolean; ballTarget:"batter"|"field"|"boundary"; swing:number; selectedFielder:number; fielding:boolean; cameraMode:CameraMode; fieldTarget:[number,number,number] }) {
  const pos=cameraPosition(cameraMode);
  return <Canvas shadows camera={{position:[...pos],fov:52}}>
    <Stadium/><Batter swing={swing}/><Bowler active={ballActive}/><Fielders selectedFielder={selectedFielder} fielding={fielding} target={fieldTarget}/>
    <MovingBall active={ballActive} target={ballTarget} cameraMode={cameraMode} onDone={()=>{}}/>
    <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2.03} minDistance={8} maxDistance={30}/>
  </Canvas>;
}

function randomBatResult(): Exclude<BallResult,"W"> { const r=Math.random(); if(r<.40)return"dot"; if(r<.56)return"1"; if(r<.68)return"2"; if(r<.70)return"3"; if(r<.89)return"4"; return"6"; }

export default function Home(){
  const [phase,setPhase]=useState<Phase>("toss"), [call,setCall]=useState<"Heads"|"Tails"|null>(null), [coin,setCoin]=useState<"Heads"|"Tails"|null>(null), [decision,setDecision]=useState<"Bat"|"Bowl"|null>(null), [mode,setMode]=useState<Mode>(10);
  const [innings,setInnings]=useState(1), [score,setScore]=useState(0), [wickets,setWickets]=useState(0), [balls,setBalls]=useState(0), [target,setTarget]=useState<number|null>(null);
  const [batterRuns,setBatterRuns]=useState(0), [bowlerRuns,setBowlerRuns]=useState(0), [last,setLast]=useState("Ready"), [commentary,setCommentary]=useState("Choose Heads or Tails");
  const [ballActive,setBallActive]=useState(false), [ballTarget,setBallTarget]=useState<"batter"|"field"|"boundary">("batter"), [swing,setSwing]=useState(0), [batting,setBatting]=useState<Team>("HERO XI"), [winner,setWinner]=useState<Team|null>(null), [locked,setLocked]=useState(false);
  const [selectedFielder,setSelectedFielder]=useState(10), [fielding,setFielding]=useState(false), [dismissal,setDismissal]=useState<Dismissal|null>(null), [fielderMessage,setFielderMessage]=useState("Wicketkeeper ready");
  const [cameraMode,setCameraMode]=useState<CameraMode>("BROADCAST");
  const [shotDirection,setShotDirection]=useState(0);
  const [shotPower,setShotPower]=useState(0.65);
  const [timing,setTiming]=useState(0.5);
  const [fieldTarget,setFieldTarget]=useState<[number,number,number]>([5,.5,-2]);

  const maxBalls=mode*6, over=Math.floor(balls/6), ballInOver=balls%6;
  const currentRate=balls?(score/(balls/6)).toFixed(2):"0.00";
  const requiredRate=target!==null&&innings===2&&balls<maxBalls?Math.max(0,(target-score)/((maxBalls-balls)/6)).toFixed(2):"—";
  const title=useMemo(()=>innings===1?`${batting} — INNINGS 1`:`${batting} — CHASE`,[innings,batting]);

  function toss(c:"Heads"|"Tails"){const r=Math.random()<.5?"Heads":"Tails";setCall(c);setCoin(r);setPhase("choice");}
  function beginMatch(choice:"Bat"|"Bowl"){setDecision(choice);setBatting(choice==="Bat"?"HERO XI":"VILLAIN XI");setPhase("ready");}
  function startMatch(){setPhase("play");setCommentary("First ball. Bowler is ready.");}
  function nextInnings(){const t=score+1;setTarget(t);setScore(0);setWickets(0);setBalls(0);setBatterRuns(0);setBowlerRuns(0);setLast("Innings 2");setInnings(2);setBatting(batting==="HERO XI"?"VILLAIN XI":"HERO XI");setPhase("play");setCommentary(`Target ${t}. Chase begins.`);}
  function finish(){const other=batting==="HERO XI"?"VILLAIN XI":"HERO XI";const win=innings===2&&target!==null&&score>=target?batting:other;setWinner(win);setPhase("result");setCommentary(`${win} win the match.`);}
  function handleFielding(result:Exclude<BallResult,"dot"|"1"|"2"|"3"|"4"|"6">|BallResult){
    if(result==="W") return;
    setFielding(true); const idx=chooseFielder({x:5,y:.5,z:-2},fieldPositions.map(p=>({x:p[0],y:p[1],z:p[2]}))); setSelectedFielder(idx); setFieldTarget([5,.5,-2]); setFielderMessage("Ball in the field — choose a fielder to control");
  }
  function resolveFielding(r:number){
    setFielding(false);
    const event=fieldingEvent(r>0,false); setFielderMessage(event.message);
    const catchChance = r===6 ? .08 : r===4 ? .16 : .28;
    const runoutChance = r>0 ? .10 : .03;
    const roll=Math.random();
    if(roll<catchChance){setDismissal("caught");setWickets(w=>w+1);setLast("W — CAUGHT");setCommentary(`CAUGHT! Fielder ${selectedFielder+1} takes a sharp catch.`);setFielderMessage("Safe hands! Catch completed.");return;}
    if(roll<catchChance+runoutChance){setDismissal("run out");setWickets(w=>w+1);setLast("W — RUN OUT");setCommentary(`RUN OUT! Fielder ${selectedFielder+1} fires a direct hit.`);setFielderMessage("Direct hit at the stumps!");return;}
    setCommentary(r===4?"FOUR! Fielding team saves nothing.":r===6?"SIX! Over the boundary.":`${r} run${r===1?"":"s"}. Fielder returns the ball.`);
    setFielderMessage("Fielded cleanly — throw returned to the keeper.");
  }
  function deliver(){
    if(locked||phase!=="play"||fielding)return;
    setLocked(true);setBallActive(true);setBallTarget("batter");setSwing(0);setCommentary("Bowler delivers… use timing, direction and power!");
    window.setTimeout(()=>{
      setBallActive(false);
      const contact=resolveBatContact({x:0,y:.55,z:9.85},{position:{x:0,y:1,z:10},swing:1,direction:shotDirection,power:shotPower},timing,.72);
      const launchRuns=runsFromLaunch(contact.result);
      let result:BallResult=launchRuns===6?"6":launchRuns===4?"4":launchRuns===2?"2":launchRuns===1?"1":"dot";
      if(!contact.result.hit && Math.random()<.16) result="W";
      if(contact.phase==="edge" && Math.random()<.28) result="W";
      setBalls(b=>b+1);
      if(result==="W"){setWickets(w=>w+1);setDismissal(Math.random()<.5?"bowled":"caught");setLast("W");setCommentary("OUT! The batter is dismissed.");setBallTarget("field");}
      else {const r=result==="dot"?0:Number(result);setScore(s=>s+r);setBatterRuns(s=>s+r);setBowlerRuns(s=>s+r);setLast(result);setBallTarget(r>=4?"boundary":"field");if(r===0)setCommentary("Dot ball. Good pressure.");else setCommentary(`${r} run${r>1?"s":""}. Fielders move in.`);handleFielding(result);}
      setLocked(false);
    },800);
  }
  function inningOver(){return balls>=maxBalls||wickets>=10||(innings===2&&target!==null&&score>=target);}
  useEffect(()=>{if(phase!=="play"||locked||fielding)return;if(inningOver()){window.setTimeout(()=>{if(innings===1)setPhase("inningsBreak");else finish();},650);} // eslint-disable-next-line react-hooks/exhaustive-deps
  },[balls,score,wickets,fielding]);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(phase!=="play")return;
      if(e.key==="ArrowLeft")setShotDirection(d=>Math.max(-1.35,d-.18));
      if(e.key==="ArrowRight")setShotDirection(d=>Math.min(1.35,d+.18));
      if(e.key==="ArrowUp")setShotPower(p=>Math.min(1,p+.08));
      if(e.key==="ArrowDown")setShotPower(p=>Math.max(.15,p-.08));
      if(e.code==="Space"&&!locked&&!fielding)deliver();
    }; window.addEventListener("keydown",onKey); return ()=>window.removeEventListener("keydown",onKey);
  });

  return <main className="game"><header className="header"><div className="logo">GOAT CRICKET 3D</div><div className="release">RELEASE CANDIDATE 1 • PLAYABLE CORE</div></header><section className="stage">
    <AppScene ballActive={ballActive} ballTarget={ballTarget} swing={swing} selectedFielder={selectedFielder} fielding={fielding} cameraMode={cameraMode} fieldTarget={fieldTarget}/>
    <div className="overlay"><div className="card score"><strong>{score}/{wickets}</strong><small>{over}.{ballInOver} overs • {mode} overs</small><small>CRR {currentRate} • RRR {requiredRate}</small><small>{title}</small><small>BATTER {batterRuns} • BOWLER {bowlerRuns}</small></div>
    <div className="card banner"><b>WANTED — SUDHEER</b><small>GOAT • NOVEMBER 12</small></div>

    {(phase==="toss"||phase==="choice"||phase==="ready")&&<div className="card toss">
      {phase==="toss"&&<><h1>CAPTAINS AT THE CENTRE</h1><p>Select match length, then call the toss.</p><div className="modeRow">{oversOptions.map(o=><button key={o} className={`mode ${mode===o?"selected":""}`} onClick={()=>setMode(o)}>{o} OVERS</button>)}</div><div className="buttons"><button className="btn primary" onClick={()=>toss("Heads")}>HEADS</button><button className="btn dark" onClick={()=>toss("Tails")}>TAILS</button></div></>}
      {phase==="choice"&&<><h1>{coin===call?"TOSS WON!":"TOSS LOST"}</h1><p>Coin: <b>{coin}</b> • Your call: <b>{call}</b></p>{coin===call?<><p>Sudheer, choose to bat or bowl.</p><div className="buttons"><button className="btn primary" onClick={()=>beginMatch("Bat")}>BAT</button><button className="btn dark" onClick={()=>beginMatch("Bowl")}>BOWL</button></div></>:<div className="buttons"><button className="btn primary" onClick={()=>beginMatch("Bowl")}>CONTINUE</button></div>}</>}
      {phase==="ready"&&<><h1>MATCH READY</h1><p>{mode}-over match • 11 vs 11 • {decision}</p><p>RC1 core: toss, 10/20 overs, batting, bowling, fielding, wickets and scoreboard.</p><button className="btn primary" onClick={startMatch}>START FIRST BALL</button></>}
    </div>}

    {phase==="play"&&<><div className="card commentary"><b>{last}</b><span>{commentary}</span></div><div className="card controls"><button className="btn primary" disabled={locked||fielding} onClick={()=>{setSwing(s=>s===0?1:0);deliver();}}>SWING / SPACE</button><button className="btn dark" disabled={locked||fielding} onClick={()=>{setShotPower(.3);setTiming(.48);deliver();}}>DEFEND</button><label>DIR <input aria-label="shot direction" type="range" min="-1.35" max="1.35" step="0.05" value={shotDirection} onChange={e=>setShotDirection(Number(e.target.value))}/></label><label>POWER <input aria-label="shot power" type="range" min=".15" max="1" step=".05" value={shotPower} onChange={e=>setShotPower(Number(e.target.value))}/></label><label>TIMING <input aria-label="shot timing" type="range" min="0" max="1" step=".02" value={timing} onChange={e=>setTiming(Number(e.target.value))}/></label><span>ARROWS = AIM/POWER • SPACE = SWING</span></div><div className="card bowlerPanel"><span>PACE</span><input type="range" min="1" max="10" defaultValue="6"/><span>LINE & LENGTH</span><button className="mini" disabled={locked||fielding} onClick={deliver}>BOWL</button></div><div className="card cameraPanel"><b>BROADCAST CAMERA</b><div className="cameraGrid">{cameraModes.map(m=><button key={m} className={`mini ${cameraMode===m?"selectedMini":""}`} onClick={()=>setCameraMode(m)}>{m.replace("_"," ")}</button>)}</div></div></>}

    {fielding&&<div className="card fieldPanel"><h2>FIELDING PHASE</h2><p>{fielderMessage}</p><div className="fielderGrid">{fieldPositions.map((_,i)=><button key={i} className={`mini ${selectedFielder===i?"selectedMini":""}`} onClick={()=>setSelectedFielder(i)}>{i===10?"WK":`F${i+1}`}</button>)}</div><button className="btn primary" onClick={()=>resolveFielding(Number(selectedFielder))}>THROW / COMPLETE PLAY</button></div>}

    {phase==="inningsBreak"&&<div className="card toss"><h1>INNINGS BREAK</h1><p>{batting} finished on <b>{score}/{wickets}</b> after {over}.{ballInOver} overs.</p><p>Target for the other team: <b>{score+1}</b></p><button className="btn primary" onClick={nextInnings}>START INNINGS 2</button></div>}
    {phase==="result"&&<div className="card toss"><h1>{winner} WIN!</h1><p>Final score: <b>{score}/{wickets}</b> • {mode} overs</p><p>{commentary}</p><button className="btn primary" onClick={()=>location.reload()}>NEW MATCH</button></div>}
    </div></section></main>;
}
