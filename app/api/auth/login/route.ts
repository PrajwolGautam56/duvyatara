import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { connectDb, UserModel } from "@/lib/db";

export async function POST(req:Request){
  const {email,password}=await req.json();
  const normalized=String(email||"").trim().toLowerCase();
  if(!normalized||!password)return NextResponse.json({error:"Email and password required"},{status:400});
  const db=await connectDb();
  if(!db)return NextResponse.json({error:"Database unavailable"},{status:503});
  const user=await UserModel.findOne({email:normalized,active:true}).select("+passwordHash");
  const valid=user&&await bcrypt.compare(String(password),user.passwordHash);
  if(!valid)return NextResponse.json({error:"Invalid credentials"},{status:401});
  const token=await createSession(normalized);
  const res=NextResponse.json({ok:true,role:user.role});
  res.cookies.set("divyatara_admin",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",maxAge:60*60*8,path:"/"});
  return res;
}
