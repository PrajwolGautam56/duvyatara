import mongoose from "mongoose";

let cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;
if (!cached) cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = { conn: null, promise: null };

export async function connectDb() {
  const uri = process.env.MONGODB_URI?.trim();
  // Deployment dashboards sometimes retain the placeholder from .env.example.
  // Treat an absent or unfinished URI as "database not configured" so public
  // pages can still build using the bundled seed content.
  if (!uri || uri.includes("<") || uri.includes(">")) return null;
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    });
  }
  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    cached!.promise = null;
    console.error("MongoDB connection unavailable; using seed content.");
    return null;
  }
}

const tractorSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const enquirySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const storySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export const TractorModel = mongoose.models.Tractor || mongoose.model("Tractor", tractorSchema);
export const EnquiryModel = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
export const StoryModel = mongoose.models.Story || mongoose.model("Story", storySchema);
