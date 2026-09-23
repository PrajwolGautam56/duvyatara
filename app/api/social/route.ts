import { getSocial, socialAdmin, SocialModel } from "@/lib/social";
import { validateSocial } from "@/lib/social-data";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!await socialAdmin()) return Response.json({error:"Admin sign-in required."},{status:401});
  try { return Response.json(await getSocial(), {headers:{"Cache-Control":"no-store"}}); }
  catch { return Response.json({error:"Unable to load social settings."},{status:503}); }
}
export async function PUT(req: Request) {
  if (!await socialAdmin()) return Response.json({error:"Admin sign-in required."},{status:401});
  if (req.headers.get("origin") && req.headers.get("origin") !== new URL(req.url).origin) return Response.json({error:"Invalid request origin."},{status:403});
  let settings;
  try { settings = validateSocial(await req.json()); }
  catch(error) { return Response.json({error:error instanceof Error?error.message:"Invalid settings."},{status:400}); }
  try {
    await SocialModel.findByIdAndUpdate("main", {$set:settings}, {upsert:true,runValidators:true});
    return Response.json(settings, {headers:{"Cache-Control":"no-store"}});
  } catch { return Response.json({error:"Save failed. Your changes have not been saved."},{status:503}); }
}
