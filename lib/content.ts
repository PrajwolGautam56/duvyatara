import { connectDb, StoryModel, TractorModel } from "./db";
import { stories, tractors, type Story, type Tractor } from "./data";

export async function getTractors(): Promise<Tractor[]> {
  const db = await connectDb();
  if (!db) return tractors;
  const records = await TractorModel.find().lean();
  return records.length ? JSON.parse(JSON.stringify(records)) : tractors;
}

export async function getStories(): Promise<Story[]> {
  const db = await connectDb();
  if (!db) return stories;
  const records = await StoryModel.find().sort({ createdAt: -1 }).lean();
  return records.length ? JSON.parse(JSON.stringify(records)) as Story[] : stories;
}
