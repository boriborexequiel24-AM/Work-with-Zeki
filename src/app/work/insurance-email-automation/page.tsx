import { CaseStudyPage, caseStudyMetadata } from "@/components/CaseStudyPage";

const slug = "insurance-email-automation";

export const metadata = caseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyPage slug={slug} />;
}
