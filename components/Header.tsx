"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const links = [["Home", "/"], ["About Us", "/about"], ["Powertrac", "/powertrac"], ["Farmtrac", "/farmtrac"], ["Branches", "/branches"], ["Customer Testimonials", "/testimonials"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topbar"><div className="container topbar-inner">
      <div className="top-contacts"><a href="tel:+9779857034383"><Phone size={14}/> +977 9857034383</a><a href="mailto:info@divyatara.com"><Mail size={14}/> info@divyatara.com</a><span><MapPin size={14}/> Kalikanagar-10, Butwal</span></div>
      <Link className="admin-entry" href="/admin" aria-label="Team access">Team access</Link>
    </div></div>
    <div className="nav-wrap"><div className="container nav-inner">
      <Link href="/" className="brand"><Image src="/divya-tara-logo.webp" alt="Divya Tara Enterprises" width={72} height={72} priority/><span><strong>Divya Tara</strong><small>ENTERPRISES</small></span></Link>
      <nav className={open ? "nav-links open" : "nav-links"}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-cta mobile" href="/contact">Contact Us</Link></nav>
      <Link className="nav-cta desktop" href="/contact">Contact Us</Link>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    </div></div>
    <div className="dealer-strip"><div className="container dealer-inner"><span>Authorized dealer</span><Image src="/escorts-kubota.webp" alt="Escorts Kubota" width={194} height={55}/><i/> <strong>Powertrac</strong><i/><strong>Farmtrac</strong></div></div>
  </header>;
}
