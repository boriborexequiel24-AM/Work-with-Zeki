import { CaseStudyPage, caseStudyMetadata } from "@/components/CaseStudyPage";

const slug = "ai-invoice-processing";

export const metadata = caseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyPage slug={slug} />;
}
