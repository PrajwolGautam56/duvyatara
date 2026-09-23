import QRCode from "qrcode";
import { getSocial, socialAdmin } from "@/lib/social";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (!await socialAdmin()) return Response.json({error:"Admin sign-in required."},{status:401,headers:{"Cache-Control":"no-store"}});
  try {
    const { publicUrl } = await getSocial();
    const query = new URL(req.url).searchParams;
    const svg = query.get("format") === "svg";
    const options = {errorCorrectionLevel:"M" as const,margin:4,width:1024,color:{dark:"#192e78",light:"#ffffff"}};
    const data = svg ? await QRCode.toString(publicUrl,{...options,type:"svg"}) : new Uint8Array(await QRCode.toBuffer(publicUrl,options));
    return new Response(data, {headers:{"Content-Type":svg?"image/svg+xml":"image/png","Cache-Control":"no-store",...(query.has("download")?{"Content-Disposition":'attachment; filename="divyatara-social-qr.'+(svg?"svg":"png")+'"'}:{})}});
  } catch { return Response.json({error:"QR unavailable. Please try again."},{status:503}); }
}
