import type { Metadata } from "next";
import TractorCard from "@/components/TractorCard";
import ModelCompare from "@/components/ModelCompare";
import { getTractors } from "@/lib/content";
export const metadata: Metadata = { title: "Farmtrac Tractors" };
export default async function Page(){ const list=(await getTractors()).filter(t=>t.brand==="Farmtrac"); return <><section className="brand-hero farm"><div className="container"><p className="eyebrow">FARMTRAC TRACTORS</p><h1>Premium engineering.<br/>Field-ready strength.</h1><p>Advanced technology and operator comfort for productive farming.</p></div></section><section className="section"><div className="container"><div className="section-head"><div><h2>Available Farmtrac models</h2><p>Open any model for full specifications and a dedicated enquiry form.</p></div></div><ModelCompare models={list}/><div className="card-grid two">{list.map(t=><TractorCard key={t.slug} tractor={t}/>)}</div></div></section></> }
