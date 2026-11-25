import { CaseStudyPage, caseStudyMetadata } from "@/components/CaseStudyPage";

const slug = "ai-lead-follow-up";

export const metadata = caseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyPage slug={slug} />;
}
