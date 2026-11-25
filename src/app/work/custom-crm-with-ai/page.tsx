import { CaseStudyPage, caseStudyMetadata } from "@/components/CaseStudyPage";

const slug = "custom-crm-with-ai";

export const metadata = caseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyPage slug={slug} />;
}
