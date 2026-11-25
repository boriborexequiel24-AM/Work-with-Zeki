import { certifications, profile, sections, seo, toolGroups } from "@/data/content";
import type { CaseStudy } from "@/data/caseStudies";

// What the pages say about themselves to search engines (schema.org, as JSON-LD). It must
// only repeat what a visitor can see on the page.

const site = profile.site;
const personId = `${site}/#person`;
const websiteId = `${site}/#website`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: seo.otherNames,
  jobTitle: profile.role,
  description: profile.tagline,
  url: site,
  image: site + profile.photo,
  email: `mailto:${profile.email}`,
  homeLocation: { "@type": "Country", name: profile.country },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [...seo.topics, ...toolGroups.flatMap((g) => g.tools)],
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
};

export const homeData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": websiteId, url: site, name: profile.shortName, publisher: { "@id": personId } },
    {
      "@type": "ProfilePage",
      "@id": `${site}/#page`,
      url: site,
      name: seo.title,
      isPartOf: { "@id": websiteId },
      mainEntity: person,
    },
  ],
};

export const caseStudyData = (study: CaseStudy) => {
  const url = `${site}/work/${study.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.title,
        description: study.description,
        url,
        mainEntityOfPage: url,
        image: site + study.cover.src,
        datePublished: study.published,
        dateModified: study.published,
        author: { "@type": "Person", "@id": personId, name: profile.name, url: site },
        about: study.stack,
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: sections.caseStudy.home, item: site },
          { "@type": "ListItem", position: 2, name: study.title },
        ],
      },
    ],
  };
};
