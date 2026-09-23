import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import heroImage from "@/public/hero-tractors.webp";
import { ArrowRight, ShieldCheck, Wrench, MapPin, BadgeCheck } from "lucide-react";
import TractorCard from "@/components/TractorCard";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import { getStories, getTractors } from "@/lib/content";

// Content is database-backed in production, so do not query MongoDB while the
// deployment provider is compiling the application.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return <>
    <section className="hero"><div className="hero-bg"><Image src={heroImage} alt="" fill sizes="100vw" preload placeholder="blur" className="hero-image"/><div className="hero-shade"/></div><div className="container hero-content"><p className="eyebrow">ESCORTS KUBOTA • AUTHORIZED DEALER</p><h1>Powering<br/><em>Nepal&apos;s farms.</em></h1><p className="hero-copy">Powertrac and Farmtrac tractors, genuine parts and trusted service—close to the farmers of Lumbini.</p></div><div className="hero-note"><span>Divya Tara Enterprises</span><small>Sales · Service · Genuine Parts</small></div></section>
    <section className="trust-strip"><div className="container trust-grid"><div><b>7</b><span>Tractor models</span></div><div><b>5</b><span>Branches</span></div><div><b>360°</b><span>Sales & service</span></div><div><b>Lumbini</b><span>Province coverage</span></div></div></section>

    <Suspense fallback={<section className="section soft" style={{ minHeight: 600 }} aria-busy="true"><div className="container"><p role="status">Loading tractor models and customer stories…</p></div></section>}><HomeContent /></Suspense>
  </>;
}

async function HomeContent() {
  const [tractors, stories] = await Promise.all([getTractors(), getStories()]);
  const powertrac = tractors.filter(t => t.brand === "Powertrac" && t.featured).slice(0, 3);
  const farmtrac = tractors.filter(t => t.brand === "Farmtrac" && t.featured);
  return <>
    <section className="section soft"><div className="container"><div className="section-head"><div><p className="eyebrow red">POWERTRAC</p><h2>Built for hard work</h2><p>Proven power, fuel efficiency and dependable performance for Nepal&apos;s fields.</p></div><Link href="/powertrac">All Powertrac models <ArrowRight size={18}/></Link></div><div className="card-grid three">{powertrac.map(t => <TractorCard tractor={t} key={t.slug}/>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow blue">FARMTRAC</p><h2>Premium engineering</h2><p>Refined technology, operator comfort and confident performance.</p></div><Link href="/farmtrac">All Farmtrac models <ArrowRight size={18}/></Link></div><div className="card-grid two">{farmtrac.map(t => <TractorCard tractor={t} key={t.slug}/>)}</div></div></section>

    <section className="section dark"><div className="container"><div className="section-head light"><div><p className="eyebrow gold">WHY DIVYA TARA</p><h2>Support that stays with you</h2></div></div><div className="feature-grid"><div><BadgeCheck/><h3>Authorized Dealer</h3><p>Genuine Escorts Kubota tractors with valid manufacturer support.</p></div><div><Wrench/><h3>Expert Service</h3><p>Skilled technicians, regular maintenance and dependable repairs.</p></div><div><ShieldCheck/><h3>Genuine Parts</h3><p>Quality components that protect performance and tractor life.</p></div><div><MapPin/><h3>Nearby Network</h3><p>Five branches serving farmers across Lumbini Province.</p></div></div></div></section>

    <section className="section stories"><div className="container"><div className="section-head"><div><p className="eyebrow green">CUSTOMER TESTIMONIALS</p><h2>Real stories from the field</h2><p>Customer reviews, photos and video experiences with Divya Tara.</p></div><Link href="/testimonials">View all testimonials <ArrowRight size={18}/></Link></div><TestimonialsGrid stories={stories.filter(s=>s.featured!==false).slice(0,4)}/></div></section>
    <section className="contact-band"><div className="container"><div><p className="eyebrow gold">LET&apos;S TALK</p><h2>Find the right tractor for your farm.</h2></div><Link className="button pale" href="/contact">Contact Us <ArrowRight size={18}/></Link></div></section>
  </>;
}
