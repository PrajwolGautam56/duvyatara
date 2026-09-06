import type { Metadata } from "next";
import { branches } from "@/lib/data";
import { MapPin, Phone, Clock } from "lucide-react";
export const metadata: Metadata={title:"Our Branches"};
export default function Page(){return <><section className="simple-hero"><div className="container"><p className="eyebrow gold">LUMBINI PROVINCE</p><h1>Support is never far away.</h1><p>Visit or call the Divya Tara branch nearest to your farm.</p></div></section><section className="section soft"><div className="container branch-grid">{branches.map((b,i)=><article className={i===0?"hq":""} key={b.name}><span className="branch-no">0{i+1}</span><MapPin/><h2>{b.name}</h2><p>{b.location}</p>{b.phones.map(p=><a href={`tel:+977${p}`} key={p}><Phone size={17}/>+977 {p}</a>)}{b.hours&&<small><Clock size={16}/>{b.hours}</small>}</article>)}</div></section></>}
