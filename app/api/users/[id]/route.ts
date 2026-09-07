import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDb, UserModel } from "@/lib/db";
import { verifySession } from "@/lib/auth";
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
  if(!await verifySession((await cookies()).get("divyatara_admin")?.value))return NextResponse.json({error:"Unauthorized"},{status:401});
  if(!await connectDb())return NextResponse.json({error:"Database unavailable"},{status:503});
  if(await UserModel.countDocuments({active:true})<=1)return NextResponse.json({error:"The last active admin cannot be deleted"},{status:400});
  await UserModel.findByIdAndDelete((await params).id);
  return NextResponse.json({ok:true});
}
