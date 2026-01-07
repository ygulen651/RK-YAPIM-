import { Metadata } from "next";
import HakkimizdaContent from "@/components/HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda | RK Yapım",
  description: "RK Yapım film ve dizi yapım şirketi hakkında bilgi.",
};

export default function HakkimizdaPage() {
  return <HakkimizdaContent />;
}