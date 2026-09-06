import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
export async function POST(req:Request){const {email,password}=await req.json();const valid=email===(process.env.ADMIN_EMAIL||"admin@divyatara.com")&&password===process.env.ADMIN_PASSWORD;if(!valid)return NextResponse.json({error:"Invalid credentials"},{status:401});const token=await createSession(email);const res=NextResponse.json({ok:true});res.cookies.set("divyatara_admin",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",maxAge:60*60*8,path:"/"});return res}
