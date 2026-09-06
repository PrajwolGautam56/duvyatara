import mongoose from "mongoose";

let cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;
if (!cached) cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = { conn: null, promise: null };

export async function connectDb() {
  if (!process.env.MONGODB_URI) return null;
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) cached!.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

const tractorSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const enquirySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const storySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export const TractorModel = mongoose.models.Tractor || mongoose.model("Tractor", tractorSchema);
export const EnquiryModel = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
export const StoryModel = mongoose.models.Story || mongoose.model("Story", storySchema);
