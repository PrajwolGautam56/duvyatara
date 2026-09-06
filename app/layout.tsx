import type { Metadata } from "next";
import "./globals.css";
import "./comparison.css";
import "./admin.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: { default: "Divya Tara Enterprises", template: "%s | Divya Tara Enterprises" },
  description: "Authorized Powertrac and Farmtrac tractor dealer serving Lumbini Province, Nepal."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /><WhatsAppButton /></body></html>;
}
