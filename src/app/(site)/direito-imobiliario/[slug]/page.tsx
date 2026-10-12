import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata, serviceStaticParams } from "@/components/service-route";

const group = "direito-imobiliario" as const;

export function generateStaticParams() {
  return serviceStaticParams(group);
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return serviceMetadata(group, params);
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ServiceRoute group={group} params={params} />;
}
