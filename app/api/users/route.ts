import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { connectDb, UserModel } from "@/lib/db";
import { verifySession } from "@/lib/auth";

async function allowed(){return verifySession((await cookies()).get("divyatara_admin")?.value)}
export async function GET(){
  if(!await allowed())return NextResponse.json({error:"Unauthorized"},{status:401});
  if(!await connectDb())return NextResponse.json({error:"Database unavailable"},{status:503});
  return NextResponse.json(await UserModel.find().select("email role active createdAt").sort({createdAt:1}).lean());
}
export async function POST(req:Request){
  if(!await allowed())return NextResponse.json({error:"Unauthorized"},{status:401});
  if(!await connectDb())return NextResponse.json({error:"Database unavailable"},{status:503});
  const {email,password,role="admin"}=await req.json();
  const normalized=String(email||"").trim().toLowerCase();
  if(!normalized||String(password||"").length<8)return NextResponse.json({error:"Valid email and password of at least 8 characters required"},{status:400});
  try{
    const passwordHash=await bcrypt.hash(String(password),12);
    const user=await UserModel.create({email:normalized,passwordHash,role,active:true});
    return NextResponse.json({id:user._id,email:user.email,role:user.role,active:user.active},{status:201});
  }catch(error){return NextResponse.json({error:"User already exists or could not be created"},{status:409})}
}
