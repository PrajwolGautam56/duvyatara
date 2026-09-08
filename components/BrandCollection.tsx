"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Gauge, Settings2 } from "lucide-react";
import type { Tractor } from "@/lib/data";
import TractorCard from "./TractorCard";
import ModelCompare from "./ModelCompare";

export default function BrandCollection({ brand, models }: { brand: Tractor["brand"]; models: Tractor[] }) {
  const [hp, setHp] = useState("All");
  const [drive, setDrive] = useState("All");
  const power = brand === "Powertrac";
  const spotlight = models.find(m => m.featured) || models[0];
  const powers = [...new Set(models.map(m => m.hp))].sort((a,b)=>parseFloat(a)-parseFloat(b));
  const drives = [...new Set(models.map(m => m.drive))];
  const visible = models.filter(m => (hp === "All" || m.hp === hp) && (drive === "All" || m.drive === drive));
  return <div className={power ? "brand-collection collection-power" : "brand-collection collection-farm"}>
    <section className="collection-hero"><div className="container collection-intro">
      <div className="collection-copy"><p className="eyebrow">ESCORTS KUBOTA / {brand.toUpperCase()}</p>
        <h1>{power ? <>Power for<br/>every working day.</> : <>A step ahead.<br/>In every field.</>}</h1>
        <p>{power ? "Find your balance of power, traction and everyday economy. Explore the Powertrac range at Divya Tara." : "Explore Farmtrac tractors for your next season—with the specifications and local support to choose confidently."}</p>
        <a className="button" href="#models">Explore {brand} <ArrowDown size={18}/></a>
      </div>
      {spotlight && <Link className="collection-showcase" href={"/tractors/"+spotlight.slug}><span className="showcase-label">MEET THE RANGE</span><img src={spotlight.image} alt={spotlight.name}/><div className="showcase-caption"><div><small>{brand}</small><h2>{spotlight.name}</h2></div><ArrowRight size={24}/></div><div className="showcase-specs"><span><Gauge size={16}/>{spotlight.hp}</span><span>{spotlight.drive}</span><span>{spotlight.lift} lift</span></div></Link>}
    </div></section>
    <div className="collection-summary"><div className="container"><span><strong>{models.length}</strong> models to explore</span><span><strong>{powers.join(" / ")}</strong> available power</span><span>Sales, service & genuine parts <strong>Divya Tara Enterprises</strong></span></div></div>
    <section className="section collection-models" id="models"><div className="container">
      <div className="section-head"><div><p className="eyebrow blue">YOUR FARM. YOUR REQUIREMENTS.</p><h2>Find your {brand}.</h2><p>Compare the details and enquire about the model that fits your work.</p></div></div>
      <div className="collection-filters"><span><Settings2 size={18}/> Filter models</span><label>Power<select value={hp} onChange={e=>setHp(e.target.value)}><option value="All">All horsepower</option>{powers.map(v=><option key={v}>{v}</option>)}</select></label><label>Drive<select value={drive} onChange={e=>setDrive(e.target.value)}><option value="All">All drives</option>{drives.map(v=><option key={v}>{v}</option>)}</select></label><span aria-live="polite">{visible.length} of {models.length} models</span>{(hp!=="All"||drive!=="All")&&<button onClick={()=>{setHp("All");setDrive("All")}}>Reset filters</button>}</div>
      {visible.length ? <div className="card-grid three">{visible.map(t=><TractorCard key={t.slug} tractor={t}/>)}</div> : <p className="collection-empty">No models match these filters. Try another power or drive option.</p>}
      <div className="collection-compare"><h2>See the difference, side by side.</h2><ModelCompare models={models}/></div>
      <div className="collection-help"><div><h2>Need a hand choosing?</h2><p>Talk to our team about your land, workload and tractor requirements.</p></div><Link className="button primary" href="/contact">Contact Us <ArrowRight size={18}/></Link></div>
    </div></section>
  </div>;
}
