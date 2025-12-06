import TermsAndConditions from "@/app/components/Container/TermsAndConditions/TermsAndConditions";
export default async function Page({ params }) {
  const { slug } = await params;
  return <TermsAndConditions slug={slug} />;
}