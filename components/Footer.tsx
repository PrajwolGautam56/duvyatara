import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
export default function Footer() {
  return <footer><div className="container footer-grid">
    <div><div className="footer-brand"><Image src="/divya-tara-logo.webp" alt="" width={76} height={76}/><div><h3>Divya Tara Enterprises</h3><p>Authorized Powertrac & Farmtrac dealer</p></div></div><p>Reliable tractors, genuine parts and dependable after-sales support for farmers across Lumbini Province.</p></div>
    <div><h4>Explore</h4><Link href="/powertrac">Powertrac Models</Link><Link href="/farmtrac">Farmtrac Models</Link><Link href="/branches">Our Branches</Link><Link href="/contact">Contact Us</Link></div>
    <div><h4>Head Office</h4><p><MapPin size={16}/> Kalikanagar-10, Butwal</p><a href="tel:+9779857034383"><Phone size={16}/> +977 9857034383</a><a href="mailto:info@divyatara.com"><Mail size={16}/> info@divyatara.com</a></div>
  </div><div className="container footer-social"><Link href="/social" aria-label="Open social links"><img src="/api/social/qr" width={96} height={96} alt="Scan to open our social links"/></Link><div><Link href="/social"><strong>Connect with Divya Tara ↗</strong></Link><p>Scan for our social media and contact links.</p><a href="/api/social/qr?download=1">Download QR</a></div></div><div className="footer-bottom"><div className="container">© {new Date().getFullYear()} Divya Tara Enterprises. All rights reserved.</div></div></footer>;
}
