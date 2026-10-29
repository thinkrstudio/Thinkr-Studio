import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import ServicePage from "@/components/services/ServicePage";

const service = SERVICES.find((s) => s.key === "web-development")!;

export const metadata: Metadata = {
  title: `${service.title} | Thinkr Studio`,
  description: service.description,
};

export default function WebDevelopmentPage() {
  return <ServicePage service={service} number="01" kind="web" />;
}
