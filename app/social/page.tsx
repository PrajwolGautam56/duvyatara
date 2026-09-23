import { getSocial } from "@/lib/social";
import SocialIcon from "@/components/SocialIcon";
import SocialQR from "@/components/SocialQR";
import { ArrowUpRight } from "lucide-react";
export const dynamic="force-dynamic";
export const metadata={title:"Social links | Divya Tara"};
export default async function Page() {
  let settings;
  try { settings=await getSocial(); }
  catch { return <section className="section container"><h1>Connect with Divya Tara</h1><p>Our links are temporarily unavailable. Please try again shortly.</p></section>; }
  const links=settings.links.filter(link=>link.visible);
  return <section className="social-page"><div className="social-profile"><img className="social-logo" src="/divya-tara-logo.webp" alt="Divya Tara Enterprises" width={100} height={100}/><p className="eyebrow blue">DIVYA TARA ENTERPRISES</p><h1>{settings.title}</h1><p>{settings.description}</p><div className="social-links">{links.map(link=><a key={link.id} href={link.url} target={link.url.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"><SocialIcon name={link.icon}/><span>{link.name}</span><ArrowUpRight size={18}/></a>)}</div>{!links.length&&<p>Our social links will be available here soon.</p>}<SocialQR url={settings.publicUrl}/></div></section>;
}
