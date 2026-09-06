import Image from "next/image";
export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9779857034383";
  return <a className="whatsapp" href={`https://wa.me/${number}?text=${encodeURIComponent("Hello, I'm interested in a tractor from Divya Tara Enterprises. Please guide me.")}`} target="_blank" rel="noreferrer" aria-label="Chat with Divya Tara on WhatsApp"><Image src="/whatsapp.jpeg" alt="WhatsApp" width={64} height={64}/></a>;
}
