import type { Metadata } from "next";
import BrandCollection from "@/components/BrandCollection";
import { getTractors } from "@/lib/content";
export const metadata: Metadata = { title: "Powertrac Tractors" };
export const dynamic = "force-dynamic";
export default async function Page() {
  return <BrandCollection brand="Powertrac" models={(await getTractors()).filter(t=>t.brand==="Powertrac")}/>;
}
