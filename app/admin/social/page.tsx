import { redirect } from "next/navigation";
import { socialAdmin } from "@/lib/social";
import SocialEditor from "@/components/SocialEditor";
export const dynamic="force-dynamic";
export const metadata={title:"Manage social links",robots:{index:false,follow:false}};
export default async function Page() {
  if(!await socialAdmin())redirect("/admin");
  return <section className="container section"><SocialEditor/></section>;
}
