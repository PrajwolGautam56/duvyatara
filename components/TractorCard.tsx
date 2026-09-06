import Link from "next/link";
import { Tractor } from "@/lib/data";
import { ArrowRight, Gauge, Cog, Tractor as TractorIcon } from "lucide-react";
export default function TractorCard({ tractor }: { tractor: Tractor }) {
  return <article className="tractor-card"><div className="card-image"><img src={tractor.image} alt={tractor.name}/><span className={`brand-pill ${tractor.brand.toLowerCase()}`}>{tractor.brand}</span></div><div className="card-body"><h3>{tractor.name}</h3><p>{tractor.description}</p><div className="mini-specs"><span><Gauge size={16}/>{tractor.hp}</span><span><TractorIcon size={16}/>{tractor.drive}</span><span><Cog size={16}/>{tractor.lift}</span></div><Link href={`/tractors/${tractor.slug}`}>View full details <ArrowRight size={17}/></Link></div></article>;
}
