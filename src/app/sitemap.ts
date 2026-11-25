import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { profile } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site },
    ...caseStudies.map((s) => ({ url: `${profile.site}/work/${s.slug}`, lastModified: s.published })),
  ];
}
