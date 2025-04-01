import { Center } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { RenderQuestion } from "@/app/components/forms/RenderQuestion";
import SummaryViewer from "@/app/components/forms/SummaryViewer";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export default function ServicesForm() {
  const { state } = useQuestions();
  const { questionIndex, questions } = state;

  console.log(
    `[ServicesForm] Question Index: ${questionIndex}, Questions Length: ${questions.length}`
  );

  return (
    <Center
      width="100%"
      height="calc(100vh - 160px)"
      px={12}
      overflowY="auto"
      overflowX="hidden"
    >
      {questionIndex < questions.length ? (
        <AnimatePresence mode="wait">
          <RenderQuestion />
        </AnimatePresence>
      ) : (
        <SummaryViewer layoutType={6} />
      )}
    </Center>
  );
}
