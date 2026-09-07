import type { Metadata } from "next";
import TractorCard from "@/components/TractorCard";
import ModelCompare from "@/components/ModelCompare";
import { getTractors } from "@/lib/content";
export const metadata: Metadata = { title: "Powertrac Tractors" };
export const dynamic = "force-dynamic";
export default async function Page(){ const list=(await getTractors()).filter(t=>t.brand==="Powertrac"); return <><section className="brand-hero power"><div className="container"><p className="eyebrow">POWERTRAC TRACTORS</p><h1>Power meets economy.</h1><p>Robust machines engineered for the real demands of South Asian agriculture.</p></div></section><section className="section"><div className="container"><div className="section-head"><div><h2>Available Powertrac models</h2><p>Open any model for full specifications and a dedicated enquiry form.</p></div></div><ModelCompare models={list}/><div className="card-grid three">{list.map(t=><TractorCard key={t.slug} tractor={t}/>)}</div></div></section></> }
