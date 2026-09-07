import mongoose from "mongoose";
import { tractors, stories } from "../lib/data";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");
  await mongoose.connect(uri);

  const tractorCollection = mongoose.connection.collection("tractors");
  const storyCollection = mongoose.connection.collection("stories");

  for (const tractor of tractors) {
    await tractorCollection.updateOne(
      { slug: tractor.slug },
      { $set: tractor, $setOnInsert: { createdAt: new Date() }, $currentDate: { updatedAt: true } },
      { upsert: true },
    );
  }

  for (const story of stories) {
    await storyCollection.updateOne(
      { farmer_name: story.farmer_name, tractor_model: story.tractor_model },
      { $set: story, $setOnInsert: { createdAt: new Date() }, $currentDate: { updatedAt: true } },
      { upsert: true },
    );
  }

  console.log(`Seeded ${tractors.length} tractors and ${stories.length} farmer stories.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error instanceof Error ? error.message : "Seed failed");
  await mongoose.disconnect();
  process.exit(1);
});
