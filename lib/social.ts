import mongoose from "mongoose";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDb, UserModel } from "./db";
import { socialDefaults, type SocialSettings } from "./social-data";

const schema = new mongoose.Schema({ _id: String, title: String, description: String, publicUrl: String, links: [{ _id: false, id: String, name: String, url: String, icon: String, visible: Boolean }] }, { timestamps: true });
export const SocialModel = mongoose.models.SocialSettings || mongoose.model("SocialSettings", schema);
export async function getSocial(): Promise<SocialSettings> {
  if (!await connectDb()) throw new Error("Database unavailable. Please try again.");
  const record = await SocialModel.findById("main").lean();
  if (!record) return socialDefaults;
  const data = JSON.parse(JSON.stringify(record));
  return { title: data.title, description: data.description, publicUrl: data.publicUrl, links: data.links };
}
export async function socialAdmin() {
  const token = (await cookies()).get("divyatara_admin")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
    if (typeof payload.email !== "string" || !await connectDb()) return false;
    return Boolean(await UserModel.exists({email: payload.email, active: true, role: "admin"}));
  } catch { return false; }
}
