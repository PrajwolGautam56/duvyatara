import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Phone, Mail, MapPin } from "lucide-react";
export const metadata: Metadata={title:"Contact Us"};
export default function Page(){return <><section className="simple-hero"><div className="container"><p className="eyebrow gold">CONTACT US</p><h1>Let&apos;s find your next tractor.</h1><p>Tell us what your farm needs. Our team will help you choose with confidence.</p></div></section><section className="section"><div className="container contact-layout"><div><p className="eyebrow green">HEAD OFFICE</p><h2>Divya Tara Enterprises</h2><div className="contact-cards"><a href="tel:+9779857034383"><Phone/>+977 9857034383</a><a href="mailto:info@divyatara.com"><Mail/>info@divyatara.com</a><p><MapPin/>Kalikanagar-10, Butwal, Rupandehi</p></div></div><div className="enquiry-panel"><h2>Send an enquiry</h2><EnquiryForm/></div></div></section></>}
