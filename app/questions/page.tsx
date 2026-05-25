import { KahootQuestion } from "@/app/src/components/KahootQuestion";
import { getQuizQuestions } from "@/app/src/database-queries";

export const dynamic = "force-dynamic";

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ pin?: string }>;
}) {
  const { pin = "438921" } = await searchParams;
  const questions = await getQuizQuestions();

  return <KahootQuestion pin={pin} questions={questions} />;
}
