export const socialIcons = ["facebook","instagram","youtube","tiktok","whatsapp","linkedin","x","website","email","phone","location"] as const;
export type SocialIconName = typeof socialIcons[number];
export type SocialLink = { id: string; name: string; url: string; icon: SocialIconName; visible: boolean };
export type SocialSettings = { title: string; description: string; publicUrl: string; links: SocialLink[] };
export const socialDefaults: SocialSettings = {
  title: "Connect with Divya Tara",
  description: "Our official social channels and contact links, all in one place.",
  publicUrl: "https://duvyatara.vercel.app/social",
  links: [],
};
export function validateSocial(value: unknown): SocialSettings {
  if (!value || typeof value !== "object") throw new Error("Invalid settings.");
  const data = value as SocialSettings;
  if (typeof data.title !== "string" || !data.title.trim() || data.title.length > 100) throw new Error("Title must be 1–100 characters.");
  if (typeof data.description !== "string" || data.description.length > 500) throw new Error("Description must be under 500 characters.");
  const page = new URL(data.publicUrl);
  if (page.protocol !== "https:" || page.pathname !== "/social" || page.search || page.hash || page.username || page.password) throw new Error("QR destination must be https://your-domain/social, without query parameters.");
  if (!Array.isArray(data.links) || data.links.length > 50) throw new Error("Up to 50 links allowed.");
  const ids = new Set<string>();
  const links = data.links.map(link => {
    if (typeof link.id !== "string" || !link.id || link.id.length > 80 || ids.has(link.id)) throw new Error("Each link needs a unique ID.");
    ids.add(link.id);
    if (typeof link.name !== "string" || !link.name.trim() || link.name.length > 80) throw new Error("Each link needs a name of 1–80 characters.");
    if (!socialIcons.includes(link.icon) || typeof link.visible !== "boolean") throw new Error("Invalid icon or visibility.");
    if (typeof link.url !== "string" || link.url.length > 2000) throw new Error("Invalid link URL.");
    const url = new URL(link.url.trim());
    if (!["https:","http:","mailto:","tel:"].includes(url.protocol) || url.username || url.password) throw new Error("Use an https://, mailto: or tel: link.");
    return { id: link.id, name: link.name.trim(), url: link.url.trim(), icon: link.icon, visible: link.visible };
  });
  return { title: data.title.trim(), description: data.description.trim(), publicUrl: page.href, links };
}
