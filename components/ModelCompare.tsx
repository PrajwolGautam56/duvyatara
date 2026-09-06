"use client";
import { useState } from "react";
import type { Tractor } from "@/lib/data";
import { Scale, X } from "lucide-react";
export default function ModelCompare({models}:{models:Tractor[]}){
  const [selected,setSelected]=useState<string[]>([]);const [open,setOpen]=useState(false);const chosen=models.filter(m=>selected.includes(m.slug));
  function toggle(slug:string){setSelected(s=>s.includes(slug)?s.filter(x=>x!==slug):s.length<3?[...s,slug]:s)}
  return <><div className="compare-picker"><div><h3>Compare models</h3><p>Select up to three tractors.</p></div><div className="compare-options">{models.map(m=><label key={m.slug}><input type="checkbox" checked={selected.includes(m.slug)} onChange={()=>toggle(m.slug)} disabled={selected.length===3&&!selected.includes(m.slug)}/>{m.name}</label>)}</div><button className="button primary" disabled={chosen.length<2} onClick={()=>setOpen(true)}><Scale size={17}/>Compare {chosen.length||""}</button></div>{open&&<div className="compare-modal" role="dialog" aria-modal="true"><div className="compare-box"><button className="compare-close" onClick={()=>setOpen(false)} aria-label="Close"><X/></button><p className="eyebrow green">SIDE-BY-SIDE</p><h2>Model comparison</h2><div className="compare-table"><div className="compare-row"><b>Model</b>{chosen.map(m=><strong key={m.slug}>{m.name}</strong>)}</div>{[["Power","hp"],["Drive","drive"],["Engine","engine"],["Lift","lift"],["Gearbox","gearbox"]].map(([label,key])=><div className="compare-row" key={key}><b>{label}</b>{chosen.map(m=><span key={m.slug}>{String(m[key as keyof Tractor])}</span>)}</div>)}</div></div></div>}</>
}
