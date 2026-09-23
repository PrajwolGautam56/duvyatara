import { Facebook, Instagram, Youtube, Linkedin, Globe, Mail, Phone, MapPin, MessageCircle, Music2 } from "lucide-react";
import type { SocialIconName } from "@/lib/social-data";
const icons = {facebook:Facebook,instagram:Instagram,youtube:Youtube,linkedin:Linkedin,website:Globe,email:Mail,phone:Phone,location:MapPin,whatsapp:MessageCircle,tiktok:Music2};
export default function SocialIcon({name}:{name:SocialIconName}) {
  if(name==="x") return <span aria-hidden="true">𝕏</span>;
  if(name==="whatsapp") return <img src="/whatsapp.jpeg" alt="" width={26} height={26}/>;
  const Icon=icons[name]||Globe;
  return <Icon size={26} aria-hidden="true"/>;
}
