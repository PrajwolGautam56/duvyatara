import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Gauge, Cog, Tractor as TractorIcon } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import TractorGallery from "@/components/TractorGallery";
import { getTractors } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const t=(await getTractors()).find(x=>x.slug===slug);
  if(!t)notFound();
  return <>
    <section className={`detail-hero ${t.brand.toLowerCase()}`}><div className="container">
      <Link href={`/${t.brand.toLowerCase()}`}><ArrowLeft size={17}/> Back to {t.brand}</Link>
      <div className="detail-grid"><div><p className="eyebrow">{t.brand}</p><h1>{t.name}</h1><p>{t.description}</p><div className="detail-badges"><span><Gauge/>{t.hp}</span><span><TractorIcon/>{t.drive}</span><span><Cog/>{t.lift} lift</span></div></div><TractorGallery primary={t.image} images={t.images} name={t.name}/></div>
    </div></section>
    <section className="section"><div className="container spec-layout"><div><p className="eyebrow green">FULL DETAILS</p><h2>Specifications</h2><dl className="spec-table"><div><dt>Engine</dt><dd>{t.engine}</dd></div><div><dt>Horsepower</dt><dd>{t.hp}</dd></div><div><dt>Drive</dt><dd>{t.drive}</dd></div><div><dt>Lift capacity</dt><dd>{t.lift}</dd></div><div><dt>Transmission</dt><dd>{t.gearbox}</dd></div></dl><div className="highlights"><h3>Key highlights</h3>{t.specs.map(s=><p key={s}><Check size={18}/>{s}</p>)}</div></div><aside className="enquiry-panel"><p className="eyebrow red">ENQUIRE NOW</p><h2>Interested in {t.name}?</h2><p>Share your details and our nearest branch will contact you.</p><EnquiryForm model={t.name}/></aside></div></section>
  </>;
}
