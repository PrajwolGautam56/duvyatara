"use client";
import { useState } from "react";
export default function EnquiryForm({ model = "" }: { model?: string }) {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(formData: FormData) {
    setState("sending");
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setState(res.ok ? "sent" : "error");
  }
  return <form className="enquiry-form" action={submit}>
    <div><label htmlFor="name">Full Name *</label><input id="name" name="name" required placeholder="Your name"/></div>
    <div><label htmlFor="phone">Phone Number *</label><input id="phone" name="phone" required type="tel" placeholder="98XXXXXXXX"/></div>
    <div><label htmlFor="model">Tractor Model</label><input id="model" name="model" defaultValue={model} placeholder="Model you are interested in"/></div>
    <div><label htmlFor="location">Location</label><input id="location" name="location" placeholder="District / municipality"/></div>
    <div className="full"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4} placeholder="Tell us how we can help"/></div>
    <button className="button primary full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Enquiry"}</button>
    {state === "sent" && <p className="form-success full">Thank you. Our team will contact you shortly.</p>}
    {state === "error" && <p className="form-error full">Unable to send right now. Please call or WhatsApp us.</p>}
  </form>;
}
