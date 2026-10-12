import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/service-view";
import { getService, services, type ServiceGroup } from "@/lib/services";

export function serviceStaticParams(group: ServiceGroup) {
  return services.filter((service) => service.group === group).map((service) => ({ slug: service.slug }));
}

export async function serviceMetadata(
  group: ServiceGroup,
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(group, slug);
  if (!service) return {};
  return {
    description: service.description,
    alternates: { canonical: `/${group}/${service.slug}` },
  };
}

export async function ServiceRoute({
  group,
  params,
}: {
  group: ServiceGroup;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(group, slug);
  if (!service) notFound();
  return <ServiceView service={service} />;
}
