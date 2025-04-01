import { Box } from "@chakra-ui/react";
import { InputQuestion } from "@/app/components/forms/InputQuestion";
import { ChoiceQuestion } from "@/app/components/forms/ChoiceQuestion";
import { useQuestions } from "@/app/contexts/QuestionsContext";

export function RenderQuestion() {
  const { state } = useQuestions();
  const { questionIndex, questions } = state;

  return (
    <Box maxWidth={1000}>
      {questions[questionIndex].inputType === "input" ? (
        <InputQuestion
          question={questions[questionIndex]}
          questionIndex={questionIndex}
        />
      ) : questions[questionIndex].inputType === "choice" &&
        questions[questionIndex].choices ? (
        <ChoiceQuestion
          question={questions[questionIndex]}
          questionIndex={questionIndex}
        />
      ) : null}
    </Box>
  );
}
